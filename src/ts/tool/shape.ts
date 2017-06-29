import { MouseOrTouchEvent } from '../event/mouseOrTouch';
import { Surface } from '../rendering/surface';
import { ScaleToFit } from 'gl2d/struct/mat2d';
import { Point } from 'gl2d/struct/point';
import { Rect } from 'gl2d/struct/rect';
import { MouseOrTouchTool } from 'gl2d/tool/mouseOrTouch';
import { Status } from "gl2d/event/status";

export class ShapeTool extends MouseOrTouchTool<Surface> {

    protected start: Point;

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

    onDrag(event: MouseOrTouchEvent) {
        if (!this.start) { return; }
        let surface = event.target;
        let shape = surface.getTempShape();
        let start = this.start;
        let end = this.getPrimaryPointer(event);
        let dst = Rect.unionOfPoints([start, end]);
        shape.mapToRect(dst, ScaleToFit.Fill);
        surface.requestRender();
    }

    onEnd(event: MouseOrTouchEvent) {
        this.start = null;
        let surface = event.target;
        surface.addTempDrawable();
        surface.requestRender();
    }
}

