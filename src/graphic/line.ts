import { LineStruct } from 'gl2d/struct/line';
import { Graphic } from './graphic';
import { Renderer } from '../renderer';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { IPoint } from "gl2d/struct/point";
import { Rect } from "gl2d/struct/rect";

export class Line extends LineStruct implements Graphic {

    color: ColorFStruct
    thickness: number;

    constructor(color: ColorFStruct, thickness: number){
        super();
        this.color = color;
        this.thickness = thickness;
    }

    getBounds(){
        return Rect.unionOfPoints$(this.data);
    }

    contains(point: IPoint){
        return super.contains(point, this.thickness * 0.5);
    }

    draw(renderer: Renderer){
        let gl = renderer.gl;
        let program = renderer.lineProgram;
        renderer.useProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setColor(gl, this.color);
        program.setThickness(gl, this.thickness)
        program.setLine(gl, this);
        program.draw(gl);
    }
}