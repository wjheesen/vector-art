import { Drawable } from './drawable';

export interface Shape extends Drawable {
    typeId: number;
    matrix: ArrayBuffer;
}