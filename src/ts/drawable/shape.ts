import { Renderer } from '../rendering/renderer';
import { Surface } from '../rendering/surface';
import { Drawable } from './drawable';
import { Mesh } from 'gl2d/drawable/mesh';
import { Shape as Base } from 'gl2d/drawable/shape';
import { ColorStruct } from 'gl2d/struct/color';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2dStruct } from 'gl2d/struct/mat2d';

export class Shape extends Base implements Drawable {

    zIndex = -1;

    /**
     * The color of this shape. 
     */
    color: ColorFStruct;

    constructor(mesh: Mesh, color: ColorFStruct, matrix?: Mat2dStruct){
        super(mesh, matrix);
        this.color = color;
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
        let color = ColorStruct.fromColorF(this.color).data.buffer;
        let matrix = this.matrix.data.buffer;
        let type = this.mesh.id; 

        database.shapes.add({
            zIndex: zIndex,
            canvasId: canvasId,
            type: type,
            color: color,
            matrix: matrix
        }).then(zIndex => this.zIndex = zIndex);
    }
}