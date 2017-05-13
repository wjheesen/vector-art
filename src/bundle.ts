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

currentTool = shapeTool;

$("#shape-button").click(function(){
    currentTool = shapeTool;
})

$("#line-button").click(function(){
    currentTool = lineTool;
})

$("#ellipse-button").click(function(){
    currentTool = ellipseTool;
})

$("#pan-button").click(function(){
    currentTool = panTool;
})

$("#aspect-button").click(function(){
    surface.renderer.maintainAspect = !surface.renderer.maintainAspect;
})

$("#select-button").click(function(){
    currentTool = selectTool;
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

