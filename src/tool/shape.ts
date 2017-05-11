import { Surface } from '../surface';

import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";

export class ShapeTool extends MouseOrTouchTool<Surface> {

    onAction(action: MouseOrTouchAction<Surface>): void {
        throw new Error('Method not implemented.');
    }
}