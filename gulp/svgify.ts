import { MeshSpecification as Base } from 'gl2d/specification/mesh';
import { Mesh, InstancedPolygonMesh, MultiPolygonMesh } from 'gl2d/drawable/mesh';
import { Rect } from 'gl2d/struct/rect';
import { Mat2d, ScaleToFit } from 'gl2d/struct/mat2d';
import * as stream from 'stream';
import * as through2 from 'through2';
import * as File from 'vinyl';

interface MeshSpecification extends Base {
    path?: number[][];
}

function svgify(): stream.Transform{
    return through2.obj(function (file: File, encoding, callback) {
        
        // Extract mesh vertices from .json file
        let spec = JSON.parse(file.contents.toString()) as MeshSpecification;
        let mesh = Mesh.fromSpecification(spec);
        let vertices = mesh.vertices;

        // Flip mesh horizontally because svg origin is at top left
        vertices.transform(Mat2d.scale(1, -1)); 

        // Center mesh in rect with width = 512, height = 512
        let src = vertices.measureBoundaries();
        let dst = Rect.lrbt(0, 512, 0, 512);
        vertices.transform(Mat2d.rectToRect(src, dst, ScaleToFit.Center));

        // Convert vertices to svg path
        let path = "";

        if(mesh instanceof MultiPolygonMesh){
            mesh.polygonIndices.forEach(indices => {
                path += "M";
                indices.forEach(index => {
                    vertices.moveToPosition(index);
                    path += `${vertices.x},${vertices.y} `;
                })
            })
        } else {
            let vertexCount: number;
            if(mesh instanceof InstancedPolygonMesh){
                vertexCount = mesh.verticesPerInstance;
            } else { 
                vertexCount = mesh.vertices.capacity();
            }
            
            vertices.moveToFirst();
            while(vertices.hasValidPosition()){
                path += "M";
                for(let i = 0; i<vertexCount; i++){
                    path += `${vertices.x},${vertices.y} `;
                    vertices.moveToNext();
                }
            }
        }

        // Write path to svg
        let svg = 
`<?xml version="1.0" ?>
<svg width="${dst.width()}" height="${dst.height()}" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
<g>
    <path d="${path}"/>
</g>
</svg>`

        // Output svg
        file.contents = new Buffer(svg);
        callback(null, file);
    });
};

export = svgify ;
