import { VertexBuffer } from 'gl2d/struct/vertex';
import { Stroke } from '../drawable/stroke';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { Status } from "gl2d/action/status";

type Action = MouseOrTouchAction<Surface>;

export class StrokeTool extends MouseOrTouchTool<Surface> {

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
        let surface = action.target;
        let { lineWidth } = surface;
        let pointer = this.getPrimaryPointer(action);
        let stroke = surface.getTempStroke();
        stroke.begin(pointer, lineWidth)
        surface.requestRender();
    }

    onDrag(action: MouseOrTouchAction<Surface>) {
        let surface = action.target;
        let { lineWidth } = surface;
        let pointer = this.getPrimaryPointer(action);
        let stroke = surface.getTempStroke();
        if(stroke.vertices.hasValidPosition()){ 
            stroke.add(pointer, lineWidth);
            surface.requestRender();
        }
    }

    onEnd(action: Action) {
        let surface = action.target;
        surface.addTempDrawable();
        surface.requestRender();
    }
}