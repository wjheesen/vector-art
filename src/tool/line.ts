import { ColorFStruct } from 'gl2d/struct/colorf';
import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { IPoint } from "gl2d/struct/point";
import { Status } from "gl2d/action/status";
import { Line } from '../drawable/line';

type Action = MouseOrTouchAction<Surface>;

export class LineTool extends MouseOrTouchTool<Surface> {

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

    onDrag(action: MouseOrTouchAction<Surface>) {
        if (!this.start) { return; }
        let surface = action.target;
        let renderer = surface.renderer;
        let line = renderer.temp as Line;
        // Init line if needed
        if(!line){ 
            let color = ColorFStruct.create(renderer.color);
            line = new Line(renderer.meshes.square, color);
            renderer.temp = line;
        }
        // Transform line based on start and end points
        let start = this.start;
        let end = this.getPrimaryPointer(action);
        line.setFromPointToPoint(start, end, renderer.lineThickness);
        surface.requestRender();
    }

    onEnd(action: Action) {
        this.start = null;
        let surface = action.target;
        let renderer = surface.renderer;
        renderer.addDrawable();
        surface.requestRender();
    }
}