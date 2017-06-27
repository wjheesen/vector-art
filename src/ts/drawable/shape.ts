import { Renderer } from '../rendering/renderer';
import { Surface } from '../rendering/surface';
import { Drawable } from './drawable';
import { Rect } from 'gl2d/struct/rect';
import { Mesh } from 'gl2d/drawable/mesh';
import { Shape as Base } from 'gl2d/drawable/shape';
import { ColorStruct } from 'gl2d/struct/color';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2d, Mat2dStruct, ScaleToFit } from 'gl2d/struct/mat2d';

export class Shape extends Base implements Drawable {

    id: number;
    zIndex: number;

    /**
     * The color of this shape. 
     */
    color: ColorFStruct;

    strokeColor = ColorFStruct.create$(0,0,0,0.3);
    lineWidth = 0.025;

    constructor(mesh: Mesh, color?: ColorFStruct, matrix?: Mat2dStruct, zIndex?: number, id?: number){
        super(mesh, matrix);
        this.color = color;
        this.zIndex = zIndex;
        this.id = id;
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
        let { color, mesh, matrix, strokeColor, lineWidth } = this;
        let { gl, ext, shapeProgram, outlineProgram } = renderer;
        renderer.attachProgram(shapeProgram);
        shapeProgram.setProjection(gl, renderer.camera.matrix);
        shapeProgram.setColor(gl, color);
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

    save(surface: Surface){
        let { database, canvasId, zIndex } = surface;
        this.zIndex = zIndex;
        let color = ColorStruct.fromColorF(this.color).data.buffer;
        let matrix = this.matrix.data.buffer;

        database.getTypeId(this.mesh.id).then(typeId => {
            database.shapes.add({
                zIndex: zIndex,
                canvasId: canvasId.val,
                typeId: typeId,
                color: color,
                matrix: matrix
            }).then(id => this.id = id);
        });
    }

    delete(surface: Surface): void {
        surface.database.shapes.delete(this.id);
    }

    updateColor(surface: Surface, color: ColorStruct): void {
        this.color.setFromColor(color);
        surface.database.shapes.update(this.id, {
            color: color.data.buffer
        });
    }
    
    updateZIndex(surface: Surface, zIndex: number): void {
        this.zIndex = zIndex;
        surface.database.shapes.update(this.id, {
            zIndex: zIndex
        })
    }

    updatePosition(surface: Surface){
        surface.database.shapes.update(this.id, {
            matrix: this.matrix.data.buffer
        });
    }
}