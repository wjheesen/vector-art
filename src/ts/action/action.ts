import { Renderer } from '../rendering/renderer';

export interface Action {
    redo(renderer: Renderer): any;
    undo(renderer: Renderer): any;
}