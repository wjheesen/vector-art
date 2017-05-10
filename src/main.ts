import { Camera } from 'gl2d/rendering/camera';
import { Rect } from 'gl2d/struct/rect';
import { ScrollZoomTool } from 'gl2d/tool/scrollZoom';
import { PinchZoomTool } from 'gl2d/tool/pinchZoom';
import { PanTool } from 'gl2d/tool/pan';
import { Surface } from './surface'
import { Renderer } from './renderer'

// TODO: color.setRandom(), shape tool, ellipse tool, line tool > gl2d

let canvas =  document.getElementById("canvas") as HTMLCanvasElement;
let gl = canvas.getContext('webgl')

let camera = new Camera(Rect.Obj.create$(-1,1,1,-1), 0.5, 10)
let renderer = new Renderer(gl, camera)
let surface = new Surface(canvas, renderer)

let scrollZoomTool = new ScrollZoomTool(1.5);
let pinchZoomTool = new PinchZoomTool();
let panTool = new PanTool();

surface.onScrollAction(action => {
    scrollZoomTool.onAction(action);
})

surface.onMouseAction(action =>{
    panTool.onAction(action);
})

surface.onTouchAction(action => {
    if(action.pointers.length < 2){
        panTool.onAction(action);
    } else {
        pinchZoomTool.onAction(action);
    }
})

/**
* Checks each frame if the canvas needs to be re-rendered.
*/
function checkRender() {
    // Resize surface if necessary
    surface.resize()
    // Notify surface of animation frame
    surface.onAnimationFrame()
    // Keep calling this function every frame
    requestAnimationFrame(checkRender);
}

// Start the loop
checkRender();

