import { ColorStruct } from 'gl2d';
import { SetColorOfDrawable } from '../action/setColorOfDrawable';
import { TransformDrawable } from '../action/transformDrawable';
import { Action } from '../action/action';
import { AddDrawable } from '../action/addDrawable';
import { RemoveDrawable } from '../action/removeDrawable';
import { Drawable } from '../drawable/drawable';
import { Ellipse } from '../drawable/ellipse';
import { EllipseBatch } from '../drawable/ellipseBatch';
import { Frame } from '../drawable/frame';
import { FramedDrawable } from '../drawable/framed';
import { Line } from '../drawable/line';
import { Selection } from '../drawable/selection';
import { Shape } from '../drawable/shape';
import { ShapeBatch } from '../drawable/shapeBatch';
import { Stroke } from '../drawable/stroke';
import { SprayMesh } from '../mesh/spray';
import { EllipseProgram } from '../program/ellipse';
import { FrameProgram } from '../program/frame';
import { ShapeProgram } from '../program/shape';
import { StrokeProgram } from '../program/stroke';
import { ANGLEInstancedArrays } from './ANGLE_instanced_arrays';
import { Mesh, MeshSource } from 'gl2d/drawable/mesh';
import { Renderer as Base } from 'gl2d/rendering/renderer';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2d, Mat2dBuffer } from 'gl2d/struct/mat2d';
import { IPoint } from 'gl2d/struct/point';
import lastIndexOf = require('lodash.lastindexof');

export class Renderer extends Base {

    ext: ANGLEInstancedArrays;
    
    undoStack: Action[] = [];
    redoStack: Action[] = [];

    buffer = new Float32Array(25000); // 100kb

    shapeProgram: ShapeProgram;
    ellipseProgram: EllipseProgram;
    strokeProgram: StrokeProgram;
    frameProgram: FrameProgram;

    foreground: Frame;
    drawables: Drawable[] = [];
    temp: Drawable;

    selection: Selection;
    hover: FramedDrawable;

    // points: Ellipse[] = [];
    
    meshes: MeshMap = {
        "triangle": Mesh.polygon(3),
        "square": Mesh.square(),
        "pentagon": Mesh.polygon(5),
        "hexagon": Mesh.polygon(6),
        "octagon": Mesh.polygon(8),
        "diamond": Mesh.diamond(),
        "star3": Mesh.star(3, .25, 1),
        "star4": Mesh.star(4, .25, 1),
        "star5": Mesh.star5(),
        "star6": Mesh.star(6, .5, 1),
        "star8": Mesh.star(8, .5, 1),
        "star16": Mesh.star(16, .1, 1),
        "sun": Mesh.star(16, .8, 1),
        "heart": Mesh.fromSource(heart()),
        "flower": Mesh.fromSource(flower()),
        "bat": Mesh.fromSource(bat()),
    } 

    mesh: Mesh;
    lineThickness = 0.01;
    color = new ColorFStruct();

    onSurfaceCreated(): void {
        let gl = this.gl;
        gl.clearColor(1,1,1,0);  // Transparent white
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // ["octagon", "star3", "star4", "sun"].forEach(shape => {
        //     console.log(toSvg(this.meshes[shape]));
        // })
        
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
        let { temp, drawables, camera, undoStack, redoStack } = this;
        if(temp && camera.target.intersects(temp.measureBoundaries())){
            let index = drawables.length;
            drawables.push(temp);
            undoStack.push(new AddDrawable(temp, index));
            redoStack.length = 0;
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

    addTransform(drawable?: Drawable, matrix?: Mat2d){
        if(drawable && matrix && !matrix.equals(Mat2d.identity())){
            this.undoStack.push(new TransformDrawable(drawable, matrix));
            this.redoStack.length = 0;
        }
    }
    
    setDrawableColor(drawable: Drawable, color: ColorFStruct){
        let oldColor = ColorStruct.fromColorF(drawable.color);
        let newColor = ColorStruct.fromColorF(color);
        let action = new SetColorOfDrawable(drawable, oldColor, newColor);
        this.undoStack.push(action)
        drawable.color.set(color);
    }

    removeDrawable(drawable?: Drawable){
        let { drawables, undoStack } = this;

        let action: Action;
        if(drawable){
            let index = lastIndexOf(drawables, drawable);
            action = new RemoveDrawable(drawable, index);
            action.redo(this);
        } else if(drawables.length > 0){
           drawable = drawables.pop();
           action = new RemoveDrawable(drawable, drawables.length);
        } else {
            return false;
        }
      
        undoStack.push(action);
        return true;
    }

    undoLastAction(){
        let { drawables, undoStack, redoStack } = this;

        let action: Action;
        if(undoStack.length > 0){
            action = undoStack.pop();
        } else if(drawables.length > 0){
            action = new AddDrawable(drawables.pop(), drawables.length)
        } else {
            return false;
        }

        action.undo(this);
        redoStack.push(action);
        return true;
    }

    redoLastUndo(){
        let { undoStack, redoStack } = this;

        let action: Action;
        if(redoStack.length > 0){
            action = redoStack.pop();
        } else {
            return false;
        }

        action.redo(this);
        undoStack.push(action);
        return true;
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