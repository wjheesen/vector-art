import { ColorFStruct } from 'gl2d/struct/colorf';
import { Graphic } from './graphic/graphic';
import { ShapeProgram } from 'gl2d/program/shape';
import { EllipseProgram } from 'gl2d/program/ellipse';
import { LineProgram } from 'gl2d/program/line';
import { Renderer as Base } from 'gl2d/rendering/renderer'
import { Mesh } from "gl2d/graphics/mesh";

export class Renderer extends Base {


    shapeProgram: ShapeProgram;
    ellipseProgram: EllipseProgram;
    lineProgram: LineProgram;
    graphics: Graphic[] = [];
    
    meshes = [Mesh.diamond(), Mesh.star5()];
    mesh = this.meshes[0];
    lineThickness = 0.3;
    maintainAspect = true;
    color = ColorFStruct.create$(0.5,0.7,0.2,1);

    onSurfaceCreated(): void {
        let gl = this.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        this.shapeProgram = ShapeProgram.create(gl, this.meshes);
        this.ellipseProgram = EllipseProgram.create(gl);
        this.lineProgram = LineProgram.create(gl);
    }

    onDrawFrame(): void {
        for(let graphic of this.graphics){
            graphic.draw(this);
        }
    }
}