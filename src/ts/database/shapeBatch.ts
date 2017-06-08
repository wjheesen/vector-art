import { Drawable } from './drawable';

export interface ShapeBatch extends Drawable {
    type: string;
    matrices: ArrayBuffer;
}