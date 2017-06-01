import { Shape } from './shape';
import { Renderer } from '../rendering/renderer';
import { Drawable } from './drawable';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { IMat2d, Mat2d, Mat2dBuffer, ScaleToFit } from 'gl2d/struct/mat2d';
import { IPoint } from "gl2d/struct/point";
import { Rect } from "gl2d/struct/rect";
import { IVec2 } from "gl2d/struct/vec2";
import { Mesh } from "gl2d/drawable/mesh";
import { Point } from "gl2d/struct/point";

export class ShapeBatch implements Drawable {

    mesh: Mesh;

    color: ColorFStruct; // TODO change to set color?

    matrices: Mat2dBuffer;

    constructor(mesh: Mesh, color: ColorFStruct, matrices: Mat2dBuffer){
        this.mesh = mesh;
        this.color = color;
        this.matrices = matrices;
    }

    add(center: IPoint, radius: number){
        let src = this.mesh.bounds;
        let dst = Rect.unionOfPoints([center]);
        dst.inset$(-radius, -radius);
        this.matrices.$setRectToRect(src, dst, ScaleToFit.Center);
        this.matrices.moveToNext();
    }

    addAcrossLine(p1: IPoint, p2: IPoint){
        Shape.stretchAcrossLine(this.matrices, this.mesh, p1, p2);
        this.matrices.moveToNext();
    }

    measureBoundaries(): Rect {
        let bounds = <Rect> null;
        let matrices = this.matrices;
        let vertices = this.mesh.vertices;

        if(matrices.moveToFirst() && vertices.moveToFirst()){
            // Enclose the first shape
            bounds = Shape.measureBoundaries(matrices, vertices);
            // Enclose the remaining shapes
            while(matrices.moveToNext()){
                bounds.union(Shape.measureBoundaries(matrices, vertices));
            }
        }
        
        // Bounds will be null if batch is empty
        return bounds;
    }

    offset(vec: IVec2): void {
        let matrices = this.matrices;
        matrices.moveToPosition(-1);
        while(matrices.moveToNext()){
            matrices.$postTranslate(vec);
        }
    }

    transform(matrix: IMat2d): void {
        let matrices = this.matrices;
        matrices.moveToPosition(-1);
        while(matrices.moveToNext()){
            matrices.$postConcat(matrix);
        }
    }

    /**
     * Returns true if any shape in this batch contains the specified point.
     */
    contains(pt: IPoint): boolean {
        let matrices = this.matrices;
        let vertices = this.mesh.vertices;
        let inverse = new Mat2d();
        let modelPt = new Point();
        matrices.moveToPosition(-1);
        while(matrices.moveToNext()){
            inverse.setInverse(matrices);
            inverse.map(pt, modelPt);
            if(vertices.contains(modelPt)){
                return matrices.moveToLast(); 
            }
        }
        return false;
    }

    draw(renderer: Renderer){
        let gl = renderer.gl;
        let program = renderer.shapeProgram;
        let matrices = this.matrices;
        let instanceCount = matrices.position();
        renderer.attachProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setMesh(gl, this.mesh)
        program.setMatrices(gl, matrices);
        program.setColor(gl, this.color);
        program.draw(renderer, instanceCount);
    }
    
}

