import { ColorStruct } from 'gl2d/struct/color';
import { Drawable } from '../drawable/drawable';
import { Renderer } from '../rendering/renderer';
import { Action } from './action';

export class SetColorOfDrawable implements Action {

    constructor(
        public drawable: Drawable,
        public oldColor: ColorStruct,
        public newColor: ColorStruct
    ){}

    redo(renderer: Renderer) {
        let { drawable, newColor } = this;
        drawable.color.setFromColor(newColor);
    }

    undo(renderer: Renderer) {
        let { drawable, oldColor } = this;
        drawable.color.setFromColor(oldColor);
    }
}