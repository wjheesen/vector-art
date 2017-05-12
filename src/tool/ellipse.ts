import { Surface } from '../surface';
import { Ellipse } from "../graphic/ellipse";
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { IPoint } from "gl2d/struct/point";
import { Status } from "gl2d/action/status";
import { ColorFStruct } from "gl2d/struct/colorf";

type Action = MouseOrTouchAction<Surface>;

export class EllipseTool extends MouseOrTouchTool<Surface> {

    private start: IPoint;
    private ellipse: Ellipse;

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
        if(!this.ellipse){ 
            let color = ColorFStruct.create(renderer.color);
            this.ellipse = new Ellipse(color);
            renderer.graphics.push(this.ellipse);
        }
        let start = this.start;
        let end = this.getPrimaryPointer(action);
        this.ellipse.setFromPointToPoint(start, end, renderer.maintainAspect);
        surface.requestRender();
    }

    onEnd(action: Action) {
        this.start = null;
        this.ellipse = null;
    }
}