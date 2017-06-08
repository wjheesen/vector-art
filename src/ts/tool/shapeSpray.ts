import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { Status } from "gl2d/action/status";

type Action = MouseOrTouchAction<Surface>;

export class ShapeSprayTool extends MouseOrTouchTool<Surface> {

    onAction(action: Action): void {
        switch(action.status){
            case Status.Drag:
                return this.onDrag(action);
            case Status.End:
                return this.onEnd(action);
        }
    }

    onDrag(action: MouseOrTouchAction<Surface>) {

        let surface = action.target;
        let stroke = surface.getTempShapeBatch();

        // Add another shape if there is room
        let matrices = stroke.matrices;
        if(matrices.position() < matrices.capacity()){
            let center = this.getPrimaryPointer(action);
            let radius = surface.lineWidth / 2;
            stroke.add(center, radius);
            surface.requestRender();
        }
    }

    onEnd(action: Action) {
        let surface = action.target;
        surface.addTempShapeBatch();
        surface.requestRender();
    }
}