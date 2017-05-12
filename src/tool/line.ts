import { Surface } from '../surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { IPoint } from "gl2d/struct/point";
import { Status } from "gl2d/action/status";

type Action = MouseOrTouchAction<Surface>;

export class LineTool extends MouseOrTouchTool<Surface> {

    private start: IPoint;

    onAction(action: Action): void {
        switch(action.status){
            case Status.Start:
                return this.onStart(action);
            case Status.Move:
                return this.onMove(action);
            case Status.End:
                return this.onEnd(action);
        }
    }

   onStart(action: Action) {
        this.start = this.getPrimaryPointer(action);
    }

    onMove(action: MouseOrTouchAction<Surface>) {
        if (!this.start) { return; }
        let surface = action.target;
        let renderer = surface.renderer;
        let line = renderer.line;
        let start = this.start;
        let end = this.getPrimaryPointer(action);
        line.setThrough(start, end);
        surface.requestRender();
    }

    onEnd(action: Action) {
        this.start = null;
    }
}