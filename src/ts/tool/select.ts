import { Ellipse } from '../drawable/ellipse';
import { Selection } from '../drawable/selection';
import { MouseOrTouchEvent } from '../event/mouseOrTouch';
import { Surface } from '../rendering/surface';
import { Status } from 'gl2d/event/status';
import { Mat2d } from 'gl2d/struct/mat2d';
import { Point } from 'gl2d/struct/point';
import { Vec2 } from 'gl2d/struct/vec2';
import { MouseOrTouchTool } from 'gl2d/tool/mouseOrTouch';

const enum Transformation{
    None,
    Translate,
    Rotate,
    Scale
}

export class SelectTool extends MouseOrTouchTool<Surface> {

    control?: Ellipse;
    previous?: Point;
    pivot? : Point;
    dragCount = 0;
    reselected = false;
    transform: Transformation;
    matrix: Mat2d;

    onSurfaceEvent(event: MouseOrTouchEvent): void {
        let pointer = this.getPrimaryPointer(event);
        
        switch(event.status){
            case Status.Move:
                this.onMove(event, pointer);
                return;
            case Status.Start:
                this.dragCount = 0;
                this.onStart(event, pointer);
                break;
            case Status.Drag:
                this.dragCount++;
                this.onDrag(event, pointer);
                break;
            case Status.End:
                this.onEnd(event, pointer);
                break;
        }
        
        this.previous = pointer;
    }

    onMove(event: MouseOrTouchEvent, pointer: Point){
        let surface = event.target;
        let { selection, hover } = surface.renderer;

        // If the point is outside of the selection 
        if(!selection.contains(pointer)){
            // And if the hovered target is not the same as the previous
            if(!hover.target || !hover.target.contains(pointer)){
                // Search for newly hovered drawable and select it if it exists
                hover.setTarget(surface.getDrawableContaining(pointer));
                // Render to show changes
                surface.requestRender();
            }
        }
    }

    onStart(event: MouseOrTouchEvent, pointer: Point) {
        let surface = event.target;
        let { selection, hover } = surface.renderer;
        this.reselected = selection.contains(pointer);

        if(this.reselected){
            // Reclicked a drawable that has already been selected
            this.transform = this.getTransformType(pointer, selection);
        } else {
            if(hover.contains(pointer)){
                // Selected a drawable that has already been indicated by the hover graphic
                selection.setTarget(hover.target);
                hover.setTarget(null);
                this.transform = Transformation.Translate;
            } else {
                // Selected a new drawable, or clicked on nothing
                selection.setTarget(surface.getDrawableContaining(pointer));
                this.transform = selection.target ? Transformation.Translate : Transformation.None;
            }
        }

        if(this.transform !== Transformation.None){
            this.matrix = Mat2d.identity();
        }

        surface.requestRender();
    }

    onDrag(event: MouseOrTouchEvent, pointer: Point) {
        if(!this.matrix) { return; }

        let surface = event.target;
        let renderer = surface.renderer;
        let selection = renderer.selection;
        let matrix = this.matrix;

        switch(this.transform){
            case Transformation.Translate:
                let vector = Vec2.fromPointToPoint(this.previous, pointer);
                selection.offset(vector);
                matrix.postTranslate(vector);
                break;
            case Transformation.Scale:
                let scaleMatrix = Mat2d.scaleToPoint(this.previous, pointer, this.pivot);
                selection.scale(scaleMatrix);
                matrix.postConcat(scaleMatrix);
                break;
            case Transformation.Rotate:
                let rotationMatrix = Mat2d.stretchRotateToPoint(this.control.measureCenter(), pointer, this.pivot);
                selection.transform(rotationMatrix);
                matrix.postConcat(rotationMatrix);
                break;
        }

        surface.requestRender();
    }

    onEnd(event: MouseOrTouchEvent, pointer: Point) {
        let surface = event.target;
        let renderer = surface.renderer;
        let selection = renderer.selection;
        // Save transform 
        surface.recordTransformation(selection.target, this.matrix);
        this.matrix = null;
        // End transform if user tapped the selected shape
        if(this.reselected && this.dragCount <5 && selection.contains(pointer)){
            this.onDetach(surface);
        }
    }

    onDetach(surface: Surface){
        let renderer = surface.renderer;
        let selection = renderer.selection;
        // Remove selections
        let hover = renderer.hover;
        selection.setTarget(null);
        hover.setTarget(null);
        // Reset helper variables
        this.transform = Transformation.None;
        this.reselected = false;
        this.dragCount = 0;
        this.previous = null;
        this.control = null;
        this.pivot = null;
        this.matrix = null;
        surface.requestRender();
    }

    getTransformType(pointer: Point, selected?: Selection){
        let {pivot, control, frame} = selected;
        // Choose transformation based on position of pointer
         if(selected.target && selected.contains(pointer)) {
            if(pivot.contains(pointer)){
                // Pointer on pivot
                this.control = pivot;
                this.pivot = control.measureCenter();
                return Transformation.Rotate;
            } else if(control.contains(pointer)){
                // Pointer on control
                this.control = control;
                this.pivot = pivot.measureCenter();
                return Transformation.Rotate;
            } else if (frame.innerRect.contains(pointer)){
                // Pointer in frame
                this.pivot = null;
                return Transformation.Translate;
            } else {
                // Pointer on frame
                this.pivot = frame.getVertexOpposite(pointer);
                return Transformation.Scale;
            }
        }
        // Pointer outside frame
        return Transformation.None;
    }

}