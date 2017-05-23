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

    selection: Selection;
    hover: FramedDrawable;

    // points: Ellipse[] = [];
    
    meshes = [Mesh.square(), Mesh.star5(), Mesh.diamond(), ];
    lineMesh = this.meshes[0];
    mesh = this.meshes[1];
    lineThickness = 0.01;
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

    removeDrawableIfOutsideTarget(drawable?: Drawable){
        let target = this.camera.target;
        if(drawable && !target.intersects(drawable.measureBoundaries())){
            this.drawables = this.drawables.filter(d => d !== drawable);
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

    // plotPoint(p: IPoint, radius = 0.001, color = ColorFStruct.create$(1,0,0,1)){
    //     let left = Point.create$(p.x - radius, p.y);
    //     let right = Point.create$(p.x + radius, p.y);
    //     let drawable = new Ellipse(this.ellipseProgram.mesh, color);
    //     drawable.stretchAcrossLine(left, right);
    //     this.points.push(drawable);
    // }

}