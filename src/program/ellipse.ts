import { VertexBuffer } from 'gl2d/struct/vertex';
import {Program} from 'gl2d/rendering/program';
import {ColorFStruct} from 'gl2d/struct/colorf';
import {Mat4Struct} from 'gl2d/struct/mat4';
import { Mat2dStruct } from "gl2d/struct/mat2d";
import * as Util from 'gl2d/rendering/util';
import * as Shader from '../shader/ellipse';
import { Mesh } from "gl2d/graphics/mesh";
/**
 * Program for rendering ellipses.
 */
export class EllipseProgram extends Program<Shader.Uniforms, Shader.Attributes> {

    positionBuffer: WebGLBuffer;
    mesh = new Mesh(new VertexBuffer(new Float32Array([-1,1, -1,-1, 1,-1, 1,1])));

    static create(gl: WebGLRenderingContext) {
        let program = new EllipseProgram();
        program.location = Util.createProgramFromSources(gl, Shader.vertex, Shader.fragment);
        program.uniforms = Util.getUniformLocations(gl, program.location, Shader.UniformRenaming) as Shader.Uniforms;
        program.attribs = Util.getAttributeLocations(gl, program.location, Shader.AttributeRenaming) as Shader.Attributes;
        program.positionBuffer = Util.createArrayBuffer(gl, program.mesh.vertices.data);
        return program;
    }

    bind(gl: WebGLRenderingContext) {
        // Bind program
        gl.useProgram(this.location);
        // Enable blending (for transparency)
        gl.enable(gl.BLEND);
        // Bind tex buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.attribs.position);
    }

    /**
     * Sets this program's projection matrix.
     */
    setProjection(gl: WebGLRenderingContext, projection: Mat4Struct) {
        gl.uniformMatrix4fv(this.uniforms.projection, false, projection.data);
    }
   /**
    * 
     * Sets the matrix applied to shapes this program will draw.
     */
    setMatrix(gl: WebGLRenderingContext, matrix: Mat2dStruct) {
        gl.uniformMatrix3fv(this.uniforms.model, false, matrix.data);
    }

    /**
     * Sets this program's draw color.
     */
    setColor(gl: WebGLRenderingContext, color: ColorFStruct) {
        gl.uniform4fv(this.uniforms.color, color.data);
    }

    /**
     * Draws an ellipse using the color and bounds data loaded into the program. 
     */
    draw(gl: WebGLRenderingContext){
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
}