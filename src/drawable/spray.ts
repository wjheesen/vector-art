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
        this.matrices.moveToNext();
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
        let program = renderer.shapeProgram;
        let matrices = this.matrices;
        let instanceCount = matrices.position();

        renderer.attachProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setMesh(gl, renderer.meshes[0])
        program.setMatrices(gl, matrices);
        program.setColor(gl, this.color);
        program.draw(renderer, instanceCount);
    }
    
}