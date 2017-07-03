import { Action } from "./action";

/**
 * Stack of actions that can be undone or redone.
 */
export class ActionStack {
    undos: Action[] = [];
    redos: Action[] = [];

    push(action: Action){
        this.undos.push(action);
        this.redos.length = 0;
    }

    pop(){
        if(this.undos.length > 0){
            return this.undos.pop();
        } else {
            return null;
        }
    }

    clear(){
        this.undos.length = 0;
        this.redos.length = 0;
    }
}