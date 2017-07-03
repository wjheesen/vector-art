import { Renderer } from '../rendering/renderer';
import { Shape } from './shape';
import { Mat2d } from 'gl2d/struct/mat2d';
import { PointLike } from 'gl2d/struct/point';
import { Rect } from 'gl2d/struct/rect';

export class Ellipse extends Shape {

    /**
     * Sets this ellipse to an ellipse with the specified axes and center point.
     * @param rx the semi-x axis.
     * @param ry the semi-y axis.
     * @param center the center of the ellipse. Defaults to the origin.
     */
    set(rx: number, ry: number, center?: PointLike){
        this.matrix.setScale(rx, ry);
        if(center){
            this.matrix.postTranslate(center);
        }
    }

    measureBoundaries(){
        return Ellipse.measureBoundaries(this.matrix);
    }

    /**
     * Measures the boundaries of a unit circle transformed to an ellipse by the specified matrix.
     * @param matrix the transformation matrix.
     */
    static measureBoundaries(matrix: Mat2d){
            // Performs singular value decomposition of the model matrix to extract
            // (1) The length of the semi-x axis (sx), which is equal to the first singular value in the Sigma matrix
            // (2) The length of the semi-y axis (sy), which is equal to the second singular value in the Sigma matrix
            // (3) The rotation angle (phi), from -PI/2 to PI/2, which is equal to the angle used to form the U matrix
            // Boundaries are then meausure with the formula:
            // x = (sx)^2 * (cos(phi)^2) + (sy)^2*(sin(phi)^2)
            // y = (sx)^2 * (sin(phi)^2) + (sy)^2*(cos(phi)^2)
            // left = tx - x, right = tx + x, bottom = ty - y, top = ty + y
            let { c1r1: a, c2r1: b, c3r1: tx, c1r2: c, c2r2: d, c3r2: ty } = matrix;

            // Helper variables:
            let a2 = a*a;
            let b2 = b*b;
            let c2 = c*c;
            let d2 = d*d;
            let m = a*c + b*d;
            let n = a2 + b2 - c2 - d2;

            // Cos and sin of angle squared:
            let phi = 0.5 * Math.atan2(2*m, n);
            let cos2 = Math.pow(Math.cos(phi), 2);
            let sin2 = Math.pow(Math.sin(phi), 2);

            // Length of axes squared:
            let s1 = a2 + b2 + c2 + d2;
            let s2 = Math.sqrt(n*n + 4*m*m);
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
    contains(pt: PointLike, inverse?: Mat2d) {
        let modelPoint = this.convertPointToModelSpace(pt, inverse);
        if(this.mesh.bounds.contains(modelPoint)){
            return modelPoint.distance2() <= 1;
        } else {
            return false;
        }
    }

    draw(renderer: Renderer){
        let { gl, ext, ellipseProgram } = renderer;
        let { fillColor, matrix, strokeColor, lineWidth } = this;
        renderer.attachProgram(ellipseProgram);
        ellipseProgram.setProjection(gl, renderer.camera.matrix);
        ellipseProgram.setMatrices(gl, matrix);
        ellipseProgram.setFillColor(gl, fillColor);
        ellipseProgram.setLineWidth(gl, lineWidth);
        if(lineWidth){
            ellipseProgram.setStrokeColor(gl, strokeColor);
        }
        ext.drawArraysInstancedANGLE(gl.TRIANGLE_FAN, 0, 4, 1);
    }
}
