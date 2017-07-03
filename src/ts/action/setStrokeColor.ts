import { ColorStruct } from 'gl2d/struct/color';
import { Drawable } from '../drawable/drawable';
import { Surface } from '../rendering/surface';
import { Action } from './action';

export class SetStrokeColorAction implements Action {

    constructor(
        public drawable: Drawable,
        public oldColor: ColorStruct,
        public newColor: ColorStruct
    ){}

    redo(surface: Surface) {
        let { drawable, newColor } = this;
        drawable.strokeColor.setFromColor(newColor);
        drawable.saveStrokeColor(surface.database);
    }

    undo(surface: Surface) {
        let { drawable, oldColor } = this;
        drawable.strokeColor.setFromColor(oldColor);
        drawable.saveStrokeColor(surface.database);
    }
}