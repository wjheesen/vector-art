import { Drawable } from '../drawable/drawable';
import { Surface } from '../rendering/surface';
import { Action } from './action';


export class AddDrawableAction implements Action {

    constructor(
        public drawable: Drawable,
        public index: number){
    }

    redo(surface: Surface) {
        let { drawable, index } = this;
        let { database, canvasId, renderer } = surface;
        renderer.drawables.splice(index, 0, drawable); // "add(index, drawable)"
        drawable.save(database, canvasId.val);
    }

    undo(surface: Surface) {
        let { drawable, index } = this;
        let { database, canvasId, renderer } = surface;
        renderer.drawables.splice(index, 1); // "stack.remove(index)"
        drawable.save(database, canvasId.val);
    }
}