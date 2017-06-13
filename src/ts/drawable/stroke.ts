import { Renderer } from '../rendering/renderer';
import { Surface } from '../rendering/surface';
import { Drawable } from './drawable';
import { ColorStruct } from 'gl2d/struct/color';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2d } from 'gl2d/struct/mat2d';
import { PointLike, Point } from 'gl2d/struct/point';
import { Rect } from 'gl2d/struct/rect';
import { Vec2Like, Vec2 } from 'gl2d/struct/vec2';
import { VertexBuffer } from 'gl2d/struct/vertex';

export class Stroke implements Drawable {

    id: number;
    zIndex: number;
    color: ColorFStruct;
    vertices: VertexBuffer;

    constructor(color: ColorFStruct, vertices: VertexBuffer, zIndex?: number, id?: number){
        this.color = color;
        this.vertices = vertices;
        this.zIndex = zIndex;
        this.id = id;
    }

    measureBoundaries(): Rect {
        return this.vertices.measureBoundaries();
    }

    contains(pt: PointLike, inverse?: Mat2d): boolean {
        let vertices = this.vertices;
        let count = vertices.capacity();
        // If the stroke has at least one segment
        if (count > 3) {
            // Return true if any of the segments inside this stroke contain the point
            for (let i = 3; i < count; i += 2) {
                let segment = vertices.measureBoundaries(i - 3, 4);
                if (segment.contains(pt)){ 
                    return true; 
                } 
            }
        }
        //This stroke does not contain the point.
        return false;
    }

    offset(vec: Vec2Like): void {
        this.vertices.offset(vec);
    }

    transform(matrix: Mat2d): void {
        this.vertices.transform(matrix);
    }

    /**
     * Begins this stroke at the specified point.
     * @param point where to begin the stroke.
     * @param lineWidth the width of the initial line.
     */
    begin(point: PointLike, lineWidth: number) {
        let { x, y } = point;
        let vertices = this.vertices;
        let halfThickness = 0.5 * lineWidth;
        if(vertices.moveToFirst()){
            vertices.rset$(x, y + halfThickness);
            vertices.rset$(x, y - halfThickness);
        }
    }

   /**
     * Adds a line to this stroke.
     * @param point the point at the end of the line.
     * @param lineWidth the width of the line.
     */
    add(point: PointLike, lineWidth: number){

        let vertices = this.vertices;
        let position = vertices.position();
        let halfThickness = 0.5 * lineWidth
        let halfThickness2 = halfThickness * halfThickness;

        // Assume the stroke already has at least one line
        // TODO: throw error if not
        let prevTop = <Vec2> vertices.aget(position - 2);
        let prevBot = <Vec2> vertices.aget(position - 1);
        let prevCen = Point.midpoint(prevTop, prevBot);
        let line = Vec2.fromPointToPoint(prevCen, point);
        let prevLine: Vec2;
        let miter: Vec2;
        let ortho: Vec2;

        // If previous line exists
        if(position >= 4){

            // Compute previous line
            let prevPrevTop = <Vec2> vertices.aget(position - 4);
            let prevPrevBot = <Vec2> vertices.aget(position - 3);
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

                // Compute the (previous) previous line if it exists
                if(position >= 4){
                    prevPrevTop = <Vec2> vertices.aget(position - 4);
                    prevPrevBot = <Vec2> vertices.aget(position - 3);
                    prevPrevCen = Point.midpoint(prevPrevTop, prevPrevBot);
                    prevLine = Vec2.fromPointToPoint(prevPrevCen, prevCen);
                }
            }
        } 
        
        // Compute the ortho vector needed to compute the top and bottom right vertices of the line segment.
        ortho = Vec2.create(line);
        ortho.normalize();
        ortho.rotateLeft();
        ortho.mulScalar(halfThickness);

        // If there are more than two line segments (with non-zero length), use a miter vector join them. 
        // Otherwise use the ortho vector to compute the top and bottom left vertices of the line segment.
        if(prevLine && !prevLine.epsilonEqualsScalar(0, halfThickness/8)){
            miter =  miterVector(prevLine, line, halfThickness, halfThickness*3);
        } else {
            miter = ortho;
        }

        // Update vertices
        vertices.moveToPosition(position - 2);

        // Top left:
        vertices.set(prevCen);
        vertices.add(miter);
        vertices.moveToNext();

        // Bottom left:
        vertices.set(prevCen);
        vertices.subtract(miter);
        vertices.moveToNext();

        // Top right:
        vertices.set(point);
        vertices.add(ortho);
        vertices.moveToNext();

        // Bottom right:
        vertices.set(point);
        vertices.subtract(ortho);
        vertices.moveToNext();
    }

    draw(renderer: Renderer): void {
        let gl = renderer.gl;
        let program = renderer.strokeProgram;
        let vertices = this.vertices;
        renderer.attachProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setColor(gl, this.color);
        program.setVertices(gl, vertices);
        program.draw(gl, vertices.position()); 
    }
    
   save(surface: Surface){
        let { database, canvasId, zIndex } = surface;
        this.zIndex = zIndex;
        let color = ColorStruct.fromColorF(this.color).data.buffer;
        let vertices = this.vertices.data.buffer;

        database.strokes.add({
            zIndex: zIndex,
            canvasId: canvasId,
            color: color,
            vertices: vertices
        }).then(id => this.id = id);
    }

    delete(surface: Surface): void {
        surface.database.strokes.delete(this.id);
    }

    updateColor(surface: Surface, color: ColorStruct): void {
        this.color.setFromColor(color);
        surface.database.strokes.update(this.id, {
            color: color.data.buffer
        })
    }
    
    updateZIndex(surface: Surface, zIndex: number): void {
        this.zIndex = zIndex;
        surface.database.strokes.update(this.id, {
            zIndex: zIndex
        })
    }

    updatePosition(surface: Surface){
        surface.database.strokes.update(this.id, {
            vertices: this.vertices.data.buffer
        });
    }
}

/**
 * Measures the miter vector for the joining of two lines.
 * @param prevLine the nonzero vector from the start of the previous line to the end of the previous line.
 * @param line the nonzero vector from the start of the previous line to the end of the previous line.
 * @param halfThickness half the thickness of the second line.
 * @param miterLimit the maximum allowable miter length before a bevel is applied.
 * @returns the miter vector.
 */
function miterVector(prevLine: Vec2Like, line: Vec2Like, halfThickness: number, miterLimit: number) {

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

    // Ensure length does not exceed miter limit
    if(length > miterLimit){
        length = miterLimit;
    }

    // Scale vector to the measured length
    miter.mulScalar(length);

    return miter;
}
