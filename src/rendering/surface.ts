import { Renderer } from './renderer'
import { Surface as Base } from 'gl2d/rendering/surface'
import { Camera } from "gl2d/rendering/camera";
import { RectStruct } from 'gl2d/struct/rect';
import { IPoint } from "gl2d/struct/point";

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
        let camera = new Camera(RectStruct.create$(-1,1,1,-1), 1.0, 1000);
        let renderer = new Renderer(gl, camera);
        return new Surface(drawingBuffer, renderer);
    }

    zoomIn(desiredScaleFactor: number){
        let result = super.zoomIn(desiredScaleFactor);
        this.scaleFramesAndControlPoints(1/result);
        return result;
    }

    zoomOut(desiredScaleFactor: number){
        let result = super.zoomOut(desiredScaleFactor);
        this.scaleFramesAndControlPoints(1/result);
        return result;
    }

    zoomToPoint(desiredScaleFactor: number, focus: IPoint){
        let result = super.zoomToPoint(desiredScaleFactor, focus);
        this.scaleFramesAndControlPoints(1/result.scaleFactor);
        return result;
    }

    private scaleFramesAndControlPoints(scale: number){
        this.renderer.hover.frame.thickness *= scale;
        this.renderer.selection.frame.thickness *= scale;
        this.renderer.selection.pivot.stretch(scale);
        this.renderer.selection.control.stretch(scale);
    }
}