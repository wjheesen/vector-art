import { Status } from 'gl2d/event/status';
import { MouseOrTouchTool } from 'gl2d/tool/mouseOrTouch';
import { MouseOrTouchEvent } from '../event/mouseOrTouch';
import { Surface } from '../rendering/surface';

export class NavigationTool extends MouseOrTouchTool<Surface> {
    
    onSurfaceEvent(event: MouseOrTouchEvent): void {
        switch(event.status){
            case Status.Move:
                return this.onMove(event);
            case Status.Start:
                return this.onStart(event);
            case Status.End:
                return this.onEnd(event);
        }
    }

    onMove(event: MouseOrTouchEvent) {
        // let pointer = this.getPrimaryPointer(event);

    }

    onStart(event: MouseOrTouchEvent) {
        // let pointer = this.getPrimaryPointer(event);

    }

    onEnd(event: MouseOrTouchEvent) {
    
    }
}