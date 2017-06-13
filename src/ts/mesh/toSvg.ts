import { Mesh } from "gl2d/mesh/mesh";
import { SprayMesh } from "./spray";
import { Mat2d, ScaleToFit} from "gl2d/struct/mat2d";
import { Rect } from 'gl2d/struct/rect';
import { Point } from 'gl2d/struct/point';

/**
 * Creats an SVG from a mesh.
 */
export function toSvg(mesh: Mesh) {
    return `
<?xml version="1.0" ?>
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
<g>
    <path d="${getPath(mesh)}"/>
</g>
</svg>`;
}

export function getPath(mesh: Mesh){
    let matrix = Mat2d.rectToRect(mesh.bounds, Rect.lrbt(0, 512, 0, 512), ScaleToFit.Center);
    let pt = new Point();
    let path = "";
    let vertices = mesh.vertices;
    vertices.moveToFirst();

    if(mesh instanceof SprayMesh){
        mesh = mesh.shapeMesh;
    }

    let vertexCount = mesh.vertices.capacity();
    while(vertices.hasValidPosition()){
        path += "M";
        for(let i = 0; i<vertexCount; i++){
            vertices.rget(pt);
            matrix.map(pt, pt);
            path += `${pt.x},${pt.y} `;
        }
    }

    return path;
}