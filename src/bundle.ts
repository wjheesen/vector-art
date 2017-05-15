import { SelectTool } from './tool/select';
import { EllipseTool } from './tool/ellipse';
import { LineTool } from './tool/line';
import { ShapeTool } from './tool/shape';
import { Camera } from 'gl2d/rendering/camera';
import { Rect } from 'gl2d/struct/rect';
import { ScrollZoomTool } from 'gl2d/tool/scrollZoom';
import { PinchZoomTool } from 'gl2d/tool/pinchZoom';
import { PanTool } from 'gl2d/tool/pan';
import { Surface } from './surface'
import { Renderer } from './renderer'
import { _MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import * as $ from 'jquery';
(<any> window).jQuery = $;
import * as tether from 'tether';
(<any> window).Tether = tether;
import 'bootstrap';


let canvas =  document.getElementById("canvas") as HTMLCanvasElement;

let gl = canvas.getContext('webgl')

let camera = new Camera(Rect.create$(-1,1,1,-1), 1, 1000);
let renderer = new Renderer(gl, camera)
let surface = new Surface(canvas, renderer)
let currentTool: _MouseOrTouchTool;

let shapeTool = new ShapeTool();
let lineTool = new LineTool();
let ellipseTool = new EllipseTool();
let scrollZoomTool = new ScrollZoomTool(1.5);
let pinchZoomTool = new PinchZoomTool();
let panTool = new PanTool();
let selectTool = new SelectTool();

setTool(shapeTool);

function setTool(tool: _MouseOrTouchTool){
    if(currentTool !== tool){
        if(currentTool === selectTool ){
            selectTool.onDetach(surface);
        }
        currentTool = tool;
    }
}

$("#shape-button").click(function(){
    setTool(shapeTool);
})

$("#line-button").click(function(){
    setTool(lineTool);
})

$("#ellipse-button").click(function(){
    setTool(ellipseTool);
})

$("#pan-button").click(function(){
    setTool(panTool);
})

$("#select-button").click(function(){
    setTool(selectTool);
})

$("#aspect-button").click(function(){
    surface.renderer.maintainAspect = !surface.renderer.maintainAspect;
})

$("#delete-button").click(function(){
    let renderer = surface.renderer;
    let drawables = renderer.drawables;
    if(drawables.length > 0){
        if(currentTool === selectTool && selectTool.selection){
            renderer.drawables = drawables.filter(drawable =>{
                return drawable !== selectTool.selection;
            })
            selectTool.onDetach(surface);
        } else {
            drawables.pop();
            surface.requestRender();
        }
    }
})

surface.onScrollAction(action => {
    scrollZoomTool.onAction(action);
})

surface.onMouseAction(action =>{
    switch(action.src.button){
        case 0: /*Left*/
            surface.renderer.color.setRandom();
            return currentTool.onAction(action);
        case 1: /*Wheel*/
            return panTool.onAction(action);
        case 2: /*Right*/
            return;
    }
})

surface.onTouchAction(action => {
    if(action.pointers.length < 2){
        surface.renderer.color.setRandom();
        currentTool.onAction(action);
    } else {
        pinchZoomTool.onAction(action);
    }
})

/**
* Checks each frame if any canvas needs to be re-rendered.
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

