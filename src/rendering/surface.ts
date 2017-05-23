import { Renderer } from './renderer'
import { Surface as Base } from 'gl2d/rendering/surface'
import { Camera } from "gl2d/rendering/camera";
import { Rect } from "gl2d/struct/rect";

export class Surface extends Base<Renderer> {

    static create(canvas: string | HTMLCanvasElement){
        let drawingBuffer: HTMLCanvasElement;
        if(canvas instanceof HTMLCanvasElement){
            drawingBuffer = canvas;
        } else {
            // Assume string is id of canvas
            drawingBuffer = document.getElementById(canvas) as HTMLCanvasElement;
        }
        let gl = drawingBuffer.getContext('webgl');
        let camera = new Camera(Rect.create$(-1,1,1,-1), 1.0, 1000);
        let renderer = new Renderer(gl, camera);
        return new Surface(drawingBuffer, renderer);
    }

}