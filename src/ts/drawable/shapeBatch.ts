import { Renderer } from '../rendering/renderer';
import { Surface } from '../rendering/surface';
import { Drawable } from './drawable';
import { Shape } from './shape';
import { Mesh } from 'gl2d/drawable/mesh';
import { ColorStruct } from 'gl2d/struct/color';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2d, Mat2dBuffer, ScaleToFit } from 'gl2d/struct/mat2d';
import { PointLike } from 'gl2d/struct/point';
import { Point } from 'gl2d/struct/point';
import { Rect } from 'gl2d/struct/rect';
import { Vec2Like, Vec2 } from 'gl2d/struct/vec2';

export class ShapeBatch implements Drawable {

    id: number;
    zIndex: number;

    mesh: Mesh;

    color: ColorFStruct; // TODO change to set color?

    matrices: Mat2dBuffer;

    constructor(mesh: Mesh, color: ColorFStruct, matrices: Mat2dBuffer, zIndex?: number, id?: number){
        this.mesh = mesh;
        this.color = color;
        this.matrices = matrices;
        this.zIndex = zIndex;
        this.id = id;
    }

    add(center: PointLike, radius: number){
        let src = this.mesh.bounds;
        let dst = Rect.unionOfPoints([center]);
        dst.inset$(-radius, -radius);
        this.matrices.setRectToRect(src, dst, ScaleToFit.Center);
        this.matrices.moveToNext();
    }

    addAcrossLine(p1: PointLike, p2: PointLike){
        Shape.stretchAcrossLine(this.matrices, this.mesh, p1, p2);
        this.matrices.moveToNext();
    }

    addLine(start: PointLike, end: PointLike, thickness: number){
         // Paramaterize line to a + bt, 0 <= t <= 1
        let a = Point.create(start);
        let b = Vec2.fromPointToPoint(start, end);
        
        // Determine how many shapes can be drawn on the line from end to end
        let ratio = b.length() / thickness;
        let count = Math.min(ratio >> 0, this.matrices.capacity() - this.matrices.position());
        
        // Re-parameterize line to a + bt, o <= t <= count
        b.divScalar(ratio);

        // Fill the line with shapes
        let p1 = a;
        let p2 = Point.create(a);
        
        while(count--){
            p2.add(b);
            this.addAcrossLine(p1, p2);
            p1.set(p2);
        }

        return p1;
    }

    measureBoundaries(): Rect {
        let bounds = <Rect> null;
        let matrices = this.matrices;
        let vertices = this.mesh.vertices;

        if(matrices.moveToFirst() && vertices.moveToFirst()){
            // Enclose the first shape
            bounds = Shape.measureBoundaries(matrices, vertices);
            // Enclose the remaining shapes
            while(matrices.moveToNext()){
                bounds.union(Shape.measureBoundaries(matrices, vertices));
            }
        }
        
        // Bounds will be null if batch is empty
        return bounds;
    }

    offset(vec: Vec2Like): void {
        let matrices = this.matrices;
        matrices.moveToPosition(-1);
        while(matrices.moveToNext()){
            matrices.postTranslate(vec);
        }
    }

    transform(matrix: Mat2d): void {
        let matrices = this.matrices;
        matrices.moveToPosition(-1);
        while(matrices.moveToNext()){
            matrices.postConcat(matrix);
        }
    }

    /**
     * Returns true if any shape in this batch contains the specified point.
     */
    contains(pt: PointLike): boolean {
        let mesh = this.mesh;
        let matrices = this.matrices;
        let inverse = new Mat2d();
        let modelPt = new Point();
        matrices.moveToPosition(-1);
        while(matrices.moveToNext()){
            inverse.setInverse(matrices);
            inverse.map(pt, modelPt);
            if(mesh.contains(modelPt)){
                matrices.moveToLast();
                matrices.moveToNext();
                return true;
                // return matrices.moveToLast(); 
            }
        }
        
        return false;
    }

    draw(renderer: Renderer){
        let gl = renderer.gl;
        let program = renderer.shapeProgram;
        let matrices = this.matrices;
        let instanceCount = matrices.position();
        renderer.attachProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setMesh(gl, this.mesh)
        program.setMatrices(gl, matrices);
        program.setColor(gl, this.color);
        program.draw(renderer, instanceCount);
    }

   save(surface: Surface){
        let { database, canvasId, zIndex } = surface;
        this.zIndex = zIndex;
        let color = ColorStruct.fromColorF(this.color).data.buffer;
        let matrices = this.matrices.data.buffer;

        database.getTypeId(this.mesh.id).then(typeId => {
            database.shapeBatches.add({
                canvasId: canvasId,
                typeId: typeId,
                zIndex: zIndex,
                color: color,
                matrices: matrices
            }).then(id => this.id = id);
        });
    }

    delete(surface: Surface): void {
        surface.database.shapeBatches.delete(this.id);
    }

    updateColor(surface: Surface, color: ColorStruct): void {
        this.color.setFromColor(color);
        surface.database.shapeBatches.update(this.id, {
            color: color.data.buffer
        })
    }
    
    updateZIndex(surface: Surface, zIndex: number): void {
        this.zIndex = zIndex;
        surface.database.shapeBatches.update(this.id, {
            zIndex: zIndex
        })
    }

    updatePosition(surface: Surface){
        surface.database.shapeBatches.update(this.id, {
            matrices: this.matrices.data.buffer
        });
    }
}
