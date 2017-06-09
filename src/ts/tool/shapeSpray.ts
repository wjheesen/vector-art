import { MouseOrTouchEvent } from '../event/mouseOrTouch';
import { Surface } from '../rendering/surface';
import { Status } from 'gl2d/event/status';
import { MouseOrTouchTool } from 'gl2d/tool/mouseOrTouch';

export class ShapeSprayTool extends MouseOrTouchTool<Surface> {

    onSurfaceEvent(event: MouseOrTouchEvent): void {
        switch(event.status){
            case Status.Drag:
                return this.onDrag(event);
            case Status.End:
                return this.onEnd(event);
        }
    }

    onDrag(event: MouseOrTouchEvent) {

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

    onEnd(event: MouseOrTouchEvent) {
        let surface = event.target;
        surface.addTempShapeBatch();
        surface.requestRender();
    }
}