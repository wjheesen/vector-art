import { convertFromColorF } from '../database/conversion';
import { Renderer } from '../rendering/renderer';
import { Surface } from '../rendering/surface';
import { Drawable } from './drawable';
import { Rect } from 'gl2d/struct/rect';
import { Mesh } from 'gl2d/drawable/mesh';
import { Shape as Base } from 'gl2d/drawable/shape';
import { ColorStruct } from 'gl2d/struct/color';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2d, Mat2dStruct, ScaleToFit } from 'gl2d/struct/mat2d';

export interface ShapeOptions {
    mesh: Mesh;
    fillColor: ColorFStruct;
    strokeColor?: ColorFStruct;
    lineWidth?: number;
    matrix?: Mat2dStruct;
    zIndex?: number;
    id?: number;
}

export class Shape extends Base implements Drawable {

    fillColor: ColorFStruct;
    strokeColor: ColorFStruct;
    lineWidth: number;
    zIndex: number;
    id: number;

    constructor(options: ShapeOptions){
        super(options.mesh, options.matrix);
        this.fillColor = options.fillColor;
        this.strokeColor = options.strokeColor;
        this.lineWidth = options.lineWidth;
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
        let { gl, ext, shapeProgram, outlineProgram } = renderer;
        // Fill shape
        if(!fillColor.isTransparent()){
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
            renderer.attachProgram(outlineProgram);
            outlineProgram.setProjection(gl, renderer.camera.matrix);
            outlineProgram.setMatrices(gl, matrix);
            outlineProgram.setColor(gl, strokeColor);
            outlineProgram.setVertices(gl, mesh);
            outlineProgram.setMiters(gl, mesh);
            outlineProgram.setLineWidth(gl, lineWidth);
            let count = mesh.strokeElementCount;
            let offset = mesh.strokeElementBufferOffset;
            ext.drawElementsInstancedANGLE(gl.TRIANGLE_STRIP, count, gl.UNSIGNED_SHORT, offset, 1)
        }
    }

    save(surface: Surface){
        let { database, canvasId } = surface;
        let { zIndex, fillColor, strokeColor, lineWidth, matrix, mesh } = this;
        database.getTypeId(mesh.id).then(typeId => {
            database.shapes.add({
                typeId: typeId,
                zIndex: zIndex,
                canvasId: canvasId.val,
                lineWidth: lineWidth,
                fillColor: convertFromColorF(fillColor),
                strokeColor: convertFromColorF(strokeColor),
                matrix: matrix.data.buffer,
            }).then(id => this.id = id);
        });
    }

    delete(surface: Surface): void {
        surface.database.shapes.delete(this.id);
    }

    setFillColorAndSave(surface: Surface, color: ColorStruct): void {
        this.fillColor.setFromColor(color);
        surface.database.shapes.update(this.id, {
            color: color.data.buffer
        });
    }
    
    setZIndexAndSave(surface: Surface, zIndex: number): void {
        this.zIndex = zIndex;
        surface.database.shapes.update(this.id, {
            zIndex: zIndex
        })
    }

    savePosition(surface: Surface){
        surface.database.shapes.update(this.id, {
            matrix: this.matrix.data.buffer
        });
    }
}