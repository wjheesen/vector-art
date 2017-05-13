import { Renderer } from '../renderer';
import { RectStruct } from 'gl2d/struct/rect';
import { ColorFStruct } from 'gl2d/struct/colorf';

export class Frame {

    color: ColorFStruct
    innerRect: RectStruct
    thickness: number;

    constructor(color: ColorFStruct, thickness: number, innerRect?: RectStruct){
        this.color = color;
        this.thickness = thickness;
        if (innerRect === undefined) {
            this.innerRect = new RectStruct();
        } else {
            this.innerRect = innerRect;
        }
    }

    draw(renderer: Renderer){
        let gl = renderer.gl;
        let program = renderer.frameProgram;
        renderer.useProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setInnerRect(gl, this.innerRect);
        program.setColor(gl, this.color);
        program.setThickness(gl, this.thickness);
        program.draw(gl);
    }
}