import { Renderer } from '../rendering/renderer';
import { Drawable } from './drawable';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { IMat2d, Mat2dBuffer, ScaleToFit } from 'gl2d/struct/mat2d';
import { IPoint } from "gl2d/struct/point";
import { Rect } from "gl2d/struct/rect";
import { IVec2 } from "gl2d/struct/vec2";
import { Mesh } from "gl2d/drawable/mesh";

export class Spray implements Drawable {

    mesh: Mesh;

    color: ColorFStruct; // TODO change to set color?

    matrices: Mat2dBuffer;

    constructor(mesh: Mesh, color: ColorFStruct, matrices: Mat2dBuffer){
        this.mesh = mesh;
        this.color = color;
        this.matrices = matrices;
    }

    add(center: IPoint, radius: number){
        let src = this.mesh.bounds;
        let dst = Rect.unionOfPoints([center]);
        dst.inset$(-radius, -radius);
        this.matrices.$setRectToRect(src, dst, ScaleToFit.Center);
    }

    measureBoundaries(): Rect {
        // TODO: implement
        return Rect.lrbt(-1,1,-1,1);
        // let bounds = <Rect> null;
        // let instances = this.matrices;
        // if(instances.length > 0){
        //     bounds = instances[0].measureBoundaries();
        //     for(let i = 1; i<instances.length; i++){
        //         bounds.union(instances[i].measureBoundaries());
        //     }
        // }
        // // Bounds will be null if spray has no instances
        // return bounds;
    }

    offset(vec: IVec2): void {
        // for(let instance of this.matrices){
        //     instance.offset(vec);
        // }
    }

    transform(matrix: IMat2d): void {
        // for(let instance of this.matrices){
        //     instance.transform(matrix);
        // }
    }

    contains(pt: IPoint): boolean {
        // for(let instance of this.matrices){
        //     if(instance.contains(pt)){
        //         return true;
        //     }
        // }
        return false;
    }

    draw(renderer: Renderer){
        let gl = renderer.gl;
        let ext = renderer.ext;
        let program = renderer.sprayProgram;
        let matrices = this.matrices;
        let verticesPerInstance = this.mesh.vertices.capacity();
        let instanceCount = matrices.position();
        let {model, offset} = program.attribs;

        renderer.useProgram(program);

        program.setProjection(gl, renderer.camera.matrix);
        program.setColor(gl, this.color);

        // Upload matrix data. (Assumes matrix buffer already bound).
        gl.bufferData(gl.ARRAY_BUFFER, matrices.data, gl.DYNAMIC_DRAW);

        // Upload the three column vectors of the Mat2d as a 
        // mat2 followed by a vec2: [mmmm|mmmm]|[mmmm|mmmm]|[vvvv|vvvv]
        // First column vector (part of mat2):
        gl.enableVertexAttribArray(model);
        gl.vertexAttribPointer(model, 2, gl.FLOAT, false, 24, 0);
        ext.vertexAttribDivisorANGLE(model, 1); // 1 => update each instance
        
        // Second column vector (part of mat2):
        gl.enableVertexAttribArray(model+1);
        gl.vertexAttribPointer(model+1, 2, gl.FLOAT, false, 24, 8);
        ext.vertexAttribDivisorANGLE(model+1, 1); // 1 => update each instance

        // Third column vector (vec2):
        gl.enableVertexAttribArray(offset);
        gl.vertexAttribPointer(offset, 2, gl.FLOAT, false, 24, 16);
        ext.vertexAttribDivisorANGLE(offset, 1);

        ext.drawArraysInstancedANGLE(gl.TRIANGLES, 0, verticesPerInstance, instanceCount);

        ext.vertexAttribDivisorANGLE(model, 0);
        ext.vertexAttribDivisorANGLE(model+1, 0);
        ext.vertexAttribDivisorANGLE(offset, 0);
    }
    
}