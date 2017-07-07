
import { Color } from 'gl2d/struct/color';
import { _MouseOrTouchTool } from 'gl2d/tool/mouseOrTouch';
import { PanTool } from 'gl2d/tool/pan';
import { PinchZoomTool } from 'gl2d/tool/pinchZoom';
import { WheelZoomTool } from 'gl2d/tool/wheelZoom';
import { Option } from './option/option';
import { Surface } from './rendering/surface';
import { ColorSetter } from './setter/color';
import { CursorSetter } from './setter/cursor';
import { MeshSetter } from './setter/mesh';
import { OtherSetter } from './setter/other';
import { ToolSetter } from './setter/tool';
import { EditTool } from './tool/edit';
import { ToolGroup } from './tool/group';
import { LineTool } from './tool/line';
import { NavigationTool } from './tool/navigation';
import { ShapeTool } from './tool/shape';
import { ShapeAspectTool } from './tool/shapeAspect';
import { ShapeLineTool } from './tool/shapeLine';
import { ShapeSprayTool } from './tool/shapeSpray';
import { ShapeStrokeTool } from './tool/shapeStroke';
import { StrokeTool } from './tool/stroke';
import * as $ from 'jquery';
import * as tether from 'tether';
(<any> window).jQuery = $;
(<any> window).Tether = tether;
import 'bootstrap';

let settings = {
    tool: Option.str("tool", "shape"),
    cursor: Option.str("cursor", null),
    mesh:  Option.str("mesh", "triangle"),
    fillColor: Option.str("fillColor", "#ff274e13"),
    strokeColor: Option.str("strokeColor", "#ff000000"),
    lineWidth: Option.num("line-width", 50, 0, 100),
    zoomSpeed: Option.num("zoom-speed", 50, 1, 100),
}

let surface = Surface.create();

let currentTool: _MouseOrTouchTool;

let wheelZoomTool = new WheelZoomTool(1.5, 5);
let pinchZoomTool = new PinchZoomTool();
let navigationTool = new NavigationTool();

let tools: ToolGroup = {
    shape: new ShapeTool(),
    shapeAspect: new ShapeAspectTool(), 
    line: new LineTool(),
    shapeSpray: new ShapeSprayTool(),
    shapeLine: new ShapeLineTool(),
    shapeStroke: new ShapeStrokeTool(),
    stroke: new StrokeTool(),
}

let panTool = new PanTool();
let editTool = new EditTool();

function setTool(tool: _MouseOrTouchTool){
    if(currentTool !== tool){
        if(currentTool === editTool ){
            editTool.onDetach(surface);
        }
        currentTool = tool;
    }
}

function setFillColor(color: Color){
    settings.fillColor.val = color.toArgbString();
    surface.setFillColor(color);
}

function setStrokeColor(color: Color){
    settings.strokeColor.val = color.toArgbString();
    surface.setStrokeColor(color);
}

function undo(){
    if(surface.undoLastAction()){
        editTool.onDetach(surface);
    }
}

function redo(){
    if(surface.redoLastUndo()){
        editTool.onDetach(surface);
    }
}

let fillColorSetter = ColorSetter.create("fill-color", settings.fillColor.val, setFillColor);
let strokeColorSetter = ColorSetter.create("stroke-color", settings.strokeColor.val, setStrokeColor);

MeshSetter.create(settings.mesh.val, mesh => {
    settings.mesh.val = mesh;
    surface.setMesh(mesh);
});

let toolSetter = ToolSetter.create(settings.tool.val, tool => {
    settings.tool.val = tool;
    setTool(tools[tool]);
});

let cursorSetter = CursorSetter.create(settings.cursor.val, cursor => {
    settings.cursor.val = cursor;
    switch(cursor){
        case "pan": 
            setTool(panTool);
            break;
        case "edit": 
            setTool(editTool);
            break;
        default: 
            setTool(tools[settings.tool.val]);
            break;
    }
})

toolSetter.onMenuOpen = () => {
    cursorSetter.disableCursor();
}

OtherSetter.create(
    settings.lineWidth.val,
    settings.zoomSpeed.val,
    lineWidth => {
        settings.lineWidth.val = lineWidth;
        surface.setLineWidth(lineWidth/1000);
    },
    zoomSpeed => {
        settings.zoomSpeed.val = zoomSpeed;
        wheelZoomTool.scaleFactor = 1 + zoomSpeed/100;
    }
);

$("#actions > button").click(function(){
    // Invoke action corresponding to button id
    switch($(this).attr("id")){
        case "undo":
            undo();
            break;
        case "redo":
            redo();
            break;
        case "paste":
            surface.paste();
            break;
        case "remove":
            if(!removeSelection()){
                surface.clearCanvas();
            } 
            break;
    }
    // Render to show changes
    surface.requestRender();
})

$("#edit-actions > button").click(function(){
    // Get selected drawable
    let drawable = surface.renderer.selection.target;
    if(!drawable) { return ;}
    // Invoke action corresponding to button id
    switch($(this).attr("id")){
        case "copy":
            surface.copy(drawable);
            return; // No need to re-render
        case "moveToBack":
            surface.moveToBack(drawable);
            break;
        case "moveBackward":
            surface.moveBackward(drawable);
            break;
        case "moveForward": 
            surface.moveForward(drawable);
            break;
        case "moveToFront":
            surface.moveToFront(drawable);
            break;
        case "remove":
            surface.remove(drawable);
            editTool.onDetach(surface);
            break;
    }
    // Render to show changes
    surface.requestRender();
})

surface.onWheelEvent(event => {
    wheelZoomTool.onSurfaceEvent(event);
    // TODO: interrupt other tools?
})

surface.onMouseEvent(event =>{
    switch(event.src.button){
        case 0: /*Left*/
            // Ctrl not held
            navigationTool.onSurfaceEvent(event);
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
        navigationTool.onSurfaceEvent(event);
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

// TODO: cleanup and move to separate file
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
                    case "R": fillColorSetter.setRandomColor(); break;
                    case "T": strokeColorSetter.setRandomColor(); break;
                }
            }
            key = null;
        }

        if(e.which === 46 /* Delete */){
            removeSelection();
        }
    })

function removeSelection(){
    let selection = surface.renderer.selection.target;
    if(selection){
        surface.remove(selection);
        editTool.onDetach(surface);
        surface.requestRender();
    }
    return selection;
}