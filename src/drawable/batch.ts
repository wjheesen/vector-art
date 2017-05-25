import { Shape } from './shape';
import { Renderer } from '../rendering/renderer';
import { Drawable } from './drawable';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { IMat2d } from 'gl2d/struct/mat2d';
import { IPoint, Point } from "gl2d/struct/point";
import { Rect } from "gl2d/struct/rect";
import { IVec2 } from "gl2d/struct/vec2";
import { Mesh } from "gl2d/drawable/mesh";

export class Batch implements Drawable {

    color: ColorFStruct; // TODO change to set color?

    mesh: Mesh;

    instances: Shape[];

    constructor(mesh: Mesh, color: ColorFStruct, instances: Shape[] = []){
        this.mesh = mesh;
        this.color = color;
        this.instances = instances;
    }

    add(center: IPoint, radius: number){
        let instance = new Shape(this.mesh, this.color);
        let p1 = Point.create$(center.x, center.y + radius);
        let p2 = Point.create$(center.x, center.y - radius);
        instance.stretchAcrossLine(p1, p2);
        this.instances.push(instance);
    }

    measureBoundaries(): Rect {
        let bounds = <Rect> null;
        let instances = this.instances;
        if(instances.length > 0){
            bounds = instances[0].measureBoundaries();
            for(let i = 1; i<instances.length; i++){
                bounds.union(instances[i].measureBoundaries());
            }
        }
        // Bounds will be null if spray has no instances
        return bounds;
    }

    offset(vec: IVec2): void {
        for(let instance of this.instances){
            instance.offset(vec);
        }
    }

    transform(matrix: IMat2d): void {
        for(let instance of this.instances){
            instance.transform(matrix);
        }
    }

    contains(pt: IPoint): boolean {
        for(let instance of this.instances){
            if(instance.contains(pt)){
                return true;
            }
        }
        return false;
    }

    draw(renderer: Renderer){
        // TODO: check gl state before changing
        // for(let instance of this.instances){
        //     instance.draw(renderer);
        // }
        let gl = renderer.gl;
        let program = renderer.shapeProgram;
        renderer.useProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setColor(gl, this.color);
        program.setMesh(gl, this.mesh);
        for(let instance of this.instances){
            program.setMatrix(gl, instance.matrix);
            program.draw(gl);
        }
    }
    
}