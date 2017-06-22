import { Shape } from '../drawable/shape';
import { Surface } from '../rendering/surface';
import { Point } from 'gl2d/struct/point';
import { SurfaceMouseOrTouchEvent } from 'gl2d/event/mouseOrTouch';
import { Status } from 'gl2d/event/status';
import { MouseOrTouchTool } from 'gl2d/tool/mouseOrTouch';

type Action = SurfaceMouseOrTouchEvent<Surface>;

export class TraceTool extends MouseOrTouchTool<Surface> {

    private start: Point;

    onSurfaceEvent(action: Action): void {
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

    onDrag(action: SurfaceMouseOrTouchEvent<Surface>) {
        if(!this.start){ return; }
        let surface = action.target;
        let { lineWidth, mesh } = surface;
        let end = this.getPrimaryPointer(action);
        let stroke = surface.getTempStroke();
        let shape = new Shape(mesh); // TODO: cache?
        shape.stretchAcrossLine(this.start, end);
        stroke.trace(shape, lineWidth);
        surface.requestRender();
    }

    onEnd(action: Action) {
        let surface = action.target;
        surface.addTempStroke();
        surface.requestRender();
    }
}