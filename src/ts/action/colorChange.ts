import { ColorStruct } from 'gl2d/struct/color';
import { Drawable } from '../drawable/drawable';
import { Surface } from '../rendering/surface';
import { Action } from './action';

export class ColorChange implements Action {

    constructor(
        public drawable: Drawable,
        public oldColor: ColorStruct,
        public newColor: ColorStruct
    ){}

    redo(surface: Surface) {
        let { drawable, newColor } = this;
        drawable.fillColor.setFromColor(newColor);
    }

    undo(surface: Surface) {
        let { drawable, oldColor } = this;
        drawable.fillColor.setFromColor(oldColor);
    }
}