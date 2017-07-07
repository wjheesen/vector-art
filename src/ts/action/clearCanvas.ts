import { Drawable } from '../drawable/drawable';
import { Surface } from '../rendering/surface';
import { Action } from './action';


export class ClearCanvasAction implements Action {

    constructor(
        public drawables: Drawable[]
    ){}

    redo(surface: Surface) {
        let { database, canvasId, renderer } = surface;
        // Replace drawbles with empty stack
        renderer.drawables = [];
        // Delete each drawable from database
        database.clearCanvas(canvasId.val);
    }

    undo(surface: Surface) {
        let { drawables } = this;
        let { database, renderer } = surface;
        let canvasId = surface.canvasId.val;
        // Replace empty stack with drawables
        renderer.drawables = drawables;
        // Save each drawable to database
        for(let drawable of drawables){
            drawable.save(database, canvasId);
        }
    }
}