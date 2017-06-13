import { Drawable } from './drawable';

export interface ShapeBatch extends Drawable {
    typeId: number;
    matrices: ArrayBuffer;
}