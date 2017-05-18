import { Renderer } from '../rendering/renderer';
import { RectStruct, Rect } from 'gl2d/struct/rect';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { IPoint, Point } from "gl2d/struct/point";

export class Frame {

    color: ColorFStruct
    thickness: number;
    innerRect: RectStruct

    constructor(color: ColorFStruct, thickness: number, innerRect?: RectStruct){
        this.color = color;
        this.thickness = thickness;
        if (innerRect === undefined) {
            this.innerRect = new RectStruct();
        } else {
            this.innerRect = innerRect;
        }
    }

    measureBoundaries(){
        let bounds = Rect.create(this.innerRect);
        let inset = -this.thickness;
        bounds.inset$(inset, inset);
        return bounds;
    }

    /**
     * Finds a vertex on this frame that is opposite the specified point.
     * @param point the point.
     * @return the vertex that is opposite the point.
     */
    getVertexOpposite(point: IPoint){
        let frame = this.innerRect;
        let opposite = new Point();
        // If the point is to the left of the frame center
        if(point.x < frame.centerX()){
            // Then the opposite point is to the right of the frame center
            opposite.x = frame.right;
        } else {
            // Otherwise the opposite point is to the left of the frame center
            opposite.x = frame.left;
        }
        // Similarly, if the point is below the fram center
        if(point.y < frame.centerY()){
            // Then the opposite point is above the frame center
            opposite.y = frame.top;
        } else {
            // Then the opposite point is below the frame center
            opposite.y = frame.bottom;
        }
        return opposite;
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