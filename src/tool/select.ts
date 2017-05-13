import { Frame } from '../graphic/frame';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Surface } from '../surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { Status } from "gl2d/action/status";

type Action = MouseOrTouchAction<Surface>;

export class SelectTool extends MouseOrTouchTool<Surface> {

    onAction(action: Action): void {
        let surface = action.target;
        let renderer = surface.renderer;
        let pointer = this.getPrimaryPointer(action);
        let graphic = renderer.getGraphicContainingPoint(pointer);
        if(!graphic){ return; } // TODO: check frame not set
        if(!renderer.frame){
            let color = ColorFStruct.create$(0, 0.2, 0.9, 0.9);
            renderer.frame = new Frame(color, 0.1);
        }
        renderer.frame.innerRect.set(graphic.getBounds());
        console.log(renderer.frame.innerRect.toString());
        switch(action.status){
            case Status.Start:
            case Status.Move:
                renderer.frame.color.a = 0.3;
                break;
            case Status.End:
                renderer.frame.color.a = 0.9;
                break;
        }
        surface.requestRender();
    }
}