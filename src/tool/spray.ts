import { Mat2dBuffer } from 'gl2d/struct/mat2d';
import { Spray } from '../drawable/spray';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { Status } from "gl2d/action/status";

type Action = MouseOrTouchAction<Surface>;

export class SprayTool extends MouseOrTouchTool<Surface> {

    private spray: Spray;

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
        let mesh = renderer.sprayProgram.mesh;
        let color = ColorFStruct.create(renderer.color);
        let matrices = new Mat2dBuffer(renderer.buffer);
        this.spray = new Spray(mesh, color, matrices);
        this.spray.add(center, radius);
        renderer.temp = this.spray;
        surface.requestRender();
    }

    onDrag(action: MouseOrTouchAction<Surface>) {
        if (!this.spray || !this.spray.matrices.moveToNext()) { return; }
        let surface = action.target;
        let renderer = surface.renderer;
        let center = this.getPrimaryPointer(action);
        let radius = renderer.lineThickness / 2;
        this.spray.add(center, radius);
        surface.requestRender();
    }

    onEnd(action: Action) {
        let surface = action.target;
        let renderer = surface.renderer;
        let buffer = this.spray.matrices;
        let size = buffer.position();
        if(size > 0){
            buffer.moveToFirst();
            this.spray.matrices = Mat2dBuffer.create(size);
            this.spray.matrices.putBuffer(buffer, size);
            renderer.addDrawable();
        }
        this.spray = null;
        renderer.temp = null;
        surface.requestRender();
    }
}