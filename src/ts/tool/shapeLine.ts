import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { SurfaceMouseOrTouchEvent } from "gl2d/event/mouseOrTouch";
import { Status } from "gl2d/event/status";
import { IPoint } from "gl2d/struct/point";

type SurfaceEvent = SurfaceMouseOrTouchEvent<Surface>;

export class ShapeLineTool extends MouseOrTouchTool<Surface> {
    
    private start: IPoint;

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
        this.start = this.getPrimaryPointer(event);
    }

    onDrag(event: SurfaceEvent) {
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

    onEnd(event: SurfaceEvent) {
        this.start = null;
        let surface = event.target;
        surface.addTempShapeBatch();
        surface.requestRender();
    }
}