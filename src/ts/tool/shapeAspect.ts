import { MouseOrTouchEvent } from '../event/mouseOrTouch';
import { ShapeTool } from './shape';

export class ShapeAspectTool extends ShapeTool{

    onDrag(event: MouseOrTouchEvent) {
        if (!this.start) { return; }
        let surface = event.target;
        let shape = surface.getTempShape();
        let start = this.start;
        let end = this.getPrimaryPointer(event);
        shape.stretchAcrossLine(start, end);
        surface.requestRender();
    }
}