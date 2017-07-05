import { Surface } from '../rendering/surface';
import { Action } from './action';


export class MoveToBackAction implements Action {

    constructor(
        public zIndex: number,
    ){}

    redo(surface: Surface) {
        let { zIndex } = this;
        let { renderer, database } = surface;
        let { drawables } = renderer;
        let backDrawable = drawables[0];
        // Search for drawable with specified zIndex
        let index = drawables.findIndex(drawable => drawable.zIndex === zIndex);
        let drawable = drawables[index];
        // Remove drawable from stack and add to back
        drawables.splice(index, 1);
        drawables.splice(0, 0, drawable);
        // Save order in database
        drawable.zIndex = backDrawable.zIndex - 1;
        drawable.saveZindex(database);
    }

    undo(surface: Surface) {
        let { zIndex } = this;
        let { renderer, database } = surface;
        let { drawables } = renderer;
        // Remove drawable from back of stack
        let drawable = drawables.shift();
        // Restore to previous position in stack
        drawable.zIndex = zIndex;
        surface.addDrawableToSortedStack(drawable);
        // Save order in database
        drawable.saveZindex(database);
    }
}