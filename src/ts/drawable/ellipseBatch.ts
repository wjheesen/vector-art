import { Ellipse } from './ellipse';
import { ShapeBatch } from './shapeBatch';
import { Renderer } from '../rendering/renderer';
import { Mat2d } from 'gl2d/struct/mat2d';
import { PointLike } from "gl2d/struct/point";
import { Rect } from "gl2d/struct/rect";
import { Point } from "gl2d/struct/point";

export class EllipseBatch extends ShapeBatch {

    measureBoundaries(): Rect {
        let bounds = <Rect> null;
        let matrices = this.matrices;

        if(matrices.moveToFirst()){
            // Enclose the first ellipse
            bounds = Ellipse.measureBoundaries(matrices);
            // Enclose the remaining ellipses
            while (matrices.moveToNext()){
                bounds.union(Ellipse.measureBoundaries(matrices));
            }
        }
        
        // Bounds will be null if batch is empty
        return bounds;
    }

    /**
     * Returns true if any shape in this batch contains the specified point.
     */
    contains(pt: PointLike): boolean {
        let matrices = this.matrices;
        let bounds = this.mesh.bounds;
        let inverse = new Mat2d();
        let modelPt = new Point();
        matrices.moveToPosition(-1);
        while(matrices.moveToNext()){
            inverse.setInverse(matrices);
            inverse.map(pt, modelPt);
            if(bounds.contains(modelPt) && modelPt.distance2() <= 1){
               return true;
            }
        }
        return false;
    }

    draw(renderer: Renderer){
        let { gl, ext, ellipseProgram: ellipseProgram } = renderer;
        let matrices = this.matrices;
        let primcount = matrices.capacity();
        renderer.attachProgram(ellipseProgram);
        ellipseProgram.setProjection(gl, renderer.camera.matrix);
        ellipseProgram.setMatrices(gl, matrices);
        ellipseProgram.setFillColor(gl, this.fillColor);
        ellipseProgram.setLineWidth(gl, 0);
        ext.drawArraysInstancedANGLE(gl.TRIANGLE_FAN, 0, 4, primcount);
    }
    
}

