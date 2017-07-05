import { Drawable } from './drawable';
import { Shape } from './shape';
import { Ellipse } from './ellipse';
import { Renderer } from "../rendering/renderer";
import { Vec2Like } from "gl2d/struct/vec2";
import { Mat2d } from 'gl2d/struct/mat2d';
import { Point, PointLike } from "gl2d/struct/point";
import { Rect } from "gl2d/struct/rect";

export class Selection {

    target: Drawable;
    bounds = new Rect();

    constructor(
        public frame: Shape,
        public pivot?: Ellipse, 
        public control?: Ellipse
    ){}

    setTarget(target?: Drawable){
        let { bounds, frame, pivot, control } = this;
        this.target = target;
        if(target){
            bounds.set(target.measureBoundaries());
            frame.mapToRect(bounds);
            if(pivot && control){
                pivot.offsetTo(this.measurePivot());
                control.offsetTo(this.measureControl());
            }
        } else {
            bounds.setScalar(0);
        }
    }

    measureVertexOpposite(point: PointLike){
        let frame = this.bounds;
        let x: number, y: number;
        // If the point is to the left of the frame center
        if(point.x < frame.centerX()){
            // Then the opposite point is to the right of the frame center
            x = frame.right;
        } else {
            // Otherwise the opposite point is to the left of the frame center
            x = frame.left;
        }
        // Similarly, if the point is below the frame center
        if(point.y < frame.centerY()){
            // Then the opposite point is above the frame center
            y = frame.top;
        } else {
            // Then the opposite point is below the frame center
            y = frame.bottom;
        }
        return new Point(x,y);
    }

    private measurePivot(){
        let {target, bounds } = this;
        if(target instanceof Shape){
            return target.measurePivot();
        } else {
            return bounds.centerTop();
        }
    }

    private measureControl(){
        let {target, bounds } = this;
        if(target instanceof Shape){
            return target.measureControl();
        } else {
            return bounds.centerBottom();
        }
    }
    
    contains(point: PointLike){
        let { bounds, frame } = this;
        let { lineWidth } = frame;
        let result: boolean;
        bounds.inset$(-lineWidth, -lineWidth);
        result = bounds.contains(point);
        bounds.inset$(lineWidth, lineWidth);
        return result;
    }

    offset(vec: Vec2Like){
        let { target, bounds, frame, pivot, control } = this;
        target.offset(vec);
        bounds.offset(vec);
        frame.offset(vec);
        if(pivot && control){
            pivot.offset(vec);
            control.offset(vec);
        }
    }

    scale(scale: Mat2d){
        let { target, bounds, frame, pivot, control } = this;
        scale.mapRect(bounds, bounds);
        target.transform(scale);
        frame.transform(scale);
        if(pivot && control){
            pivot.offsetTo(this.measurePivot());
            control.offsetTo(this.measureControl());
        }
    }

    transform(matrix: Mat2d){
        let { target, bounds, frame, pivot, control } = this;
        // Transform target and frame
        target.transform(matrix);
        bounds.set(target.measureBoundaries());
        frame.mapToRect(bounds);
        // Transform pivot and control point
        if(pivot && control){
            for(let circle of [pivot,control]){
                let center = circle.measureCenter();
                matrix.map(center, center);
                circle.offsetTo(center);
            }
        }
    }


    draw(renderer: Renderer){
        let {bounds, frame, pivot, control, target } = this;
        if(!bounds.isEmpty()){
            frame.draw(renderer);
            if(pivot && control){
                pivot.draw(renderer);
                control.draw(renderer);
            } else {
                 target.draw(renderer); // Draw twice so target is shown on top and highlighted if transparent
            }
        }
    }
}
