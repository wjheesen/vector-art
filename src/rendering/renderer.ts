import { SprayMesh } from '../mesh/spray';
import { Line } from '../drawable/line';
import { EllipseBatch } from '../drawable/ellipseBatch';
import { Mat2dBuffer } from 'gl2d/struct/mat2d';
import { Ellipse } from '../drawable/ellipse';
import { ShapeProgram } from '../program/shape';
import { MeshSource } from 'gl2d';
import { ShapeBatch } from '../drawable/shapeBatch';
import { Stroke } from '../drawable/stroke';
import { Shape } from '../drawable/shape';
import { StrokeProgram } from '../program/stroke';
import { Drawable } from '../drawable/drawable';
import { Frame } from '../drawable/frame';
import { FramedDrawable } from '../drawable/framed';
import { FrameProgram } from '../program/frame';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { EllipseProgram } from '../program/ellipse';
import { Renderer as Base } from 'gl2d/rendering/renderer'
import { Mesh } from "gl2d/drawable/mesh";
import { IPoint } from "gl2d/struct/point";
import { Selection } from '../drawable/selection'
import { ANGLEInstancedArrays } from "./ANGLE_instanced_arrays";

export class Renderer extends Base {

    ext: ANGLEInstancedArrays;
    
    buffer = new Float32Array(25000); // 100kb

    shapeProgram: ShapeProgram;
    ellipseProgram: EllipseProgram;
    strokeProgram: StrokeProgram;
    frameProgram: FrameProgram;

    foreground: Frame;
    drawables: Drawable[] = [];
    removed: Drawable[] = [];
    temp: Drawable;

    selection: Selection;
    hover: FramedDrawable;

    // points: Ellipse[] = [];
    
    meshes: MeshMap = {
        "triangle": Mesh.polygon(3),
        "square": Mesh.square(),
        "diamond": Mesh.diamond(),
        "pentagon": Mesh.polygon(5),
        "hexagon": Mesh.polygon(6),
        "star": Mesh.star5(),
        "star6": Mesh.star(6, .5, 1),
        "star8": Mesh.star(8, .5, 1),
        "star16": Mesh.star(16, .1, 1),
        "heart": Mesh.fromSource(heart()),
        "flower": Mesh.fromSource(flower()),
        "bat": Mesh.fromSource(bat()),
    } 

    mesh: Mesh;
    lineThickness = 0.01;
    maintainAspect = true;
    color = new ColorFStruct();

    onSurfaceCreated(): void {
        let gl = this.gl;
        gl.clearColor(0,0,0,0);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        
        // Put meshes into array
        this.meshes.spray = SprayMesh.create(this.meshes.triangle, 3, 3);
        let meshes = <Mesh[]> [];
        for(let key in this.meshes){
            meshes.push(this.meshes[key])
        }
        // Init programs
        this.shapeProgram = ShapeProgram.create(gl, meshes);
        this.ellipseProgram = EllipseProgram.create(gl);
        this.strokeProgram = StrokeProgram.create(gl);
        this.frameProgram = FrameProgram.create(gl);
        // Init background
        this.foreground = new Frame(ColorFStruct.create$(.6,.6,.6,1), 10, this.camera.target);
        // Init selection boxes
        let frameThickness = 0.08;
        let pointRadius = 0.05;
        let blue = ColorFStruct.create$(0, 0.2, 0.9, 0.9);
        let blueHover = ColorFStruct.create$(0, 0.2, 0.9, 0.5);
        let red = ColorFStruct.create$(1,0,0,0.9);
        let pointMesh = this.ellipseProgram.mesh;
        this.selection = Selection.create(blue, frameThickness, pointMesh, red, pointRadius);
        this.hover = new FramedDrawable(new Frame(blueHover, frameThickness));
    }

    onDrawFrame(): void {
        let gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT);
        for(let drawable of this.drawables){
            drawable.draw(this);
        }
        if(this.temp){
            this.temp.draw(this);
        }
        this.foreground.draw(this);
        // for(let point of this.points){
        //     point.draw(this);
        // }
        if(this.selection.target){
            this.selection.draw(this);
        }
        if(this.hover.target){
            this.hover.draw(this);
        }
        // console.log("stack size", this.measureStackSize())
    }

    getShapeContaining(point: IPoint){
        let shapes = this.drawables;
        for(let i = shapes.length - 1; i>=0; i--){
            let drawable = shapes[i];
            if(drawable.contains(point)){
                return drawable;
            }
        }
        return null;
    }

    getTempLine(){
        let line = this.temp as Line;
        if(!line){
            let color = ColorFStruct.create(this.color);
            line = new Line(this.meshes.square, color);
            this.temp = line;
        }
        return line;
    }

    getTempShape(){
        let shape = this.temp as Shape;
        if(!shape){
            let mesh = this.mesh;
            let color = ColorFStruct.create(this.color);
            if(mesh){
                shape = new Shape(mesh, color);
            } else {
                shape = new Ellipse(this.ellipseProgram.mesh, color);
            }
            this.temp = shape;
        }
        return shape;
    }

    getTempShapeBatch(){
        let batch = this.temp as ShapeBatch;
        if(!batch){
            let mesh = this.mesh; //this.mesh;
            let color = ColorFStruct.create(this.color);
            let matrices = new Mat2dBuffer(this.buffer);
            if(mesh){
                batch = new ShapeBatch(mesh, color, matrices);
            } else {
                batch = new EllipseBatch(this.ellipseProgram.mesh, color, matrices);
            }
            this.temp = batch;
        }
        return batch;
    }

    addTempDrawable(){
        let drawable = this.temp;
        if(drawable && this.camera.target.intersects(drawable.measureBoundaries())){
           this.drawables.push(drawable);
        }
        this.temp = null;
    }

    addTempShapeBatch(){
        let batch = this.temp as ShapeBatch;
        if(batch){
            let matrices = batch.matrices;
            let size = matrices.position();
            if(size > 0){
                matrices.moveToFirst();
                batch.matrices = Mat2dBuffer.create(size);
                batch.matrices.putBuffer(matrices, size);
                this.addTempDrawable();
            } else {
                this.temp = null;
            }
        }
    }

    removeDrawable(drawable?: Drawable){
        if(drawable){
            this.drawables = this.drawables.filter(d => d !== drawable);
        } else {
            drawable = this.drawables.pop();
        }
        this.removed.push(drawable);
    }

    measureStackSize(){
        let size = 0;
        for(let drawable of this.drawables){
            size += drawable.color.data.buffer.byteLength;
            if(drawable instanceof Shape){
                size += drawable.matrix.data.buffer.byteLength;
            } else if (drawable instanceof Stroke){
                size += drawable.vertices.data.buffer.byteLength;
            } else if (drawable instanceof ShapeBatch){
                size += drawable.matrices.data.buffer.byteLength;
            }
        }
        return size;
    }


    // plotPoint(p: IPoint, radius = 0.001, color = ColorFStruct.create$(1,0,0,1)){
    //     let left = Point.create$(p.x - radius, p.y);
    //     let right = Point.create$(p.x + radius, p.y);
    //     let drawable = new Ellipse(this.ellipseProgram.mesh, color);
    //     drawable.stretchAcrossLine(left, right);
    //     this.points.push(drawable);
    // }

}

function heart(): MeshSource {
    return {
         vertices: [0,12,-3,16,-5,16,-8,12,-8,8,0,0,8,8,8,12,5,16,3,16], 
         indices: Mesh.polygonIndices(10)
    }
}

function flower(): MeshSource {
    return { 
        vertices: [0,-2,-1,-1,-2,-1,-2,-2,-3,-3,-1,-3,-2,-4,-2,-5,-1,-5,0,-6,0,-4,1,-5,2,-5,2,-4,3,-3,1,-3,2,-2,2,-1,1,-1,0,0], 
        indices: [5,0,1,5,1,2,5,2,3,5,3,4,5,6,7,5,7,8,5,8,9,5,9,10,5,10,0,15,0,10,15,10,11,15,11,12,15,12,13,15,13,14,15,16,17,15,17,18,15,18,19,15,19,0] 
    };
}

function bat(): MeshSource {
    return { 
        vertices: [0,3,-2,5,-3,2,-5,0,-8,3,-10,7,-17,10,-13,5,-12,-1,-3,-7,0,-10,3,-7,12,-1,13,5,17,10,10,7,8,3,5,0,3,2,2,5], 
        indices: [0,1,2,0,2,3,0,3,9,0,9,10,0,10,11,0,11,17,0,17,18,0,18,19,4,5,6,4,6,7,4,7,8,4,8,9,4,9,3,16,14,15,16,13,14,16,12,13,16,11,12,16,17,11] 
    };
}

interface MeshMap {
    [key: string]: Mesh;
}