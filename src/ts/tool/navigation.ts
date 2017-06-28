import { Status } from 'gl2d/event/status';
import { MouseOrTouchTool } from 'gl2d/tool/mouseOrTouch';
import { Shape } from '../drawable/shape';
import { MouseOrTouchEvent } from '../event/mouseOrTouch';
import { Surface } from '../rendering/surface';

export class NavigationTool extends MouseOrTouchTool<Surface> {

    private previousButton: Shape;
    
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
        let { navigateLeft, navigateRight, addCanvas, removeCanvas } = surface.renderer;
        let pointer = this.getPrimaryPointer(event);

        // If a new button is being hovered
        for(let button of [navigateLeft, navigateRight, addCanvas, removeCanvas]){
            if(button.contains(pointer)){
                if(button !== this.previousButton){
                    // Indicate hover by changing stroke color to blue
                    button.strokeColor.set$(0, 0.3, 1, 0.6);
                    // Reset previous hover
                    this.resetHover();
                    // Keep track of hovered button
                    this.previousButton = button;
                    // Render to show hovered button
                    surface.requestRender();
                }
                return;
            }
        }

        // Nothing hovered
        this.resetHover();
        surface.requestRender();
    }

    onStart(event: MouseOrTouchEvent) {
        this.onMove(event);
    }

    onEnd(event: MouseOrTouchEvent) {
        let surface = event.target;
        let { navigateLeft, navigateRight, addCanvas, removeCanvas } = surface.renderer;
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
        this.resetHover();
        surface.requestRender();
    }

    private resetHover(){
         // Set stroke color of previous button back to black
        if(this.previousButton){
            this.previousButton.strokeColor.set$(0,0,0,0.5);
            this.previousButton = null;
        }
    }
}