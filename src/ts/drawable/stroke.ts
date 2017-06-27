import { Renderer } from '../rendering/renderer';
import { Surface } from '../rendering/surface';
import { Drawable } from './drawable';
import { Shape } from './shape';
import { Mat2dStruct } from 'gl2d';
import { Graphic } from 'gl2d/drawable/graphic';
import { ColorStruct } from 'gl2d/struct/color';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2d } from 'gl2d/struct/mat2d';
import { Point, PointLike } from 'gl2d/struct/point';
import { Rect } from 'gl2d/struct/rect';
import { Vec2 } from 'gl2d/struct/vec2';
import { VertexBuffer } from 'gl2d/struct/vertex';
import { measureMiter } from 'gl2d/math/miter';

export class Stroke extends Graphic implements Drawable {

    id: number;
    zIndex: number;
    color: ColorFStruct;
    vertices: VertexBuffer;

    constructor(color: ColorFStruct, vertices: VertexBuffer, matrix?: Mat2dStruct, zIndex?: number, id?: number){
        super(matrix);
        this.color = color;
        this.vertices = vertices;
        this.zIndex = zIndex;
        this.id = id;
    }

    measureBoundaries(dst = new Rect()): Rect {
        let { matrix, vertices } = this;
        return Shape.measureBoundaries(matrix,vertices);
    }

    contains(pt: PointLike, inverse?: Mat2d): boolean {
        let vertices = this.vertices;
        let modelPt =  this.convertPointToModelSpace(pt, inverse);
        let count = vertices.capacity();
        // If the stroke has at least one segment
        if (count > 3) {
            // Return true if any of the segments inside this stroke contain the point
            for (let i = 3; i < count; i += 2) {
                if(vertices.indexedContains(modelPt, [i-3, i-2, i, i-1])){
                    return true;
                }
            }
        }
        //This stroke does not contain the point.
        return false;
    }

    /**
     * Begins this stroke at the specified point.
     * @param point where to begin the stroke.
     * @param lineWidth the width of the initial line.
     */
    moveTo(point: PointLike, lineWidth: number) {
        let { x, y } = point;
        let vertices = this.vertices;
        let halfThickness = 0.5 * lineWidth;
        if(vertices.moveToFirst()){
            vertices.rset$(x, y + halfThickness);
            vertices.rset$(x, y - halfThickness);
        }
    }

   /**
     * Adds a line to the specified point.
     * @param point the point at the end of the line.
     * @param lineWidth the width of the line.
     */
    lineTo(point: PointLike, lineWidth: number){

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
        ortho.rotateRight();
        ortho.mulScalar(halfThickness);

        // If there are more than two line segments (with non-zero length), use a miter vector join them. 
        // Otherwise use the ortho vector to compute the top and bottom left vertices of the line segment.
        if(prevLine && !prevLine.epsilonEqualsScalar(0, halfThickness/8)){
            miter =  measureMiter(prevLine, line, halfThickness, halfThickness*3);
        } else {
            miter = ortho;
        }

        // Join to previous line
        vertices.moveToPosition(position - 2);

        // Update previous top
        vertices.set(prevCen);
        vertices.add(miter);
        vertices.moveToNext();

        // Update previous bottom
        vertices.set(prevCen);
        vertices.subtract(miter);
        vertices.moveToNext();

        // Add new top
        vertices.set(point);
        vertices.add(ortho);
        vertices.moveToNext();

        // Add new bottom
        vertices.set(point);
        vertices.subtract(ortho);
        vertices.moveToNext();
    }

    /**
     * Adds a line to the first point in this stroke.
     * @param lineWidth the width of the point.
     */
    close(lineWidth: number){
        
        let vertices = this.vertices;
        let position = vertices.position();
        let miter: Vec2;

        // Must have at least 6 vertices (2 line segments) to close the path
        if(position < 6 ) { return; }

        // Measure the previous line
        vertices.moveToPosition(position-4);
        let prevPrevPoint = Point.midpoint(vertices.rget(), vertices.rget()); 
        let prevPoint = Point.midpoint(vertices.rget(), vertices.rget()); 
        let prevLine = Vec2.fromPointToPoint(prevPrevPoint, prevPoint);

        // Measure the current line (previous point to first)
        vertices.moveToFirst();
        let currPoint = Point.midpoint(vertices.rget(), vertices.rget()); 
        let currLine = Vec2.fromPointToPoint(prevPoint, currPoint);

        // Measure the next line (first point to second)
        let nextPoint = Point.midpoint(vertices.rget(), vertices.rget()); 
        let nextLine = Vec2.fromPointToPoint(currPoint, nextPoint);

        // Join the previous line to the current line
        miter = measureMiter(prevLine, currLine, 0.5 * lineWidth, 1.5 * lineWidth);

        vertices.moveToPosition(position-2);

        vertices.set(prevPoint);
        vertices.add(miter);
        vertices.moveToNext();

        vertices.set(prevPoint);
        vertices.subtract(miter);
        vertices.moveToNext();

        // Join the current line to the next line
        miter = measureMiter(currLine, nextLine, 0.5 * lineWidth, 1.5 * lineWidth);

        let top = Point.create(currPoint);
        top.add(miter);

        let bot = Point.create(currPoint);
        bot.subtract(miter);

        vertices.rset(top);
        vertices.rset(bot);

        vertices.aset(0, top);
        vertices.aset(1, bot);
    }

    draw(renderer: Renderer): void {
        let { color, vertices, matrix } = this;
        let { gl, ext, shapeProgram: program } = renderer;
        let count = vertices.capacity();
        renderer.attachProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setColor(gl, color);
        program.setVertices(gl, vertices);
        program.setMatrices(gl, matrix);
        ext.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, count, 1);
    }
    
   save(surface: Surface){
        let { database, canvasId, zIndex } = surface;
        this.zIndex = zIndex;
        let color = ColorStruct.fromColorF(this.color).data.buffer;
        let vertices = this.vertices.data.buffer;
        let matrix = this.matrix.data.buffer;

        database.strokes.add({
            zIndex: zIndex,
            canvasId: canvasId.val,
            color: color,
            vertices: vertices,
            matrix: matrix
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
            matrix: this.matrix.data.buffer
        });
    }
}
