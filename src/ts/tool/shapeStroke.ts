import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { SurfaceMouseOrTouchEvent } from "gl2d/event/mouseOrTouch";
import { Status } from "gl2d/event/status";
import { IPoint } from "gl2d/struct/point";

type SurfaceEvent = SurfaceMouseOrTouchEvent<Surface>;

export class ShapeStrokeTool extends MouseOrTouchTool<Surface> {

    private previous: IPoint;

    onSurfaceEvent(event: SurfaceEvent): void {
        switch(event.status){
            case Status.Start:
                return this.onStart(event);
            case Status.Drag:
                return this.onDrag(event);
            case Status.End:
                return this.onEnd(event);
        }
    }

    onStart(event: SurfaceEvent) {
        this.previous = this.getPrimaryPointer(event);
    }

    onDrag(event: SurfaceMouseOrTouchEvent<Surface>) {
        if(!this.previous) { return; }

        let surface = event.target;
        let stroke = surface.getTempShapeBatch();
        let thickness = surface.lineWidth;
        let current = this.getPrimaryPointer(event);
        let previous = this.previous;

        // Add line from current to previous shape if there is room
        if(IPoint.distance2(current, previous) > thickness * thickness){
            this.previous = stroke.addLine(previous, current, thickness);
            surface.requestRender();
        }
    }

    onEnd(event: SurfaceEvent) {
        let surface = event.target;
        surface.addTempShapeBatch();
        surface.requestRender();
    }
}