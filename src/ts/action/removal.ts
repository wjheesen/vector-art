import { Insertion } from './insertion';
import { Surface } from '../rendering/surface';

export class Removal extends Insertion {

    redo(surface: Surface) {
        super.undo(surface);
    }

    undo(surface: Surface) {
        super.redo(surface);
    }
}