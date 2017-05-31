import { Mat2dBuffer } from 'gl2d/struct/mat2d';
import { ShapeBatch } from '../drawable/shapeBatch';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { Status } from "gl2d/action/status";

type Action = MouseOrTouchAction<Surface>;

export class ShapeStrokeTool extends MouseOrTouchTool<Surface> {

    private shapeStroke: ShapeBatch;

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
        let center = this.getPrimaryPointer(action);
        let radius = renderer.lineThickness / 2;
        let mesh = renderer.mesh;
        let color = ColorFStruct.create(renderer.color);
        let matrices = new Mat2dBuffer(renderer.buffer);
        this.shapeStroke = new ShapeBatch(mesh, color, matrices);
        this.shapeStroke.add(center, radius);
        renderer.temp = this.shapeStroke;
        surface.requestRender();
    }

    onDrag(action: MouseOrTouchAction<Surface>) {
        let spray = this.shapeStroke;
        let position = spray.matrices.position();
        let capacity = spray.matrices.capacity();
        if (!spray || position >= capacity ) { return; }
        let surface = action.target;
        let renderer = surface.renderer;
        let center = this.getPrimaryPointer(action);
        let radius = renderer.lineThickness / 2;
        spray.add(center, radius);
        surface.requestRender();
    }

    onEnd(action: Action) {
        let surface = action.target;
        let renderer = surface.renderer;
        let buffer = this.shapeStroke.matrices;
        let size = buffer.position();
        if(size > 0){
            buffer.moveToFirst();
            this.shapeStroke.matrices = Mat2dBuffer.create(size);
            this.shapeStroke.matrices.putBuffer(buffer, size);
            renderer.addDrawable();
        }
        this.shapeStroke = null;
        renderer.temp = null;
        surface.requestRender();
    }
}