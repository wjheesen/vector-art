import { Shape } from './shape';
import { Renderer } from '../rendering/renderer';
import { IPoint,} from "gl2d/struct/point";
import { IMat2d } from 'gl2d/struct/mat2d';
import { Rect } from "gl2d/struct/rect";

export class Ellipse extends Shape {

    /**
     * Sets this ellipse to an ellipse with the specified axes and center point.
     * @param rx the semi-x axis.
     * @param ry the semi-y axis.
     * @param center the center of the ellipse. Defaults to the origin.
     */
    set(rx: number, ry: number, center?: IPoint){
        this.matrix.setScale(rx, ry);
        if(center){
            this.matrix.postTranslate(center);
        }
    }

    measureBoundaries(){
        // Performs singular value decomposition of the model matrix to extract
        // (1) The length of the semi-x axis (sx), which is equal to the first singular value in the Sigma matrix
        // (2) The length of the semi-y axis (sy), which is equal to the second singular value in the Sigma matrix
        // (3) The rotation angle (theta), from -PI/2 to PI/2, which is equal to the angle used to form the U matrix
        // Note: there is no need to compute the matrix V*
        // Boundaries are then computed with the formula:
        // x = (sx)^2 * (cos(theta)^2) + (sy)^2*(sin(theta)^2)
        // y = (sx)^2 * (sin(theta)^2) + (sy)^2*(cos(theta)^2)
        // left = tx - x, right = tx + x, bottom = ty - y, top = ty + y
        let { c1r1: a, c2r1: b, c3r1: tx, c1r2: c, c2r2: d, c3r2: ty } = this.matrix;

        // Helper variables:
        let a2 = a*a;
        let b2 = b*b;
        let c2 = c*c;
        let d2 = d*d;
        let m = a*c + b*d;
        let n = a2 + b2 - c2 - d2;

        // Cos and sin of angle squared:
        let theta = 0.5 * Math.atan2(2*m, n);
        let cos2 = Math.pow(Math.cos(theta), 2);
        let sin2 = Math.pow(Math.sin(theta), 2);

        // Length of axes squared:
        let s1 = a2 + b2 + c2 + d2;
        let s2 = Math.sqrt(Math.pow(n, 2) + 4*Math.pow(m, 2));
        let sx2 = 0.5 * (s1 + s2);
        let sy2 = 0.5 * (s1 - s2);

        // Boundaries:
        let x = Math.sqrt(sx2*cos2 + sy2*sin2);
        let y = Math.sqrt(sx2*sin2 + sy2*cos2);
        return Rect.lrbt(tx-x,tx+x,ty-y,ty+y);
    }

    /**
     * Checks if this ellipse contains the point (x,y).
     * @param point the point to check.
     * @param inverse the inverse of this ellipse's model matrix. If undefined, the inverse matrix will be calculated on the fly.
     */
    contains(pt: IPoint, inverse?: IMat2d) {
        let modelPoint = this.convertPointToModelSpace(pt, inverse);
        if(this.mesh.bounds.contains(modelPoint)){
            return modelPoint.distance2() <= 1;
        } else {
            return false;
        }
    }

    draw(renderer: Renderer){
        let gl = renderer.gl;
        let program = renderer.ellipseProgram;
        renderer.attachProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setColor(gl, this.color);
        program.setMatrices(gl, this.matrix);
        program.draw(renderer);
    }
}