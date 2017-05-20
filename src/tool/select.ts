import { Ellipse } from 'gl2d/struct/ellipse';
import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { Status } from "gl2d/action/status";
import { Drawable } from "src/drawable/drawable";
import { IPoint } from "gl2d/struct/point";
import { Vec2 } from "gl2d/struct/vec2";
import { Mat2d } from "gl2d/struct/mat2d";

type Action = MouseOrTouchAction<Surface>;

const enum Transformation{
    None,
    Translate,
    Rotate,
    Scale
}

export class SelectTool extends MouseOrTouchTool<Surface> {

    selection?: Drawable;
    hovered?: Drawable;
    previousPoint?: IPoint;
    pivot? : IPoint;
    dragCount = 0;
    reclicked = false;
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
        action.target.requestRender();
        this.previousPoint = pointer;
    }

    onMove(action: Action, pointer: IPoint){
        let surface = action.target;
        let renderer = surface.renderer;
        let frame = renderer.frame;
        let hoverFrame = renderer.hoverFrame;

        // If nothing is selected or the cursor is outside of the frame
        if(!this.selection || !frame.measureBoundaries().containsPoint(pointer)){
            // And if the current hovered drawable is not the same as the previous
            if(!this.hovered || !this.hovered.contains(pointer)){
                // Search for newly hovered drawable
                this.hovered = renderer.getDrawableContaining(pointer);
                if(this.hovered){
                    // Indicate that drawable is being hovered, but do not select it
                    hoverFrame.innerRect.set(this.hovered.measureBoundaries());
                } else if(!frame.innerRect.isEmpty()) {
                    // Indicate that drawable is no longer being hovered
                    hoverFrame.innerRect.setScalar(0);
                }
                // Render to show changes to hover frame
                surface.requestRender();
            }
        }
    }

    onStart(action: Action, pointer: IPoint) {
        let surface = action.target;
        let renderer = surface.renderer;
        let frame = renderer.frame;
        let hoverFrame = renderer.hoverFrame;

        // If something is already selected
        if(this.selection){
            // Set transformation based on position of pointer relative to selection
            this.reclicked = true;
            if (frame.innerRect.containsPoint(pointer)){
                // Point in frame
                this.transform = Transformation.Translate;
            } else if(frame.measureBoundaries().containsPoint(pointer)){
                // Point on frame
                this.transform = Transformation.Scale;
                this.pivot = frame.getVertexOpposite(pointer);
            } else {
                // Point outside frame
                let bounds = frame.measureBoundaries();
                bounds.stretch(Math.SQRT2);
                let ellipse = Ellipse.fromRect(bounds);
                if(ellipse.contains(pointer)){
                    // Point in ellipse surrounding frame
                    this.transform = Transformation.Rotate;
                } else {
                    // Point too far away for transform
                    this.transform = Transformation.None;
                }
            }
        } 

        // If nothing is selected, or point too far away for transform 
        if(!this.selection || this.transform === Transformation.None) {
            // Select the first drawable that contains the point (if any)
            let drawable = renderer.getDrawableContaining(pointer);
            if(drawable){
                let bounds = drawable.measureBoundaries();
                frame.innerRect.set(bounds);
                hoverFrame.innerRect.setScalar(0);
                this.selection = drawable;
                this.hovered = drawable;
                this.transform = Transformation.Translate;
            }
        }
    }

    onDrag(action: Action, pointer: IPoint) {
        let surface = action.target;
        let renderer = surface.renderer;
        let frame = renderer.frame;

        if(this.selection && this.previousPoint){
            switch(this.transform){
                case Transformation.Translate:
                    let vector = Vec2.fromPointToPoint(this.previousPoint, pointer);
                    this.selection.offset(vector);
                    frame.innerRect.offset(vector);
                    break;
                case Transformation.Scale:
                    let scale = Mat2d.scaleToPoint(this.previousPoint, pointer, this.pivot);
                    this.selection.transform(scale);
                    scale.mapRect(frame.innerRect, frame.innerRect);
                    break;
                case Transformation.Rotate:
                    let rotation = Mat2d.rotateToPoint(this.previousPoint, pointer, frame.innerRect.center());
                    this.selection.transform(rotation);
                    let bounds = this.selection.measureBoundaries();
                    frame.innerRect.set(bounds);
                    break;
            }
        }
    }

    onEnd(action: Action, pointer: IPoint) {
        if(this.dragCount <3 && this.reclicked){
            let surface = action.target;
            let renderer = surface.renderer;
            let frame = renderer.frame;
            let drawable = renderer.getDrawableContaining(pointer);
            if(drawable && drawable !== this.selection){
                this.selection = drawable;
                let bounds = drawable.measureBoundaries();
                frame.innerRect.set(bounds);
                frame.color.a = 0.9;
            } else {
                this.onDetach(surface);
            }
        }
    }

    onDetach(surface: Surface){
        this.reclicked = false;
        this.selection = null;
        this.hovered = null;
        this.previousPoint = null;
        surface.renderer.frame.innerRect.setScalar(0);
        surface.requestRender();
    }
}