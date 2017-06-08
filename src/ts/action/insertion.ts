import { Drawable } from '../drawable/drawable';
import { Surface } from '../rendering/surface';
import { Action } from './action';
import pullAt = require('lodash.pullat');


export class Insertion implements Action {

    constructor(
        public drawable: Drawable,
        public index: number){
    }

    redo(surface: Surface) {
        let { drawable, index } = this;
        let stack = surface.renderer.drawables;
        stack.splice(index, 0, drawable); // "insert(stack, index, drawable)"
    }

    undo(surface: Surface) {
        let { index } = this;
        let stack = surface.renderer.drawables;
        pullAt(stack, index);
    }
}