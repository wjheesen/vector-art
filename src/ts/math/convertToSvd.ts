import { Mat2dLike, Mat2d } from 'gl2d/struct/mat2d';

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

    let s1 = q + r;
    let s2 = q - r;

    let a1 = Math.atan2(g,f);
    let a2 = Math.atan2(h,e);

    let theta = (a2 - a1) / 2;
    let phi = (a2 + a2) / 2;

    let u = Mat2d.rotate(phi); 
    let s = Mat2d.scale(s1, s2);
    let v = Mat2d.rotate(theta);

    return { u: u, s: s, v: v }
}