import { StrokeTool } from './tool/stroke';
import { SelectTool } from './tool/select';
import { EllipseTool } from './tool/ellipse';
import { LineTool } from './tool/line';
import { ShapeTool } from './tool/shape';
import { ScrollZoomTool } from 'gl2d/tool/scrollZoom';
import { PinchZoomTool } from 'gl2d/tool/pinchZoom';
import { PanTool } from 'gl2d/tool/pan';
import { Surface } from './rendering/surface'
import { _MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { ColorPicker } from "./component/colorPicker";
import * as $ from 'jquery';
import { Status } from "gl2d/action/status";

let surface = Surface.create("canvas");

let currentTool: _MouseOrTouchTool;
let shapeTool = new ShapeTool();
let lineTool = new LineTool();
let ellipseTool = new EllipseTool();
let scrollZoomTool = new ScrollZoomTool(1.5);
let pinchZoomTool = new PinchZoomTool();
let panTool = new PanTool();
let selectTool = new SelectTool();
let brush = new StrokeTool();

setTool(shapeTool);

function setTool(tool: _MouseOrTouchTool){
    if(currentTool !== tool){
        if(currentTool === selectTool ){
            selectTool.onDetach(surface);
        }
        currentTool = tool;
    }
}

let colorPicker = ColorPicker.create("#color-picker", color => {
    let renderer = surface.renderer;
    let drawColor = renderer.color;
    let selection = renderer.selection.target;
    // Update draw color
    drawColor.setFromColor(color);
    // Update color of selection (if any)
    if(selection){
        selection.color.set(drawColor);
        surface.requestRender();
    }
});

$("#shape-button").click(function(){
    setTool(shapeTool);
})

$("#line-button").click(function(){
    setTool(lineTool);
})

$("#ellipse-button").click(function(){
    setTool(ellipseTool);
})

$("#brush-button").click(function(){
    setTool(brush);
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
    let selection = renderer.selection.target;
    if(drawables.length > 0){
        if(selection){
            renderer.removeDrawable(selection);
            selectTool.onDetach(surface);
        } else {
            drawables.pop();
            surface.requestRender();
        }
    }
})

let key = -1;
$(document)
    .on("keydown", e => {
        key = e.which;
    })
    .on("keyup", e => {
        key = -1;
        if(e.which === 46 /* Delete */){
            let renderer = surface.renderer;
            let selection = renderer.selection.target;
            if(selection){
                renderer.removeDrawable(selection);
                selectTool.onDetach(surface);
                surface.requestRender();
            }
        }
    })
    .on("keypress", e => {
        if (key === -1) { return; }
        switch(String.fromCharCode(key).toLowerCase()){
            case "r":
                return colorPicker.pickRandom();
        }
    })


surface.onScrollAction(action => {
    scrollZoomTool.onAction(action);
    // TODO: interrupt other tools?
})

let isCtrlHeld = false;

surface.onMouseAction(action =>{
    let event = action.src;
    switch(event.button){
        case 0: /*Left*/

            if(isCtrlHeld){
                // Ctrl previously held
                isCtrlHeld = event.metaKey || event.ctrlKey;
                if(isCtrlHeld){
                    // Ctrl still held
                    selectTool.onAction(action);
                } else {
                    // Ctrl no longer held
                    selectTool.onDetach(action.target);
                }
            } else {
                // Ctrl not previously held
                switch(action.status){
                    case Status.Start:
                    case Status.Move:
                        isCtrlHeld = event.metaKey || event.ctrlKey;
                        break;
                }

                if(isCtrlHeld){
                    // Ctrl held for first time
                    selectTool.onAction(action);
                } else {
                    // Ctrl not held
                    currentTool.onAction(action);
                }
            }
            break;
        case 1: /*Wheel*/
            return panTool.onAction(action);
            // TODO: interrupt other tools
        case 2: /*Right*/
            return;
    }
})

surface.onTouchAction(action => {
    if(action.pointers.length < 2){
        currentTool.onAction(action);
    } else {
        pinchZoomTool.onAction(action);
        // TODO: interrupt other tools
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

