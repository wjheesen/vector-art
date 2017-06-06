import { Drawable } from '../drawable/drawable';
import { Renderer } from '../rendering/renderer';
import { Action } from './action';
import pullAt = require('lodash.pullat');


export class AddDrawable implements Action {

    constructor(
        public drawable: Drawable,
        public index: number){
    }

    redo(renderer: Renderer) {
        let { drawable, index } = this;
        let stack = renderer.drawables;
        stack.splice(index, 0, drawable); // "insert(stack, index, drawable)"
    }

    undo(renderer: Renderer) {
        let { index } = this;
        let stack = renderer.drawables;
        pullAt(stack, index);
    }
}