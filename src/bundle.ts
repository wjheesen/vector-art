import { ShapeStrokeTool } from './tool/shapeStroke';
import { Option } from './option/option';
import { CursorDialog } from './dialog/cursor';
import { StrokeDialog } from './dialog/stroke';
import { ShapeDialog, ShapeType } from './dialog/shape';
import { StrokeTool } from './tool/stroke';
import { SelectTool } from './tool/select';
import { LineTool } from './tool/line';
import { ShapeTool } from './tool/shape';
import { ScrollZoomTool } from 'gl2d/tool/scrollZoom';
import { PinchZoomTool } from 'gl2d/tool/pinchZoom';
import { PanTool } from 'gl2d/tool/pan';
import { Surface } from './rendering/surface'
import { _MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { ColorPicker } from "./component/colorPicker";
import { Status } from "gl2d/action/status";
import * as $ from 'jquery';
(<any> window).jQuery = $;
import * as tether from 'tether';
(<any> window).Tether = tether;
import 'bootstrap';

let surface = Surface.create("canvas");

type ToolType = "shape" | "stroke" | "cursor";
let toolType = Option.str("tool", "shape") as Option<ToolType>;

let currentTool: _MouseOrTouchTool;
let shapeTool = new ShapeTool();
let lineTool = new LineTool();
let sprayCan = new ShapeStrokeTool();
let brush = new StrokeTool();
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

function setToolType(type: ToolType){
    $(`#${toolType.val}-button`).children("i").addClass("md-inactive")
    $(`#${type}-button`).children("i").removeClass("md-inactive");
    toolType.val = type;
}

function setShapeType(type: ShapeType){
    let renderer = surface.renderer;
    let meshes = renderer.meshes;
    renderer.mesh = meshes[type];
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

let shapeDialog = ShapeDialog.create("#shape-button", 
    aspect => { 
        surface.renderer.maintainAspect = aspect 
    },
    shape => {
        setTool(shapeTool);
        setToolType("shape");
        setShapeType(shape);
    }
);

StrokeDialog.create("#stroke-button", 
    thickness => {
        surface.renderer.lineThickness = thickness/1000;
    }, 
    strokeType => {
        setToolType("stroke");
        switch(strokeType){
            case "brush":
                return setTool(brush);
            case "line":
                return setTool(lineTool);
            case "spray-can":
                return setTool(sprayCan);
        }
    }
)

CursorDialog.create("#cursor-button", toolType =>{
    setToolType("cursor");
    switch(toolType){
        case "select":
            return setTool(selectTool);
        case "pan":
            return setTool(panTool);
    }
})

// Set initial mesh
setShapeType(shapeDialog.shape.val);

// Set initial tool
$(`#${toolType.val}-button`).click();

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

