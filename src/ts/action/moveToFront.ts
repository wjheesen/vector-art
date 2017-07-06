import { Surface } from '../rendering/surface';
import { Action } from './action';


export class MoveToFrontAction implements Action {

    constructor(
        public zIndex: number,
    ){}

    redo(surface: Surface) {
        let { zIndex } = this;
        let { renderer, database } = surface;
        let { drawables } = renderer;
        // Search for drawable with specified zIndex
        let index = drawables.findIndex(drawable => drawable.zIndex === zIndex);
        let drawable = drawables[index];
        // Remove drawable from stack and push to front
        drawables.splice(index, 1);
        drawables.push(drawable);
        // Save order in database
        drawable.zIndex = surface.zIndex++;
        drawable.saveZindex(database);
    }

    undo(surface: Surface) {
        let { zIndex } = this;
        let { renderer, database } = surface;
        let { drawables } = renderer;
        // Remove drawable from front of stack
        let drawable = drawables.pop();
        // Restore to previous position in stack
        drawable.zIndex = zIndex;
        surface.addDrawableToSortedStack(drawable);
        // Save order in database
        drawable.saveZindex(database);
    }
}