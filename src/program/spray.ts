import {Program} from 'gl2d/rendering/program';
import {ColorFStruct} from 'gl2d/struct/colorf';
import {Mat4Struct} from 'gl2d/struct/mat4';
import * as Util from 'gl2d/rendering/util';
import * as Shader from '../shader/spray';
import { Mesh } from "gl2d/drawable/mesh";
/**
 * Program for rendering ellipses.
 */
export class SprayProgram extends Program<Shader.Uniforms, Shader.Attributes> {

    positionBuffer: WebGLBuffer;
    matrixBuffer: WebGLBuffer
    mesh = new Mesh(Mesh.polygonVertices(3));
    
    static create(gl: WebGLRenderingContext) {
        let program = new SprayProgram();
        program.location = Util.createProgramFromSources(gl, Shader.vertex, Shader.fragment);
        program.uniforms = Util.getUniformLocations(gl, program.location, Shader.UniformRenaming) as Shader.Uniforms;
        program.attribs = Util.getAttributeLocations(gl, program.location, Shader.AttributeRenaming) as Shader.Attributes;
        program.positionBuffer = Util.createArrayBuffer(gl, program.mesh.vertices.data);
        program.matrixBuffer = gl.createBuffer();
        return program;
    }

    bind(gl: WebGLRenderingContext) {
        // Bind program
        gl.useProgram(this.location);
        // Enable blending (for transparency)
        gl.enable(gl.BLEND);
        // Bind position buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.enableVertexAttribArray(this.attribs.position);
        gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, 0);
        // Bind matrix buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer);
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

}