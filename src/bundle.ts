import { ShapeStrokeTool } from './tool/shapeStroke';
import { ShapeLineTool } from './tool/shapeLine';
import { ShapeSprayTool } from './tool/shapeSpray';
import { OtherSettings } from './settings/other';
import { ToolSettings} from './settings/tool';
import { ShapeSettings } from './settings/shape';
import { StrokeTool } from './tool/stroke';
import { SelectTool } from './tool/select';
import { LineTool } from './tool/line';
import { ShapeTool } from './tool/shape';
import { ScrollZoomTool } from 'gl2d/tool/scrollZoom';
import { PinchZoomTool } from 'gl2d/tool/pinchZoom';
import { PanTool } from 'gl2d/tool/pan';
import { Surface } from './rendering/surface'
import { _MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { ColorSettings } from "./settings/color";
import { Status } from "gl2d/action/status";
import * as $ from 'jquery';
(<any> window).jQuery = $;
import * as tether from 'tether';
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
let scrollZoomTool = new ScrollZoomTool(1.5);
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
        selection.color.set(drawColor);
        surface.requestRender();
    }
});

ShapeSettings.create(type => {
    let renderer = surface.renderer;
    let meshes = renderer.meshes;
    renderer.mesh = meshes[type];
});

// TODO: add shape-aspect tool with ellipse-rectangle vs circle-square icon
ToolSettings.create(type => {
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

OtherSettings.create(thickness => {
    surface.renderer.lineThickness = thickness/1000;
});

$("#undo").click(function(){
    let renderer = surface.renderer;
    let selection = renderer.selection.target;
    if(renderer.drawables.length > 0){ 
        if(selection){
            renderer.removeDrawable(selection);
            selectTool.onDetach(surface);
        } else {
            renderer.removeDrawable();
            surface.requestRender();
        }
    } 
})

$("#redo").click(function(){
    let renderer = surface.renderer;
    let removed = renderer.removed;
    if(removed.length > 0){
        renderer.drawables.push(removed.pop());
        surface.requestRender();
    }  
})

let key: string;

$(document)
    .on("keydown", e => {
        key = String.fromCharCode(e.which);
    })
    .on("keyup", e => {
        key = null;
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
        if (!key) { return; }
        switch(key){
            case "R":
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

