import { Surface } from '../rendering/surface';

export interface Action {
    redo(surface: Surface): any;
    undo(surface: Surface): any;
}