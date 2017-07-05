import { ColorStruct } from 'gl2d/struct/color';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2dStruct, Mat2dBuffer } from 'gl2d/struct/mat2d';
import { VertexBuffer } from 'gl2d/struct/vertex';

export function expandColorF(buffer?: ArrayBuffer){
    return buffer? ColorFStruct.fromColor(new ColorStruct(new Uint8Array(buffer))) : null;
}

export function compressColorF(colorF?: ColorFStruct){
    return colorF? ColorStruct.fromColorF(colorF).data.buffer: null;
}

export function expandMat2d(buffer?: ArrayBuffer){
    return buffer? new Mat2dStruct(new Float32Array(buffer)) : null;
}

export function expandMat2dBuffer(buffer?: ArrayBuffer){
    return buffer? new Mat2dBuffer(new Float32Array(buffer)) : null;
}

export function expandVertexBuffer(buffer?: ArrayBuffer){
    return buffer? new VertexBuffer(new Float32Array(buffer)) : null;
}