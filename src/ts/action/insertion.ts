import { Drawable } from '../drawable/drawable';
import { Surface } from '../rendering/surface';
import { Action } from './action';


export class Insertion implements Action {

    constructor(
        public drawable: Drawable,
        public index: number){
    }

    redo(surface: Surface) {
        let { drawable, index } = this;
        let stack = surface.renderer.drawables;
        stack.splice(index, 0, drawable); // "stack.add(index, drawable)"
        drawable.save(surface);
    }

    undo(surface: Surface) {
        let { drawable, index } = this;
        let stack = surface.renderer.drawables;
        stack.splice(index, 1); // "stack.remove(index)"
        drawable.delete(surface);
    }
}