import { Shape } from './shape';
import { Point } from "gl2d/struct/point";
import { Mat2d } from "gl2d/struct/mat2d";

export class Line extends Shape {

    setFromPointToPoint(p1: Point, p2: Point, thickness: number){
        // Assume mesh is the square {left: 0, right: 1, bottom: 0, top: 1}
        // Translate square to {left: 0, right: 1, bottom: -0.5, top: 0.5}
        this.matrix.setTranslate$(0, -0.5);
        // Scale the square to a rectangle with width = dist(p1,p2), and height = thickness
        let width = p1.distance(p2);
        let height = thickness;
        this.matrix.postScale(width, height);
        // Rotate the rectangle by the angle formed by p2, p1, and (x1+e, y1) for any e>0-->
        let hypotenuse = width;
        let adjacent = p2.x - p1.x;
        let opposite = p2.y - p1.y;
        let sin = opposite / hypotenuse;
        let cos = adjacent / hypotenuse;
        this.matrix.postConcat(Mat2d.sinCos(sin, cos));
        // Translate rectangle to p1
        this.matrix.postTranslate(p1);
    }

    measureControl(){
        return this.convertPointToWorldSpace(this.mesh.bounds.centerLeft())
    }

    measurePivot(){
        return this.convertPointToWorldSpace(this.mesh.bounds.centerRight())
    }
}