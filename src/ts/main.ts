import { ColorSampler } from './tool/colorSampler';
import { IColor } from 'gl2d/struct/color';
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

function setDrawColor(color: IColor){
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
    let renderer = surface.renderer;
    if(type === "ellipse"){
        surface.mesh = renderer.ellipseProgram.mesh;
    } else {
        surface.mesh = renderer.meshes.find(mesh => mesh.id === type);
    }
});

let shapeTool = new ShapeTool();
let lineTool = new LineTool();
let shapeSprayTool = new ShapeSprayTool();
let shapeLineTool = new ShapeLineTool();
let shapeStrokeTool = new ShapeStrokeTool();
let strokeTool = new StrokeTool();
let scrollZoomTool = new WheelZoomTool(1.5, 5);
let pinchZoomTool = new PinchZoomTool();
let colorSampler = new ColorSampler(color => colorPicker.pickColorF(color));
let panTool = new PanTool();
let selectTool = new SelectTool();

// TODO: add shape-aspect tool with ellipse-rectangle vs circle-square icon
let toolSettings = ToolSettings.create(type => {
    // TODO: change to map<string,tool>
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
        case "color-sampler":
            return setTool(colorSampler);
        case "pan":
            return setTool(panTool);
        case "select":
            return setTool(selectTool);
    }
});

OtherSettings.create(
    thickness => {
        surface.lineWidth = thickness/1000;
    },
    zoomSpeed => {
        scrollZoomTool.scaleFactor = 1 + zoomSpeed/100;
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
    scrollZoomTool.onSurfaceEvent(event);
    // TODO: interrupt other tools?
})

surface.onMouseEvent(event =>{
    switch(event.src.button){
        case 0: /*Left*/
            // Ctrl not held
            currentTool.onSurfaceEvent(event);
            break;
        case 1: /*Wheel*/
            return panTool.onSurfaceEvent(event);
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

