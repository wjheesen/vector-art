import { compressColorF } from '../database/compression';
import { Renderer } from '../rendering/renderer';
import { Drawable } from './drawable';
import { Rect } from 'gl2d/struct/rect';
import { Mesh } from 'gl2d/drawable/mesh';
import { Shape as Base } from 'gl2d/drawable/shape';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2d, Mat2dStruct, ScaleToFit } from 'gl2d/struct/mat2d';
import { Database } from "../database/database";

export interface ShapeOptions {
    mesh: Mesh;
    fillColor?: ColorFStruct;
    strokeColor?: ColorFStruct;
    lineWidth?: number;
    matrix?: Mat2dStruct;
    zIndex?: number;
    id?: number;
}

export class Shape extends Base implements Drawable {

    fillColor?: ColorFStruct;
    strokeColor?: ColorFStruct;
    lineWidth?: number;
    zIndex?: number;
    id?: number;

    constructor(options: ShapeOptions){
        super(options.mesh, options.matrix);
        this.fillColor = options.fillColor;
        this.strokeColor = options.strokeColor;
        this.lineWidth = options.lineWidth || 0;
        this.zIndex = options.zIndex;
        this.id = options.id;
    }

    mapToRect(dst: Rect, stf?: ScaleToFit, preserveOrientation = false){
        if(preserveOrientation){
            let src = preserveOrientation ? this.measureBoundaries() : this.mesh.bounds;
            let matrix = Mat2d.rectToRect(src, dst, stf);
            this.transform(matrix);
        } else {
            super.mapToRect(dst, stf);
        }
    }

    draw(renderer: Renderer){
        let { fillColor, mesh, matrix, strokeColor, lineWidth } = this;
        let { gl, ext, shapeProgram, shapeOutlineProgram } = renderer;
        // Fill shape
        if(fillColor && !fillColor.isTransparent()){
            renderer.attachProgram(shapeProgram);
            shapeProgram.setProjection(gl, renderer.camera.matrix);
            shapeProgram.setColor(gl, fillColor);
            shapeProgram.setVertices(gl, mesh);
            shapeProgram.setMatrices(gl, matrix);
            if(mesh.triangleIndices){
                let count = mesh.triangleIndices.data.length;
                let offset = mesh.elementBufferOffset;
                ext.drawElementsInstancedANGLE(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, offset, 1)
            } else {
                let count = mesh.vertices.capacity();
                ext.drawArraysInstancedANGLE(gl.TRIANGLES, 0, count, 1);
            }
        }
        // Stroke shape
        if(lineWidth){
            renderer.attachProgram(shapeOutlineProgram);
            shapeOutlineProgram.setProjection(gl, renderer.camera.matrix);
            shapeOutlineProgram.setMatrices(gl, matrix);
            shapeOutlineProgram.setColor(gl, strokeColor);
            shapeOutlineProgram.setVertices(gl, mesh);
            shapeOutlineProgram.setMiters(gl, mesh);
            shapeOutlineProgram.setLineWidth(gl, lineWidth);
            let count = mesh.strokeElementCount;
            let offset = mesh.strokeElementBufferOffset;
            ext.drawElementsInstancedANGLE(gl.TRIANGLE_STRIP, count, gl.UNSIGNED_SHORT, offset, 1)
        }
    }

    save(database: Database, canvasId: number){
        let { zIndex, fillColor, strokeColor, lineWidth, matrix, mesh } = this;
        database.getTypeId(mesh.id).then(typeId => {
            database.shapes.add({
                typeId: typeId,
                zIndex: zIndex,
                canvasId: canvasId,
                lineWidth: lineWidth,
                fillColor: compressColorF(fillColor),
                strokeColor: compressColorF(strokeColor),
                matrix: matrix.data.buffer,
            }).then(id => this.id = id);
        });
    }

    delete(database: Database): void {
        database.shapes.delete(this.id);
    }

    saveFillColor(database: Database): void {
        database.shapes.update(this.id, {
            fillColor: compressColorF(this.fillColor),
        });
    }

    saveStrokeColor(database: Database): void {
        database.shapes.update(this.id, {
            strokeColor: compressColorF(this.strokeColor),
        });
    }

    saveLineWidth(database: Database): void {
        database.shapes.update(this.id, {
            lineWidth: this.lineWidth,
        });
    }
    
    saveZindex(database: Database): void {
        database.shapes.update(this.id, {
            zIndex: this.zIndex
        })
    }

    savePosition(database: Database){
        database.shapes.update(this.id, {
            matrix: this.matrix.data.buffer
        });
    }
}