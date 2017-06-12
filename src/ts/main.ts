import { ShapeAspectTool } from './tool/shapeAspect';
import { ToolGroup } from './tool/group';
import { ColorSampler } from './tool/colorSampler';
import { ColorLike } from 'gl2d/struct/color';
import { Surface } from './rendering/surface';
import { ColorSettings } from './settings/color';
import { OtherSettings } from './settings/other';
import { ShapeSettings } from './settings/shape';
import { ToolSettings } from './settings/tool';
import { LineTool } from './tool/line';
import { WheelZoomTool } from 'gl2d/tool/wheelZoom';
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

let surface = Surface.create();

let currentTool: _MouseOrTouchTool;

function setTool(tool: _MouseOrTouchTool){
    if(currentTool !== tool){
        if(currentTool === selectTool ){
            selectTool.onDetach(surface);
        }
        currentTool = tool;
    }
}

function setDrawColor(color: ColorLike){
    let { drawColor, renderer } = surface;
    let { target } = renderer.selection;
    // Modify draw color
    drawColor.setFromColor(color);
    // Modify color of selected drawable (if any)
    if(target){
        target.color.set(drawColor);
        surface.recordColorChange(target, drawColor);
        surface.requestRender();
    }
}

function undo(){
    if(surface.undoLastAction()){
        selectTool.onDetach(surface);
    }
}

function redo(){
    if(surface.redoLastUndo()){
        selectTool.onDetach(surface);
    }
}

let colorPicker = ColorSettings.create(setDrawColor);

ShapeSettings.create(type => {
    surface.mesh = surface.getMesh(type);
});

let selectTool = new SelectTool();
let wheelZoomTool = new WheelZoomTool(1.5, 5);
let pinchZoomTool = new PinchZoomTool();

let tools: ToolGroup = {
    shape: new ShapeTool(),
    shapeAspect: new ShapeAspectTool(), 
    line: new LineTool(),
    shapeSpray: new ShapeSprayTool(),
    shapeLine: new ShapeLineTool(),
    shapeStroke: new ShapeStrokeTool(),
    stroke: new StrokeTool(),
    colorSampler: new ColorSampler(color => colorPicker.pickColorF(color)),
    pan: new PanTool(),
    select: selectTool,
}

// TODO: add shape-aspect tool with ellipse-rectangle vs circle-square icon
let toolSettings = ToolSettings.create(type => {
    setTool(tools[type]);
});

OtherSettings.create(
    thickness => {
        surface.lineWidth = thickness/1000;
    },
    zoomSpeed => {
        wheelZoomTool.scaleFactor = 1 + zoomSpeed/100;
    }
);

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
                surface.removeDrawable(selection);
                selectTool.onDetach(surface);
                surface.requestRender();
            }
        }
    })


surface.onWheelEvent(event => {
    wheelZoomTool.onSurfaceEvent(event);
    // TODO: interrupt other tools?
})

surface.onMouseEvent(event =>{
    switch(event.src.button){
        case 0: /*Left*/
            // Ctrl not held
            currentTool.onSurfaceEvent(event);
            break;
        case 1: /*Wheel*/
            return tools.pan.onSurfaceEvent(event);
            // TODO: interrupt other tools
        case 2: /*Right*/
            return;
    }
})

surface.onTouchEvent(event => {
    if(event.pointers.length < 2){
        currentTool.onSurfaceEvent(event);
    } else {
        pinchZoomTool.onSurfaceEvent(event);
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

