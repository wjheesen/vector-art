import { Action } from "./action";

/**
 * Keeps a record of event.s that can be undone or redone.
 */
export class ActionRecord {
    undoableActions: Action[] = [];
    redoableActions: Action[] = [];

    push(undoableAction: Action){
        this.undoableActions.push(undoableAction);
        this.redoableActions.length = 0;
    }
}