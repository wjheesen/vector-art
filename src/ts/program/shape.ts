import { Program } from './program';
import { Mat2dBuffer, Mat2dStruct } from 'gl2d/struct/mat2d';
import { Renderer } from '../rendering/renderer';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat4Struct } from 'gl2d/struct/mat4';
import { Mesh } from "gl2d/drawable/mesh";
import { VertexBuffer } from "gl2d/struct/vertex";
import * as Util from 'gl2d/rendering/util';
import * as Shader from '../../res/build/shader/shape';

/**
 * Program for rendering shapes.
 */
export class ShapeProgram extends Program<Shader.Uniforms, Shader.Attributes> {

    elementBuffer: WebGLBuffer;
    positionBuffer: WebGLBuffer;
    matrixBuffer: WebGLBuffer;
    dynamicBuffer: WebGLBuffer;
    
    static create(gl: WebGLRenderingContext, meshes: Mesh[]) {
        let program = new ShapeProgram();
        program.location = Util.createProgramFromSources(gl, Shader.vertex, Shader.fragment);
        program.uniforms = Util.getUniformLocations(gl, program.location, Shader.UniformRenaming) as Shader.Uniforms;
        program.attribs = Util.getAttributeLocations(gl, program.location, Shader.AttributeRenaming) as Shader.Attributes;
        program.elementBuffer = packMeshIndices(gl, meshes);
        program.positionBuffer = packMeshVertices(gl, meshes);
        program.matrixBuffer = gl.createBuffer();
        program.dynamicBuffer = gl.createBuffer();
        return program;
    }

    onAttach(renderer: Renderer) {
        let { gl, ext } = renderer;

        let column1 = this.attribs.model;
        let column2 = column1 + 1;
        let column3 = this.attribs.offset;

        gl.enable(gl.BLEND);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);

        gl.enableVertexAttribArray(this.attribs.position);

        // Enable a separate array for each column of the 3x2 model matrix
        gl.enableVertexAttribArray(column1);
        gl.enableVertexAttribArray(column2); 
        gl.enableVertexAttribArray(column3);
        
        // Only change the model matrix when the instance changes
        ext.vertexAttribDivisorANGLE(column1, 1); 
        ext.vertexAttribDivisorANGLE(column2, 1);
        ext.vertexAttribDivisorANGLE(column3, 1);
    }

    onDetach(renderer: Renderer){
        let ext = renderer.ext;

        let column1 = this.attribs.model;
        let column2 = column1 + 1;
        let column3 = this.attribs.offset;

        // Disable instancing of 3x2 model matrix (because it affects global state)
        ext.vertexAttribDivisorANGLE(column1, 0);
        ext.vertexAttribDivisorANGLE(column2, 0);
        ext.vertexAttribDivisorANGLE(column3, 0);    
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
     * Sets the vertices used to draw the shape.
     */
    setVertices(gl: WebGLRenderingContext, src: Mesh | VertexBuffer) {
        if(isMesh(src)){
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
            gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, src.vertexBufferOffset);
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.dynamicBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, src.data, gl.DYNAMIC_DRAW);
            gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, 0);
        }
    }

   /**
     * Sets the matrix for each shape instance.
     */
    setMatrices(gl: WebGLRenderingContext, matrices: Mat2dStruct | Mat2dBuffer) {
        let column1 = this.attribs.model;
        let column2 = column1 + 1;
        let column3 = this.attribs.offset;

        // Load data into WebGL
        gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, matrices.data, gl.DYNAMIC_DRAW);

        // Set each column of the 3x2 model matrix
        gl.vertexAttribPointer(column1, 2, gl.FLOAT, false, 24, 0);
        gl.vertexAttribPointer(column2, 2, gl.FLOAT, false, 24, 8);
        gl.vertexAttribPointer(column3, 2, gl.FLOAT, false, 24, 16);
    }
}

function isMesh(src: Mesh | VertexBuffer): src is Mesh {
    return !!(<Mesh>src).vertices;
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
        size += mesh.triangleIndices.data.byteLength;
    }

    let buffer = Util.createElementBuffer(gl, size, gl.STATIC_DRAW);

    // Pack the indices into the buffer, saving the byte offsets
    let offset = 0;

    for (let mesh of meshes) {
        let data = mesh.triangleIndices.data;
        gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offset, data);
        mesh.elementBufferOffset = offset;
        offset += data.byteLength;
    }

    return buffer;
}