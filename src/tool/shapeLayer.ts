import { EllipseBatch } from '../drawable/ellipseBatch';
import { Mat2dBuffer } from 'gl2d/struct/mat2d';
import { ShapeBatch } from '../drawable/shapeBatch';
import { ColorFStruct } from 'gl2d/struct/colorf';
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
        let mesh = renderer.mesh;
        let stroke = renderer.temp as ShapeBatch;

        // Init shape stroke if needed
        if(!stroke){
            let color = ColorFStruct.create(renderer.color);
            let matrices = new Mat2dBuffer(renderer.buffer);
            if(mesh){
                stroke = new ShapeBatch(mesh, color, matrices);
            } else {
                stroke = new EllipseBatch(renderer.ellipseProgram.mesh, color, matrices);
            }
            renderer.temp = stroke;
        }

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
        let stroke = renderer.temp as ShapeBatch;
        if(stroke){
            let buffer = stroke.matrices;
            let size = buffer.position();
            buffer.moveToFirst();
            stroke.matrices = Mat2dBuffer.create(size);
            stroke.matrices.putBuffer(buffer, size);
            renderer.addDrawable();
            surface.requestRender();
        }
    }
}