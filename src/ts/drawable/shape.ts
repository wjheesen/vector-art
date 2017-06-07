import { Drawable } from './drawable';
import { Mat2dStruct } from 'gl2d/struct/mat2d';
import { Shape as Base } from 'gl2d/drawable/shape';
import { Renderer } from '../rendering/renderer';
import { Mesh } from "gl2d/drawable/mesh";
import { ColorFStruct } from "gl2d/struct/colorf";

export class Shape extends Base implements Drawable {

    /**
     * The color of this shape. 
     */
    color: ColorFStruct;

    constructor(mesh: Mesh, color: ColorFStruct, matrix?: Mat2dStruct){
        super(mesh, matrix);
        this.color = color;
    }

    draw(renderer: Renderer){
        let gl = renderer.gl;
        let program = renderer.shapeProgram;
        renderer.attachProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setColor(gl, this.color);
        program.setMesh(gl, this.mesh);
        program.setMatrices(gl, this.matrix);
        program.draw(renderer);
    }
}