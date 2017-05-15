import { Shape } from './shape';
import { Renderer } from '../renderer';
import { IPoint } from "gl2d/struct/point";
import { IMat2d } from "gl2d/struct/mat2d";

export class Ellipse extends Shape {

    draw(renderer: Renderer){
        let gl = renderer.gl;
        let program = renderer.ellipseProgram;
        renderer.useProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setColor(gl, this.color);
        program.setMatrix(gl, this.matrix);
        program.draw(gl);
    }

    /**
     * Checks if this ellipse contains the point (x,y).
     * @param point the point to check.
     * @param inverse the inverse of this ellipse's model matrix. If undefined, the inverse matrix will be calculated on the fly.
     */
    contains(pt: IPoint, inverse?: IMat2d) {
        let modelPoint = this.convertPointToModelSpace(pt, inverse);
        if(this.mesh.bounds.containsPoint(modelPoint)){
            return modelPoint.distance2() <= 1;
        } else {
            return false;
        }
    }
}