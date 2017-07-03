import { Drawable } from '../drawable/drawable';
import { Surface } from '../rendering/surface';
import { Action } from './action';

export class SetLineWidthAction implements Action {

    constructor(
        public drawable: Drawable,
        public oldLineWidth: number,
        public newLineWidth: number
    ){}

    redo(surface: Surface) {
        let { drawable, newLineWidth } = this;
        drawable.lineWidth = newLineWidth;
        drawable.saveLineWidth(surface.database);
    }

    undo(surface: Surface) {
        let { drawable, oldLineWidth } = this;
        drawable.lineWidth = oldLineWidth;
        drawable.saveLineWidth(surface.database);
    }
}