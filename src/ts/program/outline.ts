import { VertexBuffer } from 'gl2d/struct/vertex';
import { Mesh, MultiPolygonMesh } from 'gl2d/drawable/mesh';
import * as Util from 'gl2d/rendering/util';
import * as Shader from '../../res/build/shader/outline';
import { Renderer } from '../rendering/renderer';
import { ShapeProgram } from './shape';

export class OutlineProgram extends ShapeProgram {

    miterBuffer: WebGLBuffer;

    static create(gl: WebGLRenderingContext, meshes: Mesh[]) {
        meshes = meshes.filter(mesh => mesh.miters);
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
        gl.bindBuffer(gl.ARRAY_BUFFER, this.miterBuffer);
        gl.vertexAttribPointer(this.attribs.miter, 2, gl.FLOAT, false, 0, mesh.miterBufferOffset);
    }

    setLineWidth(gl: WebGLRenderingContext, lineWidth: number){
        gl.uniform1f(this.uniforms.lineWidth, lineWidth);
    }

}

function packMiterBuffer(gl: WebGLRenderingContext, meshes: Mesh[]){
    // Create an array buffer big enough to hold all the miters
    let size = 0;
    for(let mesh of meshes){
        size += mesh.vertices.data.byteLength;
        size += mesh.miters.data.byteLength;
    }

    let buffer = Util.createArrayBuffer(gl, size, gl.STATIC_DRAW);

    // Pack the vertices into the buffer, saving the byte offsets
    let offset = 0;
    let data: Float32Array;

    for (let mesh of meshes) {
        mesh.miterBufferOffset = offset;
        offset += mesh.vertices.data.byteLength; // Leave zeros
        data = mesh.miters.data;
        gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
        offset += data.byteLength; 
    }

    return buffer;
}

/**
* Packs mesh vertices into a single buffer.
* @param meshes the meshes to pack.
* @returns the packed vertices.
*/
function packMeshVertices(gl: WebGLRenderingContext, meshes: Mesh[]){
    // Create an array buffer big enough to hold all the vertices and all the miters
    let size = 0;
    for(let mesh of meshes){
        size += mesh.vertices.data.byteLength;
        size += mesh.miters.data.byteLength;
    }

    let buffer = Util.createArrayBuffer(gl, size, gl.STATIC_DRAW);

    // Pack the vertices into the buffer, saving the byte offsets
    let offset = 0;

    for (let mesh of meshes) {
        // Add vertex data to buffer
        let data = mesh.vertices.data;
        gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
        mesh.strokeVertexBufferOffset = offset;
        offset += data.byteLength;
        if(mesh instanceof MultiPolygonMesh){
            // un-index because each outline vertex has separate miter
            let vertices = VertexBuffer.create(mesh.miters.capacity());
            for(let indices of mesh.polygonIndices){
                for(let index of indices){
                    mesh.vertices.moveToPosition(index);
                    vertices.rset(mesh.vertices);
                }
            }
            data = vertices.data;
        } 
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
    // Ex: Let polygon p = [v0,v1,v2]
    // -> indexCount =  2 * (p.length + 1) = 2 * 2 * (3 + 1) = 8
    // -> indices = [[0,3], [1,4], [2,5], [0,3]]
    // -> size = sizeof(short) * indexCount = 2 bytes * 8 = 16 bytes

    // Ex: Let multi polygon p = [[v0,v1,v2], [v3,v4,v5]]
    // -> indexCount = 2 * [(p.length - 1) + (p[0].length + 1) + (p[1].length + 1)]
    //               = 2 * [(2 - 1) + (3 + 1) + (3 + 1)] = 18
    // -> indices = [
    // [[6,0], [7,1], [8,2], [6,0]],    
    // [[3,6]] // Degenerate
    // [[9,3], [10,4], [11,5], [9,3]]
    // ]
    // -> size = sizeof(short) * indexCount = 2 bytes * 18 = 36 bytes

    // Create a Uint16Array big enough to hold all the indices
    let indexCount = 0;
    for(let mesh of meshes){
        if(mesh instanceof MultiPolygonMesh){
            mesh.strokeElementCount = 2 * (mesh.polygonIndices.length - 1);
            for(let indices of mesh.polygonIndices){
                mesh.strokeElementCount += 2 * (indices.length + 1);
            }
        } else {
            mesh.strokeElementCount = 2 * (mesh.vertices.capacity() + 1); 
        }
        indexCount += mesh.strokeElementCount
    }

    let indices = new Uint16Array(indexCount);
    let position = 0;

    for(let mesh of meshes){
        mesh.strokeElementBufferOffset = position * 2; // sizeof(short)
        let vertexCount = mesh.vertices.capacity();

        if(mesh instanceof MultiPolygonMesh){
            let polygonIndices = mesh.polygonIndices;
            for(let i = 0; i < polygonIndices.length; i++){
                let path = polygonIndices[i];
                let firstOutlineVertex = vertexCount;
                // Line to each point on path
                for(let index of path){
                    indices[position++] = vertexCount++; // Unindexed
                    indices[position++] = index;
                }
                // Close path
                indices[position++] = firstOutlineVertex;
                indices[position++] = path[0];
                // Move to next path (if any)
                if(polygonIndices[i+1]){
                    indices[position++] = path[0];
                    indices[position++] = vertexCount;
                }
            }
        } else {
            // Line to each point on path
            for(let i = 0; i<vertexCount; i++){
                indices[position++] = i + vertexCount;
                indices[position++] = i;
            }
            // Close path
            indices[position++] = vertexCount;
            indices[position++] = 0;
        }
    }

    return Util.createElementBuffer(gl, indices, gl.STATIC_DRAW);
}