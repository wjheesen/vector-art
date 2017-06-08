import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { Status } from "gl2d/action/status";
import { IPoint } from "gl2d/struct/point";

type Action = MouseOrTouchAction<Surface>;

export class ShapeStrokeTool extends MouseOrTouchTool<Surface> {

    private previous: IPoint;

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
        this.previous = this.getPrimaryPointer(action);
    }

    onDrag(action: MouseOrTouchAction<Surface>) {
        if(!this.previous) { return; }

        let surface = action.target;
        let renderer = surface.renderer;
        let stroke = surface.getTempShapeBatch();
        let thickness = surface.lineWidth;
        let current = this.getPrimaryPointer(action);
        let previous = this.previous;

        // Add line from current to previous shape if there is room
        if(IPoint.distance2(current, previous) > thickness * thickness){
            this.previous = stroke.addLine(previous, current, thickness);
            surface.requestRender();
        }
    }

    onEnd(action: Action) {
        let surface = action.target;
        let renderer = surface.renderer;
        surface.addTempShapeBatch();
        surface.requestRender();
    }
}