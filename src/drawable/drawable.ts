import { Drawable as Base } from 'gl2d/drawable/drawable'
import { Renderer } from '../rendering/renderer'
import { IPoint, Point } from "gl2d/struct/point";
import { Vec2 } from "gl2d/struct/vec2";

export abstract class Drawable extends Base<Renderer>{

    /**
     * Converts a point in this drawable's model space to a point in world space.
     * @param pointInModel the point in model space.
     * @param dst where to store the result.
     * @returns dst.
     */
    convertPointToWorldSpace(pointInModel: IPoint, dst: IPoint = new Point()){
        this.matrix.map(pointInModel, dst);
        return dst;
    }

    /**
     * Measures the position of this drawable's center point in world space.
     * @returns the position of the center point in world space.
     */
    measureCenterPointInWorldSpace(){
        return this.convertPointToWorldSpace(this.mesh.bounds.center());
    }

    /**
     * Measures the position of this drawable's fixed point in world space.
     * @returns the position of the fixed point in world space.
     */
    measurePivotPointInWorldSpace(){
        return this.convertPointToWorldSpace(this.mesh.bounds.centerTop());
    }

    /**
     * Measures the position of this drawable's control point in world space.
     * @returns the position of the control point in world space.
     */
    measureControlPointInWorldSpace(){
        return this.convertPointToWorldSpace(this.mesh.bounds.centerBottom());
    }

    /**
     * Offsets this drawable so that it is centered at the specified point.
     * @param center the new center point for this drawable.
     */
    offsetTo(center: IPoint){
        this.offset(Vec2.fromPointToPoint(this.measureCenterPointInWorldSpace(), center));
    }
}
