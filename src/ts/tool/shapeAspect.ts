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
        surface.requestRender();
    }
}

// TODO: move to gl2d
// export function convertToSVD(matrix: Mat2dLike){

//     let a = matrix.c1r1;
//     let b = matrix.c2r1;
//     let c = matrix.c1r2;
//     let d = matrix.c2r2;

//     let e = (a + d) / 2;
//     let f = (a - d) / 2;
//     let g = (c + b) / 2;
//     let h = (c - b) / 2;

//     let q = Math.sqrt(e*e + h*h);
//     let r = Math.sqrt(f*f + g*g);

//     let sx = q + r;
//     let sy = q - r;

//     let a1 = Math.atan2(g,f);
//     let a2 = Math.atan2(h,e);

//     let theta = (a2 - a1) / 2;
//     let phi = (a2 + a1) / 2;

//     let u = Mat2d.rotate(phi); 
//     let s = Mat2d.scale(sx, sy);
//     let v = Mat2d.rotate(theta);

//     return { u: u, s: s, v: v }
// }