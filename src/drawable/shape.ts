import { Drawable } from './drawable';
import { Mat2dStruct, Mat2d } from 'gl2d/struct/mat2d';
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

    scale(sx: number, sy: number){
        this.transform(Mat2d.scale(sx, sy, this.measureCenter()));
    }

    stretch(ratio: number){
        this.scale(ratio, ratio);
    }

    rotate(angle: number){
        this.transform(Mat2d.rotate(angle, this.measureCenter()));
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