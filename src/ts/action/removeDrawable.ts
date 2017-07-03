import { AddDrawableAction } from './addDrawable';
import { Surface } from '../rendering/surface';

export class RemoveDrawableAction extends AddDrawableAction {

    redo(surface: Surface) {
        super.undo(surface);
    }

    undo(surface: Surface) {
        super.redo(surface);
    }
}