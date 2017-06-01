import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { Status } from "gl2d/action/status";

type Action = MouseOrTouchAction<Surface>;

export class ShapeLayerTool extends MouseOrTouchTool<Surface> {

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
        let renderer = surface.renderer;
        let stroke = renderer.getTempShapeBatch();

        // Add another shape if there is room
        let matrices = stroke.matrices;
        if(matrices.position() < matrices.capacity()){
            let center = this.getPrimaryPointer(action);
            let radius = renderer.lineThickness / 2;
            stroke.add(center, radius);
            surface.requestRender();
        }
    }

    onEnd(action: Action) {
        let surface = action.target;
        let renderer = surface.renderer;
        renderer.addTempShapeBatch();
        surface.requestRender();
    }
}