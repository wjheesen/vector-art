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

    constructor(mesh: Mesh, color: ColorFStruct, matrix?: Mat2dStruct, zIndex?: number, id?: number){
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
        let gl = renderer.gl;
        let program = renderer.shapeProgram;
        renderer.attachProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setColor(gl, this.color);
        program.setMesh(gl, this.mesh);
        program.setMatrices(gl, this.matrix);
        program.draw(renderer);
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