import { Status } from 'gl2d/action/status';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";

type Action = MouseOrTouchAction<Surface>;

export type OnColorSample = (color: ColorFStruct) => any; 

export class ColorSampler extends MouseOrTouchTool<Surface> {

    constructor(public onColorSample: OnColorSample){
        super();
    }

    onAction(action: Action): void {
        switch(action.status){
            case Status.Start:
            case Status.Drag:
                let surface = action.target;
                let pointer = this.getPrimaryPointer(action);
                let drawable = surface.getDrawableContaining(pointer);
                if(drawable){
                    let color = drawable.color;
                    this.onColorSample(color);
                }
        }
    }
}