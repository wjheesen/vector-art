import { Frame } from '../drawable/frame';
import { FramedDrawable } from '../drawable/framed';
import { FrameProgram } from '../program/frame';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Drawable } from '../drawable/drawable';
import { ShapeProgram } from 'gl2d/program/shape';
import { EllipseProgram } from '../program/ellipse';
import { Renderer as Base } from 'gl2d/rendering/renderer'
import { Mesh } from "gl2d/drawable/mesh";
import { IPoint, Point } from "gl2d/struct/point";
import { Ellipse } from "../drawable/ellipse";
import { Selection } from '../drawable/selection'

export class Renderer extends Base {

    shapeProgram: ShapeProgram;
    ellipseProgram: EllipseProgram;
    frameProgram: FrameProgram;
    drawables: Drawable[] = [];

    selection: Selection;
    hover: FramedDrawable;

    points: Drawable[] = [];
    
    meshes = [Mesh.square(), Mesh.star5(), Mesh.diamond(), ];
    lineMesh = this.meshes[0];
    mesh = this.meshes[1];
    lineThickness = 0.3;
    maintainAspect = true;
    color = new ColorFStruct();

    onSurfaceCreated(): void {
        let gl = this.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        // Init programs
        this.shapeProgram = ShapeProgram.create(gl, this.meshes);
        this.ellipseProgram = EllipseProgram.create(gl);
        this.frameProgram = FrameProgram.create(gl);
        // Init selection boxes
        let frameThickness = 0.1;
        let pointRadius = 0.03;
        let blue = ColorFStruct.create$(0, 0.2, 0.9, 0.9);
        let blueHover = ColorFStruct.create$(0, 0.2, 0.9, 0.3);
        let red = ColorFStruct.create$(1,0,0,0.9);
        let pointMesh = this.ellipseProgram.mesh;
        this.selection = Selection.create(blue, frameThickness, pointMesh, red, pointRadius);
        this.hover = new FramedDrawable(new Frame(blueHover, frameThickness));
    }

    onDrawFrame(): void {
        let gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT);
        for(let graphic of this.drawables){
            graphic.draw(this);
        }
        if(this.selection.target){
            this.selection.draw(this);
        }
        if(this.hover.target){
            this.hover.draw(this);
        }
        for(let point of this.points){
            point.draw(this);
        }
    }

    getDrawableContaining(point: IPoint){
        let drawables = this.drawables;
        for(let i = drawables.length - 1; i>=0; i--){
            let drawable = drawables[i];
            if(drawable.contains(point)){
                return drawable;
            }
        }
        return null;
    }

    plotPoint(p: IPoint, radius = 0.03, color = ColorFStruct.create$(1,0,0,1)){
        let left = Point.create$(p.x - radius, p.y);
        let right = Point.create$(p.x + radius, p.y);
        let drawable = new Ellipse(this.ellipseProgram.mesh, color);
        drawable.stretchAcrossLine(left, right);
        this.points.push(drawable);
    }

}