import { Mesh } from 'gl2d/drawable/mesh';
import { Rect } from 'gl2d/struct/rect';
import { Mat2d, ScaleToFit } from 'gl2d/struct/mat2d';
import { VertexBuffer } from 'gl2d/struct/vertex';
import * as stream from 'stream';
import * as through2 from 'through2';
import * as File from 'vinyl';

interface MeshData {
    type?: string;
    vertices?: number[];
    indices?: number[];
    path?: number[][];
}

interface Polygon extends MeshData {
    sides?: number;
    hasFlatTop?: boolean;
}

interface Star extends MeshData {
    points: number;
    ratio: number;
}

function svgify(): stream.Transform{
    return through2.obj(function (file: File, encoding, callback) {
        
        // Extract mesh vertices from .json file
        let mesh = JSON.parse(file.contents.toString()) as MeshData;
        let vertices: VertexBuffer;

        if(mesh.vertices){
            vertices = new VertexBuffer(new Float32Array(mesh.vertices));
        } else {
            switch(mesh.type){
                case "polygon":
                    let { sides, hasFlatTop } = mesh as Polygon;
                    if(sides){
                        vertices = Mesh.polygonVertices(sides, hasFlatTop);
                    }
                    break;
                case "star":
                    let { points, ratio } = mesh as Star;
                    if(points && ratio){
                        vertices = Mesh.starVertices(points, ratio);
                    }
                    break;
                default:
                    throw new Error(`Insufficient vertex data in ${file.path}`);
            }
        }

        // Flip mesh horizontally because svg origin is at top left
        vertices.transform(Mat2d.scale(1, -1)); 

        // Center mesh in rect with width = 512, height = 512
        let src = vertices.measureBoundaries();
        let dst = Rect.lrbt(0, 512, 0, 512);
        vertices.transform(Mat2d.rectToRect(src, dst, ScaleToFit.Center));

        // Convert vertices to svg path
        let path = "";

        if(mesh.path){
            mesh.path.forEach(poly => {
                path += "M";
                poly.forEach(index => {
                    vertices.moveToPosition(index);
                    path += `${vertices.x},${vertices.y} `;
                })
            })
        } else {
            path += "M"
            vertices.moveToPosition(-1);
            while(vertices.moveToNext()){
                path += `${vertices.x},${vertices.y} `;
            }
        }

        // Output svg file
        let svg = 
`<?xml version="1.0" ?>
<svg width="${dst.width()}" height="${dst.height()}" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
<g>
    <path d="${path}"/>
</g>
</svg>`

        file.contents = new Buffer(svg);
        callback(null, file);
    });
};

export = svgify ;
