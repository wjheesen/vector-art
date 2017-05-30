import { MeshSource } from 'gl2d';
import { Batch } from '../drawable/batch';
import { Stroke } from '../drawable/stroke';
import { Shape } from '../drawable/shape';
import { StrokeProgram } from '../program/stroke';
import { Drawable } from '../drawable/drawable';
import { Frame } from '../drawable/frame';
import { FramedDrawable } from '../drawable/framed';
import { FrameProgram } from '../program/frame';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { ShapeProgram } from 'gl2d/program/shape';
import { EllipseProgram } from '../program/ellipse';
import { Renderer as Base } from 'gl2d/rendering/renderer'
import { Mesh } from "gl2d/drawable/mesh";
import { IPoint } from "gl2d/struct/point";
import { Selection } from '../drawable/selection'

export class Renderer extends Base {

    shapeProgram: ShapeProgram;
    ellipseProgram: EllipseProgram;
    strokeProgram: StrokeProgram;
    frameProgram: FrameProgram;

    foreground: Frame;
    drawables: Drawable[] = [];
    removed: Drawable[] = [];

    selection: Selection;
    hover: FramedDrawable;

    // points: Ellipse[] = [];
    
    meshes = [
        Mesh.polygon(3),
        Mesh.square(),
        Mesh.diamond(),
        Mesh.polygon(5),
        Mesh.polygon(6),
        Mesh.star5(),
        Mesh.fromSource(heart()),
        Mesh.fromSource(flower()),
        Mesh.fromSource(bat()),
    ]; 

    lineMesh = this.meshes[1];
    mesh = this.meshes[0];
    lineThickness = 0.01;
    sprayRadius = 0.01;
    maintainAspect = true;
    color = new ColorFStruct();

    onSurfaceCreated(): void {
        let gl = this.gl;
        gl.clearColor(1, 1, 1, 1);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        // Init programs
        this.shapeProgram = ShapeProgram.create(gl, this.meshes);
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

    removeDrawable(drawable?: Drawable){
        if(drawable){
            this.drawables = this.drawables.filter(d => d !== drawable);
        } else {
            drawable = this.drawables.pop();
        }
        this.removed.push(drawable);
    }

    removeDrawableIfOutsideTarget(drawable?: Drawable){
        let target = this.camera.target;
        if(drawable && !target.intersects(drawable.measureBoundaries())){
            this.removeDrawable(drawable);
        }
    }

    removeTopmostDrawableIfOutsideTarget(){
        let target = this.camera.target;
        let drawables = this.drawables;
        let count = drawables.length;
        if(count > 0 && !target.intersects(drawables[count-1].measureBoundaries())){
            this.drawables.pop();
        } 
    }

    measureStackSize(){
        let size = 0;
        for(let drawable of this.drawables){
            size += drawable.color.data.buffer.byteLength;
            if(drawable instanceof Shape){
                size += drawable.matrix.data.buffer.byteLength;
            } else if (drawable instanceof Stroke){
                size += drawable.vertices.data.buffer.byteLength;
            } else if (drawable instanceof Batch){
                for(let instance of drawable.instances){
                    size += instance.matrix.data.buffer.byteLength;
                }
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

