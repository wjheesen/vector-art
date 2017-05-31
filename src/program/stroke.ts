import { Renderer } from '../rendering/renderer';
import { Program } from './program';
import { VertexBuffer } from 'gl2d/struct/vertex';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat4Struct } from 'gl2d/struct/mat4';
import * as Util from 'gl2d/rendering/util';
import * as Shader from '../shader/stroke';

/**
 * Program for rendering brush strokes.
 */
export class StrokeProgram extends Program<Shader.Uniforms, Shader.Attributes> {

    positionBuffer: WebGLBuffer;

    static create(gl: WebGLRenderingContext) {
        let program = new StrokeProgram();
        program.location = Util.createProgramFromSources(gl, Shader.vertex, Shader.fragment);
        program.uniforms = Util.getUniformLocations(gl, program.location, Shader.UniformRenaming) as Shader.Uniforms;
        program.attribs = Util.getAttributeLocations(gl, program.location, Shader.AttributeRenaming) as Shader.Attributes;
        program.positionBuffer = gl.createBuffer();
        return program;
    }

    onAttach(renderer: Renderer) {
        let gl = renderer.gl;
        gl.enable(gl.BLEND);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.enableVertexAttribArray(this.attribs.position);
    }
    onDetach(renderer: Renderer) {
    }

    /**
     * Sets this program's projection matrix.
     */
    setProjection(gl: WebGLRenderingContext, projection: Mat4Struct) {
        gl.uniformMatrix4fv(this.uniforms.projection, false, projection.data);
    }

    /**
     * Sets this program's draw color.
     */
    setColor(gl: WebGLRenderingContext, color: ColorFStruct) {
        gl.uniform4fv(this.uniforms.color, color.data);
    }

    /**
     * Sets the stroke vertices
     */
    setVertices(gl: WebGLRenderingContext, vertices: VertexBuffer){
        gl.bufferData(gl.ARRAY_BUFFER, vertices.data, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, 0);
    }

    /**
     * Draws an ellipse using the color and bounds data loaded into the program. 
     */
    draw(gl: WebGLRenderingContext, vertexCount: number){
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexCount);
    }
}