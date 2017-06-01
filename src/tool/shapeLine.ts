import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { Status } from "gl2d/action/status";
import { IPoint } from "gl2d/struct/point";

type Action = MouseOrTouchAction<Surface>;

export class ShapeLineTool extends MouseOrTouchTool<Surface> {
    
    private start: IPoint;

    onAction(action: Action): void {
        switch(action.status){
            case Status.Start:
                return this.onStart(action);
            case Status.Drag:
                return this.onDrag(action);
            case Status.End:
                return this.onEnd(action);
        }
    }

    onStart(action: Action) {
        this.start = this.getPrimaryPointer(action);
    }

    onDrag(action: Action) {
        if(!this.start) { return; }

        let surface = action.target;
        let renderer = surface.renderer;
        let start = this.start;
        let end = this.getPrimaryPointer(action);
        let stroke = renderer.getTempShapeBatch();

        // Clear previous line
        let matrices = stroke.matrices;
        matrices.moveToFirst(); 

        // Add new line
        stroke.addLine(start, end, renderer.lineThickness);

        surface.requestRender();
    }

    onEnd(action: Action) {
        this.start = null;
        let surface = action.target;
        let renderer = surface.renderer;
        renderer.addTempShapeBatch();
        surface.requestRender();
    }
}