import { Surface } from './rendering/surface';
import { ColorSettings } from './settings/color';
import { OtherSettings } from './settings/other';
import { ShapeSettings } from './settings/shape';
import { ToolSettings } from './settings/tool';
import { LineTool } from './tool/line';
import { ScrollZoomTool } from 'gl2d/tool/scrollZoom';
import { SelectTool } from './tool/select';
import { ShapeTool } from './tool/shape';
import { ShapeLineTool } from './tool/shapeLine';
import { ShapeSprayTool } from './tool/shapeSpray';
import { ShapeStrokeTool } from './tool/shapeStroke';
import { StrokeTool } from './tool/stroke';
import { _MouseOrTouchTool } from 'gl2d/tool/mouseOrTouch';
import { PanTool } from 'gl2d/tool/pan';
import { PinchZoomTool } from 'gl2d/tool/pinchZoom';
import * as $ from 'jquery';
import * as tether from 'tether';
(<any> window).jQuery = $;
(<any> window).Tether = tether;
import 'bootstrap';

let surface = Surface.create("canvas");

let currentTool: _MouseOrTouchTool;
let shapeTool = new ShapeTool();
let lineTool = new LineTool();
let shapeSprayTool = new ShapeSprayTool();
let shapeLineTool = new ShapeLineTool();
let shapeStrokeTool = new ShapeStrokeTool();
let strokeTool = new StrokeTool();
let scrollZoomTool = new ScrollZoomTool(1.5, 5);
let pinchZoomTool = new PinchZoomTool();
let panTool = new PanTool();
let selectTool = new SelectTool();

function setTool(tool: _MouseOrTouchTool){
    if(currentTool !== tool){
        if(currentTool === selectTool ){
            selectTool.onDetach(surface);
        }
        currentTool = tool;
    }
}

let colorPicker = ColorSettings.create(color => {
    let renderer = surface.renderer;
    let drawColor = renderer.color;
    let selection = renderer.selection.target;
    // Update draw color
    drawColor.setFromColor(color);
    // Update color of selection (if any)
    if(selection){
        renderer.setDrawableColor(selection, drawColor);
        surface.requestRender();
    }
});

ShapeSettings.create(type => {
    let renderer = surface.renderer;
    let meshes = renderer.meshes;
    renderer.mesh = meshes[type];
});

// TODO: add shape-aspect tool with ellipse-rectangle vs circle-square icon
let toolSettings = ToolSettings.create(type => {
    switch(type){
        case "shape-aspect":
            shapeTool.maintainAspect.val = true;
            return setTool(shapeTool);
        case "shape":
            shapeTool.maintainAspect.val = false;
            return setTool(shapeTool);
        case "stroke":
            return setTool(strokeTool);
        case "shape-stroke":
            return setTool(shapeStrokeTool);
        case "line":
            return setTool(lineTool);
        case "shape-line":
            return setTool(shapeLineTool);
        case "shape-spray":
            return setTool(shapeSprayTool);
        case "pan":
            return setTool(panTool);
        case "select":
            return setTool(selectTool);
    }
});

OtherSettings.create(
    thickness => {
        surface.renderer.lineThickness = thickness/1000;
    },
    zoomSpeed => {
        scrollZoomTool.scaleFactor = 1 + zoomSpeed/100;
    }
);

function undo(){
    let renderer = surface.renderer;
    if(renderer.undoLastAction()){
        selectTool.onDetach(surface);
    }
}

function redo(){
    let renderer = surface.renderer;
    if(renderer.redoLastUndo()){
        selectTool.onDetach(surface);
    }
}

$("#undo").click(undo)

$("#redo").click(redo)

let key: string;

$(document)
    .on("keydown", e => {
        key = String.fromCharCode(e.which);
    })
    .on("keyup", e => {
        if (key) {
            if(e.metaKey || e.ctrlKey){
                // Ctrl + key
                switch(key){
                    case "Z": undo(); break;
                    case "Y": redo(); break;
                }
            } else {
                switch(key){
                    case "R": colorPicker.pickRandom(); break;
                    case "S": toolSettings.pickToolType("select"); break;
                    case "P": toolSettings.pickToolType("pan"); break;
                }
            }
            key = null;
        }

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
    // .on("keypress", e => {

    // })


surface.onScrollAction(action => {
    scrollZoomTool.onAction(action);
    // TODO: interrupt other tools?
})

surface.onMouseAction(action =>{
    let event = action.src;
    switch(event.button){
        case 0: /*Left*/
            // Ctrl not held
            currentTool.onAction(action);
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

