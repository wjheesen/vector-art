import { Surface } from '../rendering/surface';
import { Action } from './action';


export class MoveForwardAction implements Action {

    constructor(
        public index: number,
    ){}

    redo(surface: Surface) {
        let { index } = this;
        surface.swap(index, index + 1);
    }

    undo(surface: Surface) {
        this.redo(surface); // To undo a swap, redo a swap
    }
}