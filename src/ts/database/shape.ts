import { Drawable } from './drawable';

export interface Shape extends Drawable {
    type: string,
    matrix: ArrayBuffer;
}