import { VertexBuffer } from 'gl2d/struct/vertex';
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
        let vertices = new VertexBuffer(renderer.buffer);
        this.stroke = this.strokeBuilder.begin(color, vertices, pointer, renderer.lineThickness);
        renderer.temp = this.stroke;
    }

    onDrag(action: MouseOrTouchAction<Surface>) {
        if (!this.stroke || !this.stroke.vertices.hasValidPosition()) { return; }
        let surface = action.target;
        let renderer = surface.renderer;
        let pointer = this.getPrimaryPointer(action);
        this.strokeBuilder.add(this.stroke, pointer, renderer.lineThickness);
        surface.requestRender();
    }

    onEnd(action: Action) {
        let surface = action.target;
        let renderer = surface.renderer;
        renderer.temp = this.strokeBuilder.end(this.stroke);
        this.stroke = null;
        renderer.addDrawable();
        surface.requestRender();
    }
}