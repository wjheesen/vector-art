import { ScaleToFit } from 'gl2d/struct/mat2d';
import { Rect } from 'gl2d/struct/rect';
import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { SurfaceMouseOrTouchEvent } from "gl2d/event/mouseOrTouch";
import { IPoint } from "gl2d/struct/point";
import { Status } from "gl2d/event/status";
import {Option } from '../option/option';

type SurfaceEvent = SurfaceMouseOrTouchEvent<Surface>;

export class ShapeTool extends MouseOrTouchTool<Surface> {

    private start: IPoint;
    public maintainAspect = Option.bool("maintain-aspect", true);

    onSurfaceEvent(event: SurfaceEvent): void {
        switch(event.status){
            case Status.Start:
                return this.onStart(event);
            case Status.Drag:
                return this.onDrag(event);
            case Status.End:
                return this.onEnd(event);
        }
    }

   onStart(event: SurfaceEvent) {
        this.start = this.getPrimaryPointer(event);
   }

    onDrag(event: SurfaceMouseOrTouchEvent<Surface>) {
        if (!this.start) { return; }
        let surface = event.target;
        let shape = surface.getTempShape();
        //Transform shape based on start and end points
        let start = this.start;
        let end = this.getPrimaryPointer(event);
        if (this.maintainAspect.val) {
            shape.stretchAcrossLine(start, end);
        } else {
            shape.mapToRect(Rect.unionOfPoints([start, end]), ScaleToFit.Fill);
        }
        surface.requestRender();
    }

    onEnd(event: SurfaceEvent) {
        this.start = null;
        let surface = event.target;
        surface.addTempDrawable();
        surface.requestRender();
    }
}