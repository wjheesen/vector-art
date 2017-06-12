import { MouseOrTouchEvent } from '../event/mouseOrTouch';
import { Surface } from '../rendering/surface';
import { SurfaceMouseOrTouchEvent } from 'gl2d/event/mouseOrTouch';
import { Status } from 'gl2d/event/status';
import { Point } from 'gl2d/struct/point';
import { MouseOrTouchTool } from 'gl2d/tool/mouseOrTouch';

export class LineTool extends MouseOrTouchTool<Surface> {

    private start: Point;

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
        this.start = this.getPrimaryPointer(event);
    }

    onDrag(event: SurfaceMouseOrTouchEvent<Surface>) {
        if (!this.start) { return; }
        let surface = event.target;
        let line = surface.getTempLine();
        // Transform line based on start and end points
        let start = this.start;
        let end = this.getPrimaryPointer(event);
        line.setFromPointToPoint(start, end, surface.lineWidth);
        surface.requestRender();
    }

    onEnd(event: MouseOrTouchEvent) {
        this.start = null;
        let surface = event.target;
        surface.addTempDrawable();
        surface.requestRender();
    }
}