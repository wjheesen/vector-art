import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { SurfaceMouseOrTouchEvent } from "gl2d/event/mouseOrTouch";
import { Status } from "gl2d/event/status";

type SurfaceEvent = SurfaceMouseOrTouchEvent<Surface>;

export class ShapeSprayTool extends MouseOrTouchTool<Surface> {

    onAction(event: SurfaceEvent): void {
        switch(event.status){
            case Status.Drag:
                return this.onDrag(event);
            case Status.End:
                return this.onEnd(event);
        }
    }

    onDrag(event: SurfaceMouseOrTouchEvent<Surface>) {

        let surface = event.target;
        let stroke = surface.getTempShapeBatch();

        // Add another shape if there is room
        let matrices = stroke.matrices;
        if(matrices.position() < matrices.capacity()){
            let center = this.getPrimaryPointer(event);
            let radius = surface.lineWidth / 2;
            stroke.add(center, radius);
            surface.requestRender();
        }
    }

    onEnd(event: SurfaceEvent) {
        let surface = event.target;
        surface.addTempShapeBatch();
        surface.requestRender();
    }
}