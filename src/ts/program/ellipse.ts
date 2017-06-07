import { Mat2dBuffer, Mat2dStruct } from 'gl2d/struct/mat2d';
import { Renderer } from '../rendering/renderer';
import { Program } from './program';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat4Struct } from 'gl2d/struct/mat4';
import { Mesh } from "gl2d/drawable/mesh";
import * as Util from 'gl2d/rendering/util';
import * as Shader from '../shader/ellipse';

/**
 * Program for rendering ellipses.
 */
export class EllipseProgram extends Program<Shader.Uniforms, Shader.Attributes> {

    positionBuffer: WebGLBuffer;
    matrixBuffer: WebGLBuffer;
    mesh = Mesh.fromSource({vertices: [-1,1, -1,-1, 1,-1, 1,1] });

    static create(gl: WebGLRenderingContext) {
        let program = new EllipseProgram();
        program.location = Util.createProgramFromSources(gl, Shader.vertex, Shader.fragment);
        program.uniforms = Util.getUniformLocations(gl, program.location, Shader.UniformRenaming) as Shader.Uniforms;
        program.attribs = Util.getAttributeLocations(gl, program.location, Shader.AttributeRenaming) as Shader.Attributes;
        program.positionBuffer = Util.createArrayBuffer(gl, program.mesh.vertices.data);
        program.matrixBuffer = gl.createBuffer();
        return program;
    }

    onAttach(renderer: Renderer) {
        let { gl, ext } = renderer;

        let c1 = this.attribs.model;
        let c2 = c1 + 1;
        let c3 = this.attribs.offset;

        // Enable blending (for transparency)
        gl.enable(gl.BLEND);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.enableVertexAttribArray(this.attribs.position);
        gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer);

        gl.enableVertexAttribArray(c1);
        gl.enableVertexAttribArray(c2);
        gl.enableVertexAttribArray(c3);
        
        ext.vertexAttribDivisorANGLE(c1, 1);
        ext.vertexAttribDivisorANGLE(c2, 1);
        ext.vertexAttribDivisorANGLE(c3, 1);
    }

    onDetach(renderer: Renderer) {
        let ext = renderer.ext;

        let c1 = this.attribs.model;
        let c2 = c1 + 1;
        let c3 = this.attribs.offset;

        ext.vertexAttribDivisorANGLE(c1, 0);
        ext.vertexAttribDivisorANGLE(c2, 0);
        ext.vertexAttribDivisorANGLE(c3, 0);       
    }

    /**
     * Sets this program's projection matrix.
     */
    setProjection(gl: WebGLRenderingContext, projection: Mat4Struct) {
        gl.uniformMatrix4fv(this.uniforms.projection, false, projection.data);
    }

   /**
     * Sets the matrix for each ellipse instance.
     */
    setMatrices(gl: WebGLRenderingContext, matrices: Mat2dStruct | Mat2dBuffer) {
        // Note: assumes 
        // (1) matrix buffer is already bound
        // (2) attrib arrays are already enabled
        // (3) attrib divisors have already been specified

        let c1 = this.attribs.model;
        let c2 = c1 + 1;
        let c3 = this.attribs.offset;

        // Load data into WebGL
        gl.bufferData(gl.ARRAY_BUFFER, matrices.data, gl.DYNAMIC_DRAW);

        // Set first column vector (part of mat2)
        gl.vertexAttribPointer(c1, 2, gl.FLOAT, false, 24, 0);
        
        // Set second column vector (part of mat2)
        gl.vertexAttribPointer(c2, 2, gl.FLOAT, false, 24, 8);

        // Set third column vector (separate vec2)
        gl.vertexAttribPointer(c3, 2, gl.FLOAT, false, 24, 16);
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
    draw(renderer: Renderer, primcount = 1){
        let gl = renderer.gl;
        let ext = renderer.ext;
        ext.drawArraysInstancedANGLE(gl.TRIANGLE_FAN, 0, 4, primcount);
    }
}