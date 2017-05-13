import { Mat2dStruct } from 'gl2d/struct/mat2d';
import { Graphic } from './graphic';
import { Renderer } from '../renderer';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mesh } from 'gl2d/graphics/mesh';
import { Shape as Base } from 'gl2d/graphics/shape';

export class Shape extends Base implements Graphic {

    color: ColorFStruct

    constructor(color: ColorFStruct, mesh: Mesh, matrix?: Mat2dStruct){
        super(mesh, matrix);
        this.color = color;
    }

    getBounds(){
        return super.measureBoundaries();
    }
    

    draw(renderer: Renderer){
        let gl = renderer.gl;
        let program = renderer.shapeProgram;
        renderer.useProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setColor(gl, this.color);
        program.setMesh(gl, this.mesh);
        program.setMatrix(gl, this.matrix);
        program.draw(gl);
    }

}