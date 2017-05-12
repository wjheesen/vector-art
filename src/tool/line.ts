import { ColorFStruct } from 'gl2d/struct/colorf';
import { Surface } from '../surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { IPoint } from "gl2d/struct/point";
import { Status } from "gl2d/action/status";
import { Line } from '../graphic/line';

type Action = MouseOrTouchAction<Surface>;

export class LineTool extends MouseOrTouchTool<Surface> {

    private start: IPoint;
    private line: Line;

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
        if(!this.line){ 
            let color = ColorFStruct.create(renderer.color);
            this.line = new Line(color, renderer.lineThickness);
            renderer.graphics.push(this.line);
        }
        let start = this.start;
        let end = this.getPrimaryPointer(action);
        this.line.setFromPointToPoint(start, end);
        surface.requestRender();
    }

    onEnd(action: Action) {
        this.start = null;
        this.line = null;
    }
}