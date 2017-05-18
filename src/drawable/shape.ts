import { Drawable } from './drawable';
import { Renderer } from '../rendering/renderer';

export class Shape extends Drawable {

     /**
     * The inverse of this shape's model matrix. Cached for performance of contains method.
     */
    // public inverse = new Mat2dStruct();

    draw(renderer: Renderer){
        let gl = renderer.gl;
        let program = renderer.shapeProgram;
        renderer.useProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setColor(gl, this.color);
        program.setMesh(gl, this.mesh);
        program.setMatrix(gl, this.matrix);
        program.draw(gl);
    }
}