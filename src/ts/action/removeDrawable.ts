import { AddDrawable } from './addDrawable';
import { Renderer } from '../rendering/renderer';

export class RemoveDrawable extends AddDrawable {

    redo(renderer: Renderer) {
        super.undo(renderer);
    }

    undo(renderer: Renderer) {
        super.redo(renderer);
    }
}