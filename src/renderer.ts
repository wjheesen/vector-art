import { Frame } from './drawable/frame';
import { FrameProgram } from './program/frame';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Drawable } from './drawable/drawable';
import { ShapeProgram } from 'gl2d/program/shape';
import { EllipseProgram } from './program/ellipse';
import { Renderer as Base } from 'gl2d/rendering/renderer'
import { Mesh } from "gl2d/graphics/mesh";
import { IPoint, Point } from "gl2d/struct/point";
import { Ellipse } from "./drawable/ellipse";

export class Renderer extends Base {

    shapeProgram: ShapeProgram;
    ellipseProgram: EllipseProgram;
    frameProgram: FrameProgram;
    drawables: Drawable[] = [];
    frame = new Frame(ColorFStruct.create$(0, 0.2, 0.9, 0.9), 0.1);
    points: Drawable[] = [];
    
    meshes = [Mesh.square(), Mesh.star5(), Mesh.diamond(), ];
    lineMesh = this.meshes[0];
    mesh = this.meshes[1];
    lineThickness = 0.3;
    maintainAspect = true;
    color = ColorFStruct.create$(0.5,0.7,0.2,0.7);

    onSurfaceCreated(): void {
        let gl = this.gl;
        gl.clearColor(0, 0, 0, 0);
        // gl.enable(gl.CULL_FACE);
        // gl.cullFace(gl.BACK);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        this.shapeProgram = ShapeProgram.create(gl, this.meshes);
        this.ellipseProgram = EllipseProgram.create(gl);
        this.frameProgram = FrameProgram.create(gl);
    }

    onDrawFrame(): void {
        let gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT);
        for(let graphic of this.drawables){
            graphic.draw(this);
        }
        if(!this.frame.innerRect.isEmpty()){
            this.frame.draw(this);
        }
        for(let point of this.points){
            point.draw(this);
        }
    }

    getDrawableContaining(point: IPoint){
        let graphics = this.drawables;
        for(let i = graphics.length - 1; i>=0; i--){
            let graphic = graphics[i];
            if(graphic.contains(point)){
                return graphic;
            }
        }
        return null;
    }

    plotPoint(p: IPoint, thickness = 0.03, color = ColorFStruct.create$(1,0,0,1)){
        let left = Point.create$(p.x - thickness, p.y);
        let right = Point.create$(p.x + thickness, p.y);
        let drawable = new Ellipse(this.ellipseProgram.mesh, color);
        drawable.stretchAcrossLine(left, right);
        this.points.push(drawable);
    }

}