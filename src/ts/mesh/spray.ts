import { IndexTupleBuffer } from 'gl2d/struct/indextuple';
import { VertexBuffer } from 'gl2d/struct/vertex';
import { Shape } from 'gl2d/drawable/shape';
import { Mesh } from 'gl2d/drawable/mesh';
import { Point, IPoint } from "gl2d/struct/point";
import { Mat2d } from "gl2d/struct/mat2d";

export class SprayMesh extends Mesh {

    shapeMesh: Mesh;

    static create(shapeMesh: Mesh, shapesInInnerRing: number, rings: number, id?: string){
        // Create vertex buffer big enough to hold all the shapes in the spray
        let vertices = shapeMesh.vertices;
        let vertexCount = vertices.capacity();
        let shapeCount = SprayMesh.countShapesInSpray(shapesInInnerRing, rings);
        let totalVertexCount = vertexCount * shapeCount;
        let vertexBuffer = VertexBuffer.create(vertexCount * shapeCount);

        // Create helper variables for placing each shape in its ring
        let angle = 2 * Math.PI / shapesInInnerRing;
        let rotation = Mat2d.rotate(angle);
        let p1 = Point.create$(0, 0);
        let p2 = Point.create$(0, 1);
        let matrix = new Mat2d();

        // Fill each ring with shapes
        for(let ring = 0; ring < rings; ring++){
            for(let shapes = shapesInInnerRing << ring; shapes > 0; shapes--){
                // Copy vertices into buffer
                let offset = vertexBuffer.position();
                vertices.moveToFirst();
                vertexBuffer.putBuffer(vertices);
                // Transform shape across line from p1 to p2
                Shape.stretchAcrossLine(matrix, shapeMesh, p1, p2);
                vertexBuffer.transform(matrix, offset, vertexCount);
                // Position p1 and p2 for next shape in ring
                rotation.map(p1, p1);
                rotation.map(p2, p2);
            }
            // Push p1 and p2 onto the next ring
            p1.y++;
            p2.y++;
            // Halve the rotation angle, doubling the number of shapes on the subsequent ring
            rotation.setRotate(angle *= 0.5);
        }

        // Create index buffer big enough to hold all the indices
        let indices = shapeMesh.indices;
        let indexCount = indices.capacity();
        let indexBuffer = IndexTupleBuffer.create(indexCount * shapeCount);
        
        // Copy indices repeatedly to buffer, offseting according to position
        for(let offset = 0; offset<totalVertexCount; offset+= vertexCount){
            indices.moveToPosition(-1);
            while(indices.moveToNext()){
                indexBuffer.$set(indices);
                indexBuffer.$add$(offset,offset,offset);
                indexBuffer.moveToNext();
            }
        }

        let mesh = new SprayMesh(vertexBuffer, indexBuffer, id);
        mesh.shapeMesh = shapeMesh;
        return mesh;
    }

    static countShapesInSpray(shapesInInnerRing: number, rings: number){
        //Note: uses the formula for the sum of the first n terms of a geometric series:
        //(3,2) -> 3*1 + 3*2 = 3(2^0 + 2^1) = 3*(1-2^2)/(1-2) = 3*(-3/-1) = 3*3 = 9;
        //(3,3) -> 3*1 + 3*2 + 3*4 = 3(2^0 + 2^1 + 2^2) = 3*(1-2^3)/(1-2) = 3*(-7/-1) = 21;
        //(m,n) -> m*2^0 + ... + m*2^(n-1) = m*(1-2^n)/(1-2) = m*(1-2^n)/(-1) = m*(2^n - 1)
        return shapesInInnerRing * ((1<<rings) - 1);
    }

    contains(pt: IPoint){
        if(this.bounds.contains(pt)){
            let vertices = this.vertices;
            let vertexCount = vertices.capacity();
            let verticesPerShape = this.shapeMesh.vertices.capacity();
            for(let offset = 0; offset<vertexCount; offset+=verticesPerShape){
                if(vertices.contains(pt, offset, verticesPerShape)){
                    return vertices.moveToLast();
                }
            }
        }
        return false;
    }
}