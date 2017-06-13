import { Renderer } from '../rendering/renderer';
import { Program } from './program';
import { RectStruct } from 'gl2d/struct/rect';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat4Struct } from 'gl2d/struct/mat4';
import * as Shader from '../../res/build/shader/frame';
import * as Util from 'gl2d/rendering/util';

/**
 * Program for rendering frames. 
 */
export class FrameProgram extends Program<Shader.Uniforms, Shader.Attributes> {


    positionBuffer: WebGLBuffer;

    /**
     * Creates a program that can render frames.
     */
    static create(gl: WebGLRenderingContext) {
        let program = new FrameProgram();
        program.location = Util.createProgramFromSources(gl, Shader.vertex, Shader.fragment);
        program.uniforms = Util.getUniformLocations(gl, program.location, Shader.UniformRenaming) as Shader.Uniforms;
        program.attribs = Util.getAttributeLocations(gl, program.location, Shader.AttributeRenaming) as Shader.Attributes;
        program.positionBuffer = Util.createArrayBuffer(gl, new Float32Array([0, 1, 0, 0, 1, 0, 1, 1]));
        return program;
    }

    onAttach (renderer: Renderer) {
        let gl = renderer.gl;
        // Enable blending (for transparency)
        gl.enable(gl.BLEND);
        // Bind position buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.enableVertexAttribArray(this.attribs.basisCoord);
        gl.vertexAttribPointer(this.attribs.basisCoord, 2, gl.FLOAT, false, 0, 0);
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
     * Sets the matrix applied to shapes this program will draw.
     */
    setInnerRect(gl: WebGLRenderingContext, innerRect: RectStruct) {
        gl.uniform4fv(this.uniforms.innerRect, innerRect.data);
    }
    
   /**
     * Sets the thickness of the frames this program will draw.
     */
    setThickness(gl: WebGLRenderingContext, thickness: number) {
        gl.uniform1f(this.uniforms.thickness, thickness);
    }
    /**
     * Draws a shape using the color, mesh, and mesh matrix loaded into this program. 
     */
    draw (gl: WebGLRenderingContext) {
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
}
