import { Renderer } from '../rendering/renderer';
import { Surface } from '../rendering/surface';
import { Drawable } from './drawable';
import { Mesh } from 'gl2d/mesh/mesh';
import { Shape as Base } from 'gl2d/drawable/shape';
import { ColorStruct } from 'gl2d/struct/color';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2dStruct } from 'gl2d/struct/mat2d';

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
                canvasId: canvasId,
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