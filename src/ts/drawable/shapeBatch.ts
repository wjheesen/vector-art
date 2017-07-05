import { Mesh } from 'gl2d/drawable/mesh';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2d, Mat2dBuffer, ScaleToFit } from 'gl2d/struct/mat2d';
import { PointLike } from 'gl2d/struct/point';
import { Point } from 'gl2d/struct/point';
import { Rect } from 'gl2d/struct/rect';
import { Vec2, Vec2Like } from 'gl2d/struct/vec2';

import { compressColorF } from '../database/compression';
import { Database } from '../database/database';
import { Renderer } from '../rendering/renderer';
import { Drawable } from './drawable';
import { Shape } from './shape';

export interface ShapeBatchOptions {
    mesh: Mesh;
    fillColor: ColorFStruct;
    matrices?: Mat2dBuffer;
    zIndex?: number;
    id?: number;
}

export class ShapeBatch implements Drawable {

    mesh: Mesh;
    fillColor: ColorFStruct; 
    matrices: Mat2dBuffer;
    zIndex: number;
    id: number;

    constructor(options: ShapeBatchOptions){
        this.mesh = options.mesh;
        this.fillColor = options.fillColor;
        this.matrices = options.matrices;
        this.zIndex = options.zIndex;
        this.id = options.id;
    }

    add(center: PointLike, radius: number){
        let src = this.mesh.bounds;
        let dst = Rect.unionOfPoints([center]);
        dst.inset$(-radius, -radius);
        this.matrices.setRectToRect(src, dst, ScaleToFit.Center);
        this.matrices.moveToNext();
    }

    addAcrossLine(p1: PointLike, p2: PointLike){
        Shape.stretchAcrossLine(this.matrices, this.mesh, p1, p2);
        this.matrices.moveToNext();
    }

    addLine(start: PointLike, end: PointLike, thickness: number){
         // Paramaterize line to a + bt, 0 <= t <= 1
        let a = Point.create(start);
        let b = Vec2.fromPointToPoint(start, end);
        
        // Determine how many shapes can be drawn on the line end to end
        let ratio = b.length() / thickness;
        let count = ratio >>> 0;
        
        // Re-parameterize the line to a + bt, o <= t <= count
        b.divScalar(ratio);

        // Fill the line with shapes
        let p1 = a;
        let p2 = Point.create(a);
        
        while(count-- && this.matrices.hasValidPosition()){
            p2.add(b);
            this.addAcrossLine(p1, p2);
            p1.set(p2);
        }

        return p1;
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

    offset(vec: Vec2Like): void {
        let matrices = this.matrices;
        matrices.moveToPosition(-1);
        while(matrices.moveToNext()){
            matrices.postTranslate(vec);
        }
    }

    transform(matrix: Mat2d): void {
        let matrices = this.matrices;
        matrices.moveToPosition(-1);
        while(matrices.moveToNext()){
            matrices.postConcat(matrix);
        }
    }

    /**
     * Returns true if any shape in this batch contains the specified point.
     */
    contains(pt: PointLike): boolean {
        let mesh = this.mesh;
        let matrices = this.matrices;
        let inverse = new Mat2d();
        let modelPt = new Point();
        matrices.moveToPosition(-1);
        while(matrices.moveToNext()){
            inverse.setInverse(matrices);
            inverse.map(pt, modelPt);
            if(mesh.contains(modelPt)){
                return true;
            }
        }
        
        return false;
    }

    draw(renderer: Renderer){
        let { fillColor, matrices, mesh } = this;
        let { gl, ext, fillProgram: program } = renderer;
        let primcount = matrices.capacity();
        renderer.attachProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setVertices(gl, mesh)
        program.setMatrices(gl, matrices);
        program.setColor(gl, fillColor);
        if(mesh.triangleIndices){
            let count = mesh.triangleIndices.data.length;
            let offset = mesh.elementBufferOffset;
            ext.drawElementsInstancedANGLE(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, offset, primcount)
        } else {
            let count = mesh.vertices.capacity();
            ext.drawArraysInstancedANGLE(gl.TRIANGLES, 0, count, primcount);
        }
    }

   save(database: Database, canvasId: number){
        let { zIndex, fillColor, matrices, mesh } = this;
        database.getTypeId(mesh.id).then(typeId => {
            database.shapeBatches.add({
                typeId: typeId,
                zIndex: zIndex,
                canvasId: canvasId,
                fillColor: compressColorF(fillColor),
                matrices: matrices.data.buffer
            }).then(id => this.id = id);
        });
    }

    delete(database: Database): void {
        database.shapeBatches.delete(this.id);
    }

    saveFillColor(database: Database): void {
        database.shapeBatches.update(this.id, {
            fillColor: compressColorF(this.fillColor),
        })
    }
    
    saveZindex(database: Database): void {
        database.shapeBatches.update(this.id, {
            zIndex: this.zIndex
        })
    }

    savePosition(database: Database){
        database.shapeBatches.update(this.id, {
            matrices: this.matrices.data.buffer
        });
    }
}

