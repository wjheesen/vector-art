import { ScaleToFit } from 'gl2d/struct/mat2d';
import { Surface } from '../rendering/surface';
import { Ellipse } from "../drawable/ellipse";
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { IPoint } from "gl2d/struct/point";
import { Status } from "gl2d/action/status";
import { ColorFStruct } from "gl2d/struct/colorf";
import { Rect } from 'gl2d/struct/rect';

type Action = MouseOrTouchAction<Surface>;

export class EllipseTool extends MouseOrTouchTool<Surface> {

    private start: IPoint;
    private ellipse: Ellipse;

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
        if (!this.start) { return; }
        let surface = action.target;
        let renderer = surface.renderer;
        if(!this.ellipse){ 
            let color = ColorFStruct.create(renderer.color);
            this.ellipse = new Ellipse(renderer.ellipseProgram.mesh, color);
            renderer.graphics.push(this.ellipse);
        }
        let start = this.start;
        let end = this.getPrimaryPointer(action);
        if(renderer.maintainAspect){
            this.ellipse.stretchAcrossLine(start, end);
        } else {
            this.ellipse.mapToRect(Rect.unionOfPoints([start, end]), ScaleToFit.Fill);
        }
        surface.requestRender();
    }

    onEnd(action: Action) {
        this.start = null;
        this.ellipse = null;
    }
}