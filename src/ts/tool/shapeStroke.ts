import { MouseOrTouchEvent } from '../event/mouseOrTouch';
import { Surface } from '../rendering/surface';
import { Status } from 'gl2d/event/status';
import { Point } from 'gl2d/struct/point';
import { MouseOrTouchTool } from 'gl2d/tool/mouseOrTouch';

export class ShapeStrokeTool extends MouseOrTouchTool<Surface> {

    private previous: Point;

    onSurfaceEvent(event: MouseOrTouchEvent): void {
        switch(event.status){
            case Status.Start:
                return this.onStart(event);
            case Status.Drag:
                return this.onDrag(event);
            case Status.End:
                return this.onEnd(event);
        }
    }

    onStart(event: MouseOrTouchEvent) {
        this.previous = this.getPrimaryPointer(event);
    }

    onDrag(event: MouseOrTouchEvent) {
        if(!this.previous) { return; }

        let surface = event.target;
        let stroke = surface.getTempShapeBatch();
        let thickness = surface.lineWidth;
        let current = this.getPrimaryPointer(event);
        let previous = this.previous;

        // Add line from current to previous shape if there is room
        if(current.distance2(previous) > thickness * thickness){
            this.previous = stroke.addLine(previous, current, thickness);
            surface.requestRender();
        }
    }

    onEnd(event: MouseOrTouchEvent) {
        let surface = event.target;
        surface.addTempShapeBatch();
        surface.requestRender();
    }
}