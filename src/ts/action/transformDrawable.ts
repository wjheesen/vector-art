import { Drawable } from '../drawable/drawable';
import { Surface } from '../rendering/surface';
import { Action } from './action';
import { Mat2d } from 'gl2d/struct/mat2d';

export class TransformDrawableAction implements Action {
    
    constructor(
        public drawable: Drawable,
        public matrix: Mat2d){
    }

    redo(surface: Surface) {
        let { drawable, matrix } = this;
        let { database } = surface;
        drawable.transform(matrix);
        drawable.savePosition(database)
    }

    undo(surface: Surface) {
        let { drawable, matrix } = this;
        let { database } = surface;
        let inverse = Mat2d.inverse(matrix);
        drawable.transform(inverse);
        drawable.savePosition(database)
    }
}