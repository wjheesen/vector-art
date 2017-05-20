import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { Status } from "gl2d/action/status";
import { Drawable } from "../drawable/drawable";
import { IPoint } from "gl2d/struct/point";
import { Vec2 } from "gl2d/struct/vec2";
import { Mat2d } from "gl2d/struct/mat2d";
import { Selection } from "../drawable/selection"

type Action = MouseOrTouchAction<Surface>;

const enum Transformation{
    None,
    Translate,
    Rotate,
    Scale
}

export class SelectTool extends MouseOrTouchTool<Surface> {

    control?: Drawable;
    previous?: IPoint;
    pivot? : IPoint;
    dragCount = 0;
    reselected = false;
    transform: Transformation;

    onAction(action: Action): void {
        let pointer = this.getPrimaryPointer(action);
        
        switch(action.status){
            case Status.Move:
                this.onMove(action, pointer);
                return;
            case Status.Start:
                this.dragCount = 0;
                this.onStart(action, pointer);
                break;
            case Status.Drag:
                this.dragCount++;
                this.onDrag(action, pointer);
                break;
            case Status.End:
                this.onEnd(action, pointer);
                break;
        }
        
        this.previous = pointer;
    }

    onMove(action: Action, pointer: IPoint){
        let surface = action.target;
        let renderer = surface.renderer;
        let selection = renderer.selection;
        let hovered = renderer.hover;

        // If the point is outside of the selection 
        if(!selection.contains(pointer)){
            // And if the hovered target is not the same as the previous
            if(!hovered.target || !hovered.target.contains(pointer)){
                // Search for newly hovered drawable and select it if it exists
                hovered.setTarget(renderer.getDrawableContaining(pointer));
                // Render to show changes
                surface.requestRender();
            }
        }
    }

    onStart(action: Action, pointer: IPoint) {
        let surface = action.target;
        let renderer = surface.renderer;
        let selected = renderer.selection;
        let hovered = renderer.hover;

        if(selected.contains(pointer)){
            // Reclicked a drawable that has already been selected
            this.reselected = true;
            this.transform = this.getTransformType(pointer, selected);
        } else if(hovered.contains(pointer)){
            // Selected a drawable that has already been indicated by the hover graphic
            selected.setTarget(hovered.target);
            hovered.setTarget(null);
            this.reselected = false;
            this.transform = this.getTransformType(pointer, selected);
        } else {
            // Selected a new drawable, or clicked on nothing
            selected.setTarget(renderer.getDrawableContaining(pointer));
            this.transform = selected.target ? Transformation.Translate : Transformation.None;
        }

        surface.requestRender();
    }

    getTransformType(pointer: IPoint, selected?: Selection){
        let {pivot, control, frame} = selected;
        // Choose transformation based on position of pointer
         if(selected.target && selected.contains(pointer)) {
            if(pivot.contains(pointer)){
                // Pointer on pivot
                this.control = pivot;
                this.pivot = control.measureCenterPointInWorldSpace();
                return Transformation.Rotate;
            } else if(control.contains(pointer)){
                // Pointer on control
                this.control = control;
                this.pivot = pivot.measureCenterPointInWorldSpace();
                return Transformation.Rotate;
            } else if (frame.innerRect.containsPoint(pointer)){
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

    onDrag(action: Action, pointer: IPoint) {
        let surface = action.target;
        let renderer = surface.renderer;
        let selection = renderer.selection;

        switch(this.transform){
                case Transformation.Translate:
                    selection.offset(Vec2.fromPointToPoint(this.previous, pointer));
                    break;
                case Transformation.Scale:
                    selection.scale(Mat2d.scaleToPoint(this.previous, pointer, this.pivot));
                    break;
                case Transformation.Rotate:
                    selection.transform(Mat2d.stretchRotateToPoint(this.control.measureCenterPointInWorldSpace(), pointer, this.pivot));
                    break;
                case Transformation.None:
                    return; // Skip render
        }

        surface.requestRender();
    }

    onEnd(action: Action, pointer: IPoint) {
        let surface = action.target;
        let renderer = surface.renderer;
        let selection = renderer.selection;
        // End transform if user tapped the selected shape
        if(this.reselected && this.dragCount <5 && selection.contains(pointer)){
            this.onDetach(surface);
        }
    }

    onDetach(surface: Surface){
        let renderer = surface.renderer;
        renderer.selection.setTarget(null);
        renderer.hover.setTarget(null);
        this.transform = Transformation.None;
        this.reselected = false;
        this.dragCount = 0;
        this.previous = null;
        this.control = null;
        this.pivot = null;
        surface.requestRender();
    }
}