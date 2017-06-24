import { Mesh, PolygonMesh } from 'gl2d/drawable/mesh';
import * as Util from 'gl2d/rendering/util';
import * as Shader from '../../res/build/shader/outline';
import { Renderer } from '../rendering/renderer';
import { ShapeProgram } from './shape';

export class OutlineProgram extends ShapeProgram {

    miterBuffer: WebGLBuffer;

    static create(gl: WebGLRenderingContext, meshes: Mesh[]) {
        let program = new OutlineProgram();
        program.location = Util.createProgramFromSources(gl, Shader.vertex, Shader.fragment);
        program.uniforms = Util.getUniformLocations(gl, program.location, Shader.UniformRenaming) as Shader.Uniforms;
        program.attribs = Util.getAttributeLocations(gl, program.location, Shader.AttributeRenaming) as Shader.Attributes;
        program.elementBuffer = packMeshIndices(gl, meshes);
        program.positionBuffer = packMeshVertices(gl, meshes);
        program.miterBuffer = packMiterBuffer(gl, meshes);
        program.matrixBuffer = gl.createBuffer();
        program.dynamicBuffer = gl.createBuffer();
        return program;
    }

    onAttach(renderer: Renderer){
        super.onAttach(renderer);
        renderer.gl.enableVertexAttribArray(this.attribs.miter);
    }

    /**
     * Sets the vertices used to draw the outline.
     */
    setVertices(gl: WebGLRenderingContext, src: Mesh) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, src.strokeVertexBufferOffset);
    }

    setMiters(gl: WebGLRenderingContext, mesh: Mesh){
        if(mesh instanceof PolygonMesh){
            gl.bindBuffer(gl.ARRAY_BUFFER, this.miterBuffer);
            gl.vertexAttribPointer(this.attribs.miter, 2, gl.FLOAT, false, 0, mesh.miterBufferOffset);
        }
    }

    setLineWidth(gl: WebGLRenderingContext, lineWidth: number){
        gl.uniform1f(this.uniforms.lineWidth, lineWidth);
    }

}

function packMiterBuffer(gl: WebGLRenderingContext, meshes: Mesh[]){
    // Create an array buffer big enough to hold all the vertices
    let size = 0;
    for(let mesh of meshes){
        size += mesh.vertices.data.byteLength;
    }

    let buffer = Util.createArrayBuffer(gl, size*2, gl.STATIC_DRAW);

    // Pack the vertices into the buffer, saving the byte offsets
    let offset = 0;

    for (let mesh of meshes) {
        if(mesh instanceof PolygonMesh){
            let data = mesh.miters.data;
            mesh.miterBufferOffset = offset;
            offset += data.byteLength; // Leave zeros
            gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
            offset += data.byteLength; 
        }
    }

    return buffer;
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

    let buffer = Util.createArrayBuffer(gl, size*2, gl.STATIC_DRAW);

    // Pack the vertices into the buffer, saving the byte offsets
    let offset = 0;

    for (let mesh of meshes) {
        let data = mesh.vertices.data;
        // Repeat vertex data twice in buffer
        gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
        mesh.strokeVertexBufferOffset = offset;
        offset += data.byteLength;
        gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
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

    // Create an array buffer big enough to hold all the indices (2 per vertex)
    let size = 0;
    for(let mesh of meshes){
        size += mesh.vertices.data.byteLength;
    }

    let buffer = Util.createElementBuffer(gl, size*2, gl.STATIC_DRAW);

    // Pack the indices into the buffer, saving the byte offsets
    let offset = 0;

    for (let mesh of meshes) {
        let count = mesh.vertices.capacity();
        let arr: number[] = [];
        for(let i = 0; i<count; i++){
            arr.push(i, i+count);
        }
        arr.push(0, count); // close
        let indices = new Uint16Array(arr);
        gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offset, indices);
        mesh.strokeElementBufferOffset = offset;
        offset += indices.byteLength;
    }

    return buffer;
}