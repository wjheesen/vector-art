import { Drawable } from './drawable';

export interface Stroke extends Drawable {
    vertices: ArrayBuffer;
    matrix: ArrayBuffer;
}