import { Program } from './program';
import { Mat2dBuffer, Mat2dStruct } from 'gl2d/struct/mat2d';
import { Renderer } from '../rendering/renderer';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat4Struct } from 'gl2d/struct/mat4';
import { Mesh } from "gl2d/drawable/mesh";
import * as Util from 'gl2d/rendering/util';
import * as Shader from '../shader/shape';

/**
 * Program for rendering shapes.
 */
export class ShapeProgram extends Program<Shader.Uniforms, Shader.Attributes> {

    elementBuffer: WebGLBuffer;
    positionBuffer: WebGLBuffer;
    matrixBuffer: WebGLBuffer;
    mesh: Mesh;
    
    static create(gl: WebGLRenderingContext, meshes: Mesh[]) {
        let program = new ShapeProgram();
        program.location = Util.createProgramFromSources(gl, Shader.vertex, Shader.fragment);
        program.uniforms = Util.getUniformLocations(gl, program.location, Shader.UniformRenaming) as Shader.Uniforms;
        program.attribs = Util.getAttributeLocations(gl, program.location, Shader.AttributeRenaming) as Shader.Attributes;
        program.elementBuffer = packMeshIndices(gl, meshes);
        program.positionBuffer = packMeshVertices(gl, meshes);
        program.matrixBuffer = gl.createBuffer();
        return program;
    }

    onAttach(renderer: Renderer) {
        let { gl, ext } = renderer;

        let c1 = this.attribs.model;
        let c2 = c1 + 1;
        let c3 = this.attribs.offset;

        gl.enable(gl.BLEND);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);

        gl.enableVertexAttribArray(this.attribs.position);

        gl.enableVertexAttribArray(c1);
        gl.enableVertexAttribArray(c2);
        gl.enableVertexAttribArray(c3);
        
        ext.vertexAttribDivisorANGLE(c1, 1);
        ext.vertexAttribDivisorANGLE(c2, 1);
        ext.vertexAttribDivisorANGLE(c3, 1);
    }

    onDetach(renderer: Renderer){
        let ext = renderer.ext;

        let c1 = this.attribs.model;
        let c2 = c1 + 1;
        let c3 = this.attribs.offset;

        ext.vertexAttribDivisorANGLE(c1, 0);
        ext.vertexAttribDivisorANGLE(c2, 0);
        ext.vertexAttribDivisorANGLE(c3, 0);    

        this.mesh = null;    
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
     * Sets the mesh data this program will use to draw shapes.
     */
    setMesh(gl: WebGLRenderingContext, mesh: Mesh) {
        if(this.mesh !== mesh){
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
            gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, mesh.vertexBufferOffset);
            this.mesh = mesh;
        }
    }

   /**
     * Sets the matrix for each shape instance.
     */
    setMatrices(gl: WebGLRenderingContext, matrices: Mat2dStruct | Mat2dBuffer) {
        let c1 = this.attribs.model;
        let c2 = c1 + 1;
        let c3 = this.attribs.offset;

        // Load data into WebGL
        gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, matrices.data, gl.DYNAMIC_DRAW);

        // Set first column vector (part of mat2)
        gl.vertexAttribPointer(c1, 2, gl.FLOAT, false, 24, 0);
        
        // Set second column vector (part of mat2)
        gl.vertexAttribPointer(c2, 2, gl.FLOAT, false, 24, 8);

        // Set third column vector (separate vec2)
        gl.vertexAttribPointer(c3, 2, gl.FLOAT, false, 24, 16);
    }

    draw(renderer: Renderer, primcount = 1){
        let gl = renderer.gl;
        let ext = renderer.ext;
        let count = this.mesh.indices.data.length;
        let offset = this.mesh.elementBufferOffset;
        ext.drawElementsInstancedANGLE(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, offset, primcount);
    }
}

/**
* Packs mesh vertices into a single buffer.
* @param meshes the meshes to pack.
* @returns the packed vertices.
*/
function packMeshVertices(gl: WebGLRenderingContext, meshes: Mesh[]){
    // Create an array buffer big enough to hold all the vertices
    let size = 0;
    for(let mesh of meshes){
        size += mesh.vertices.data.byteLength;
    }

    let buffer = Util.createArrayBuffer(gl, size, gl.STATIC_DRAW);

    // Pack the vertices into the buffer, saving the byte offsets
    let offset = 0;

    for (let mesh of meshes) {
        let data = mesh.vertices.data;
        gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
        mesh.vertexBufferOffset = offset;
        offset += data.byteLength;
    }

    return buffer;
}

/**
* Packs mesh indices into a single buffer.
* @param meshes the meshes to pack.
* @returns the packed indices.
*/
function packMeshIndices(gl: WebGLRenderingContext, meshes: Mesh[]) {

    // Create an array buffer big enough to hold all the indices
    let size = 0;
    for(let mesh of meshes){
        size += mesh.indices.data.byteLength;
    }

    let buffer = Util.createElementBuffer(gl, size, gl.STATIC_DRAW);

    // Pack the indices into the buffer, saving the byte offsets
    let offset = 0;

    for (let mesh of meshes) {
        let data = mesh.indices.data;
        gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offset, data);
        mesh.elementBufferOffset = offset;
        offset += data.byteLength;
    }

    return buffer;
}