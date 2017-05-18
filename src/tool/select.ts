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
    moveCount = 0;
    reclicked = false;
    transform: Transformation;

    onAction(action: Action): void {
        let pointer = this.getPrimaryPointer(action);
        switch(action.status){
            case Status.Start:
                this.moveCount = 0;
                this.onStart(action, pointer);
                break;
            case Status.Move:
                this.moveCount++;
                this.onMove(action, pointer);
                break;
            case Status.End:
                this.onEnd(action, pointer);
                break;
        }
        action.target.requestRender();
        this.previousPoint = pointer;
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
                renderer.points.length = 0;
                renderer.plotPoint(this.pivot);
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

    onMove(action: Action, pointer: IPoint) {
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
        if(this.moveCount < 3 && this.reclicked){
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