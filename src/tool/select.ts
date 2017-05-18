import { Surface } from '../surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { Status } from "gl2d/action/status";
import { Drawable } from "src/drawable/drawable";
import { IPoint } from "gl2d/struct/point";
import { Vec2 } from "gl2d/struct/vec2";
import { Mat2d } from "gl2d/struct/mat2d";

type Action = MouseOrTouchAction<Surface>;

const enum Transformation{
    Translate,
    Rotate,
    Scale
}

export class SelectTool extends MouseOrTouchTool<Surface> {

    selection?: Drawable;
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
         if(!this.selection){
             // Search for drawable under cursor
            let drawable = renderer.getDrawableContaining(pointer);
            if(drawable){
                // Indicate that drawable is under the cursor, but do not select it
                let bounds = drawable.measureBoundaries();
                frame.innerRect.set(bounds);
                frame.color.a = 0.3;
                surface.requestRender();
            } else if(!frame.innerRect.isEmpty()) {
                // Indicate that drawable is no longer under the cursor
                this.onDetach(surface);
            }
         }
    }

    onStart(action: Action, pointer: IPoint) {
        let surface = action.target;
        let renderer = surface.renderer;
        let frame = renderer.frame;

        if(this.selection){
            this.reclicked = true;
            if(frame.innerRect.containsPoint(pointer)){
            this.transform = Transformation.Translate;
            } else if(frame.measureBoundaries().containsPoint(pointer)){
                this.transform = Transformation.Scale;
                this.pivot = frame.getVertexOpposite(pointer);
            } else {
                this.transform = Transformation.Rotate;
            }
        } else {
            let drawable = renderer.getDrawableContaining(pointer);
            if(drawable){
                let bounds = drawable.measureBoundaries();
                frame.innerRect.set(bounds);
                frame.color.a = 0.9;
                this.selection = drawable;
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
                    frame.innerRect.set(this.selection.measureBoundaries());
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
        this.previousPoint = null;
        surface.renderer.frame.innerRect.setScalar(0);
        surface.requestRender();
    }
}