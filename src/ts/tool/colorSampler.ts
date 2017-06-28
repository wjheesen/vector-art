import { MouseOrTouchEvent } from '../event/mouseOrTouch';
import { Surface } from '../rendering/surface';
import { Status } from 'gl2d/event/status';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { MouseOrTouchTool } from 'gl2d/tool/mouseOrTouch';

export type OnColorSample = (color: ColorFStruct) => any; 

export class ColorSampler extends MouseOrTouchTool<Surface> {

    constructor(public onColorSample: OnColorSample){
        super();
    }

    onSurfaceEvent(event: MouseOrTouchEvent): void {
        switch(event.status){
            case Status.Start:
            case Status.Drag:
                let surface = event.target;
                let pointer = this.getPrimaryPointer(event);
                let drawable = surface.getDrawableContaining(pointer);
                if(drawable){
                    let color = drawable.fillColor;
                    this.onColorSample(color);
                }
        }
    }
}