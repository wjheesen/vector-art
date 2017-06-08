import { Surface } from '../rendering/surface';
import { SurfaceMouseOrTouchEvent } from 'gl2d/event/mouseOrTouch';
import { Status } from 'gl2d/event/status';
import { MouseOrTouchTool } from 'gl2d/tool/mouseOrTouch';

type Action = SurfaceMouseOrTouchEvent<Surface>;

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

    onDrag(action: SurfaceMouseOrTouchEvent<Surface>) {
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