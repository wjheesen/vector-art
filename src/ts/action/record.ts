import { Action } from "./action";

/**
 * Keeps a record of event.s that can be undone or redone.
 */
export class ActionRecord {
    undoableActions: Action[] = [];
    redoableActions: Action[] = [];

    push(action: Action){
        this.undoableActions.push(action);
        this.redoableActions.length = 0;
    }

    clear(){
        this.undoableActions.length = 0;
        this.redoableActions.length = 0;
    }
}