import { ScaleToFit } from 'gl2d/struct/mat2d';
import { Rect } from 'gl2d/struct/rect';
import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { IPoint } from "gl2d/struct/point";
import { Status } from "gl2d/action/status";

type Action = MouseOrTouchAction<Surface>;

export class ShapeTool extends MouseOrTouchTool<Surface> {

    private start: IPoint;

    onAction(action: Action): void {
        switch(action.status){
            case Status.Start:
                return this.onStart(action);
            case Status.Drag:
                return this.onDrag(action);
            case Status.End:
                return this.onEnd(action);
        }
    }

   onStart(action: Action) {
        this.start = this.getPrimaryPointer(action);
   }

    onDrag(action: MouseOrTouchAction<Surface>) {
        if (!this.start) { return; }
        let surface = action.target;
        let renderer = surface.renderer;
        let shape = renderer.getTempShape();
        //Transform shape based on start and end points
        let start = this.start;
        let end = this.getPrimaryPointer(action);
        if (renderer.maintainAspect) {
            shape.stretchAcrossLine(start, end);
        } else {
            shape.mapToRect(Rect.unionOfPoints([start, end]), ScaleToFit.Fill);
        }
        surface.requestRender();
    }

    onEnd(action: Action) {
        this.start = null;
        let surface = action.target;
        let renderer = surface.renderer;
        renderer.addTempDrawable();
        surface.requestRender();
    }
}