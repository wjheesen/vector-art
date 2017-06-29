import { Mat2d, Mat2dLike } from 'gl2d/struct/mat2d';
import { MouseOrTouchEvent } from '../event/mouseOrTouch';
import { ShapeTool } from './shape';

export class ShapeAspectTool extends ShapeTool{

    onDrag(event: MouseOrTouchEvent) {
        if (!this.start) { return; }
        let surface = event.target;
        let shape = surface.getTempShape();
        let start = this.start;
        let end = this.getPrimaryPointer(event);
        shape.stretchAcrossLine(start, end);
        let { u, s, v } = convertToSVD(shape.matrix);
        console.log("u", u.toString(), "s", s.toString(), "v", v.toString());
        v.postConcat(s);
        v.postConcat(u);
        console.log("matrix", shape.matrix.toString(), "svd", v.toString());
        surface.requestRender();
    }
}

export function convertToSVD(matrix: Mat2dLike){

    let a = matrix.c1r1;
    let b = matrix.c2r1;
    let c = matrix.c1r2;
    let d = matrix.c2r2;

    let e = (a + d) / 2;
    let f = (a - d) / 2;
    let g = (c + b) / 2;
    let h = (c - b) / 2;

    let q = Math.sqrt(e*e + h*h);
    let r = Math.sqrt(f*f + g*g);

    let sx = q + r;
    let sy = q - r;

    let a1 = Math.atan2(g,f);
    let a2 = Math.atan2(h,e);

    let theta = (a2 - a1) / 2;
    let phi = (a2 + a1) / 2;

    // let sign = Math.sign(sy);

    let u = Mat2d.rotate(phi); 
    // u.c2r1 *= sign; 
    // u.c2r2 *= sign;
    let s = Mat2d.scale(sx, sy);
    let v = Mat2d.rotate(theta);

    console.log("angle (degrees)", (theta + phi) * 180 / Math.PI);

    return { u: u, s: s, v: v }
}