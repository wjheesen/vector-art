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
        let surface = event.target;
        let { navigateLeft, navigateRight, addCanvas, removeCanvas, buttonHover } = surface.renderer;
        let pointer = this.getPrimaryPointer(event);

        // If button is being hovered
        for(let button of [navigateLeft, navigateRight, addCanvas, removeCanvas]){
            let bounds = button.measureBoundaries();
            if(bounds.contains(pointer)){
                // Indicate with blue button hover
                buttonHover.mapToRect(bounds);
                surface.requestRender();
                return;
            }
        }

        // No button is being hovered
        if(!buttonHover.matrix.equalsScalar(0)){
            // Remove blue button hover
            buttonHover.matrix.setScalar(0);
            surface.requestRender();
        }
    }

    onStart(event: MouseOrTouchEvent) {
        this.onMove(event);
    }

    onEnd(event: MouseOrTouchEvent) {
        let surface = event.target;
        let { navigateLeft, navigateRight, addCanvas, removeCanvas, buttonHover } = surface.renderer;
        let pointer = this.getPrimaryPointer(event);
        if(navigateLeft.measureBoundaries().contains(pointer)){
            surface.importCanvasOnLeft();
        } else if (navigateRight.measureBoundaries().contains(pointer)){
            surface.importCanvasOnRight();
        } else if (addCanvas.measureBoundaries().contains(pointer)){
            surface.addCanvas();
        } else if(removeCanvas.measureBoundaries().contains(pointer)) {
            surface.removeCanvas();
        }
        buttonHover.matrix.setScalar(0);
        surface.requestRender();
    }
}