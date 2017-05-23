import { StrokeBuilder } from '../drawable/strokeBuilder';
import { Stroke } from '../drawable/stroke';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { Status } from "gl2d/action/status";

type Action = MouseOrTouchAction<Surface>;

export class StrokeTool extends MouseOrTouchTool<Surface> {

    private stroke: Stroke;
    private strokeBuilder = new StrokeBuilder();

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
        let renderer = surface.renderer;
        let pointer = this.getPrimaryPointer(action);
        let color = ColorFStruct.create(renderer.color);
        this.stroke = this.strokeBuilder.begin(color, pointer, renderer.lineThickness);
        renderer.graphics.push(this.stroke);
    }

    onDrag(action: MouseOrTouchAction<Surface>) {
        if (!this.stroke || !this.stroke.vertices.hasValidPosition()) { return; }
        let surface = action.target;
        let renderer = surface.renderer;
        let pointer = this.getPrimaryPointer(action);
        this.strokeBuilder.add(this.stroke, pointer, renderer.lineThickness);
        // console.log("sections", this.stroke.vertices.position() / 2 - 1)
        surface.requestRender();
    }

    onEnd(action: Action) {
        let surface = action.target;
        let renderer = surface.renderer;
        if(!this.strokeBuilder.end(this.stroke)){
            renderer.graphics.pop();
        }
        this.stroke = null;
        surface.requestRender();
    }
}