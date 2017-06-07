import { Drawable } from '../drawable/drawable';
import { Renderer } from '../rendering/renderer';
import { Action } from './action';
import { IMat2d, Mat2d } from 'gl2d/struct/mat2d';

export class TransformDrawable implements Action {
    
    constructor(
        public drawable: Drawable,
        public matrix: IMat2d){
    }

    redo(renderer: Renderer) {
        let { drawable, matrix } = this;
        drawable.transform(matrix);
    }

    undo(renderer: Renderer) {
        let { drawable, matrix } = this;
        let inverse = Mat2d.inverse(matrix);
        drawable.transform(inverse);
    }
}