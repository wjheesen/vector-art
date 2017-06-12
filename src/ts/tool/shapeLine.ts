import { MouseOrTouchEvent } from '../event/mouseOrTouch';
import { Surface } from '../rendering/surface';
import { Status } from 'gl2d/event/status';
import { Point } from 'gl2d/struct/point';
import { MouseOrTouchTool } from 'gl2d/tool/mouseOrTouch';

export class ShapeLineTool extends MouseOrTouchTool<Surface> {
    
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

    onDrag(event: MouseOrTouchEvent) {
        if(!this.start) { return; }

        let surface = event.target;
        let start = this.start;
        let end = this.getPrimaryPointer(event);
        let stroke = surface.getTempShapeBatch();

        // Clear previous line
        let matrices = stroke.matrices;
        matrices.moveToFirst(); 

        // Add new line
        stroke.addLine(start, end, surface.lineWidth);

        surface.requestRender();
    }

    onEnd(event: MouseOrTouchEvent) {
        this.start = null;
        let surface = event.target;
        surface.addTempShapeBatch();
        surface.requestRender();
    }
}