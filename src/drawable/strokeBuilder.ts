import { Stroke } from './stroke';
import { VertexBuffer } from 'gl2d/struct/vertex';
import { ColorFStruct } from "gl2d/struct/colorf";
import { IPoint, Point } from "gl2d/struct/point";
import { IVec2, Vec2 } from "gl2d/struct/vec2";
export class StrokeBuilder {

    vertices: VertexBuffer;

    constructor(maxVertices = 12500){ // 100kb
        this.vertices = VertexBuffer.create(maxVertices);
    }

    /**
     * Begins a stroke at the specified point.
     * @param color the color of the stroke.
     * @param point where to begin the stroke.
     * @param halfThickness the thickness of the line.
     */
    begin(color: ColorFStruct, point: IPoint, thickness: number) {
        let vertices = this.vertices;
        let halfThickness = 0.5 * thickness;
        let stroke = new Stroke(color, vertices);
        let {x, y} = point;
        vertices.moveToFirst();
        vertices.$set$(x, y + halfThickness);
        vertices.moveToNext();
        vertices.$set$(x, y - halfThickness);
        vertices.moveToNext();
        return stroke;
    }

    /**
     * Adds a line to the specified stroke.
     * @param stroke the stroke to which the line should be added.
     * @param point the point marking the end of the line.
     * @param thickness the thickness of the line.
     */
    add(stroke: Stroke, point: IPoint, thickness: number){

        let vertices = stroke.vertices;
        let position = vertices.position();
        let halfThickness = 0.5 * thickness
        let halfThickness2 = halfThickness * halfThickness;

        // Assume the stroke already has at least one line
        // TODO: throw error if not
        let prevTop = <Vec2> vertices.get(position - 2);
        let prevBot = <Vec2> vertices.get(position - 1);
        let prevCen = Point.midpoint(prevTop, prevBot);
        let line = Vec2.fromPointToPoint(prevCen, point);
        let prevLine: Vec2;

        // If previous line exists
        if(position >= 4){

            // Compute previous line
            let prevPrevTop = <Vec2> vertices.get(position - 4);
            let prevPrevBot = <Vec2> vertices.get(position - 3);
            let prevPrevCen = Point.midpoint(prevPrevTop, prevPrevBot);
            prevLine = Vec2.fromPointToPoint(prevPrevCen, prevCen);

            // If lines are too short
            if(line.length2() < halfThickness2 && prevLine.length2() < halfThickness2){

                // Merge them into a single line
                position -= 2;
                prevTop = prevPrevTop;
                prevBot = prevPrevBot;
                prevCen = prevPrevCen;
                line = Vec2.fromPointToPoint(prevCen, point);
                prevLine = null;

                // Compute the (new) previous line if it exists
                if(position >= 4){
                    prevPrevTop = <Vec2> vertices.get(position - 4);
                    prevPrevBot = <Vec2> vertices.get(position - 3);
                    prevPrevCen = Point.midpoint(prevPrevTop, prevPrevBot);
                    prevLine = Vec2.fromPointToPoint(prevPrevCen, prevCen);
                }
            }
        } 
        
        // Compute the ortho vector needed to compute the top and bottom right vertices of the line segment.
        let ortho = Vec2.create(line);
        ortho.normalize();
        ortho.rotateLeft();
        ortho.mulScalar(halfThickness);

        // If there are more than two line segments, use a miter vector join them. 
        // Otherwise use the ortho vector to compute the top and bottom left vertices of the line segment.
        let miter = prevLine ? miterVector(prevLine, line, halfThickness, halfThickness*3) : ortho;

        // Update vertices
        vertices.moveToPosition(position - 2);

        // Top left:
        vertices.$set(prevCen);
        vertices.$add(miter);
        vertices.moveToNext();

        // Bottom left:
        vertices.$set(prevCen);
        vertices.$subtract(miter);
        vertices.moveToNext();

        // Top right:
        vertices.$set(point);
        vertices.$add(ortho);
        vertices.moveToNext();

        // Bottom right:
        vertices.$set(point);
        vertices.$subtract(ortho);
        vertices.moveToNext();
    }

    end(stroke: Stroke){
        let buffer = stroke.vertices;
        let size = buffer.position();
        if(size > 3){
            buffer.moveToFirst();
            stroke.vertices = VertexBuffer.create(size);
            stroke.vertices.putBuffer(buffer, size);
            return stroke;
        }
        return null;
    }

}

/**
 * Measures the miter vector for the joining of two lines.
 * @param line1 the vector from the start of the previous line to the end of the previous line.
 * @param line2 the vector from the start of the previous line to the end of the previous line.
 * @param halfThickness half the thickness of the second line.
 * @param miterLimit the maximum allowable miter length before a bevel is applied.
 * @returns the miter vector.
 */
function miterVector(prevLine: IVec2, line: IVec2, halfThickness: number, miterLimit: number) {

    // Measure the ortho norm of the previous vector and the next vector.
    let n1 = Vec2.create(prevLine);
    n1.normalize();
    n1.rotateLeft();
    
    let n2 = Vec2.create(line);
    n2.normalize();
    n2.rotateLeft();

    // Average the ortho norms to get the miter vector.
    let miter = Vec2.create(n1);
    miter.add(n2);
    miter.normalize(); 

    // Measure the length of the miter by projecting it onto one of the ortho norms and inverting it.
    let length = halfThickness / miter.dot(n2);

    // Scale vector to the measured length, ensuring it does not exceed the bevel
    miter.mulScalar(Math.min(miterLimit, length));

    return miter;
}
