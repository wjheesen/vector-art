import { Drawable } from '../drawable/drawable';
import { Surface } from '../rendering/surface';
import { Action } from './action';
import { IMat2d, Mat2d } from 'gl2d/struct/mat2d';

export class Transformation implements Action {
    
    constructor(
        public drawable: Drawable,
        public matrix: IMat2d){
    }

    redo(surface: Surface) {
        let { drawable, matrix } = this;
        drawable.transform(matrix);
    }

    undo(surface: Surface) {
        let { drawable, matrix } = this;
        let inverse = Mat2d.inverse(matrix);
        drawable.transform(inverse);
    }
}