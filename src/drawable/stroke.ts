import { Drawable } from './drawable';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { VertexBuffer } from 'gl2d/struct/vertex';
import { Renderer } from '../rendering/renderer';
import { Rect } from "gl2d/struct/rect";
import { Mat2d, IMat2d } from 'gl2d/struct/mat2d';
import { IPoint } from "gl2d/struct/point";
import { IVec2 } from "gl2d/struct/vec2";

export class Stroke implements Drawable {

    color: ColorFStruct;
    vertices: VertexBuffer;

    constructor(color: ColorFStruct, vertices: VertexBuffer){
        this.color = color;
        this.vertices = vertices;
    }

    measureBoundaries(): Rect {
        return this.vertices.measureBoundaries();
    }

    contains(pt: IPoint, inverse?: Mat2d): boolean {
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

    public offset(vec: IVec2): void {
        this.vertices.offset(vec);
    }

    public transform(matrix: IMat2d): void {
        this.vertices.transform(matrix);
    }

    draw(renderer: Renderer): void {
        let gl = renderer.gl;
        let program = renderer.strokeProgram;
        let vertices = this.vertices;
        renderer.useProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setColor(gl, this.color);
        program.setVertices(gl, vertices);
        program.draw(gl, vertices.position()); // Capacity ?
    }
}

