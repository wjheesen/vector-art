import { Action } from '../action/action';
import { SetFillColorAction } from '../action/setFillColor';
import { AddDrawableAction } from '../action/addDrawable';
import { ActionStack } from '../action/stack';
import { RemoveDrawableAction } from '../action/removeDrawable';
import { ClearCanvasAction } from '../action/clearCanvas';
import { TransformDrawableAction } from '../action/transformDrawable';
import { MoveForwardAction } from '../action/moveForward';
import { MoveBackwardAction } from '../action/moveBackward';
import { Database } from '../database/database';
import { Drawable } from '../drawable/drawable';
import { Ellipse } from '../drawable/ellipse';
import { EllipseBatch } from '../drawable/ellipseBatch';
import { Line } from '../drawable/line';
import { Shape, ShapeOptions } from '../drawable/shape';
import { ShapeBatch, ShapeBatchOptions } from '../drawable/shapeBatch';
import { Stroke } from '../drawable/stroke';
import { Renderer } from './renderer';
import { Mesh } from 'gl2d/drawable/mesh';
import { Camera } from 'gl2d/rendering/camera';
import { Surface as Base } from 'gl2d/rendering/surface';
import { ColorStruct, ColorLike } from 'gl2d/struct/color';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2d, Mat2dBuffer } from 'gl2d/struct/mat2d';
import { PointLike } from 'gl2d/struct/point';
import { RectStruct } from 'gl2d/struct/rect';
import { VertexBuffer } from 'gl2d/struct/vertex';
import lastIndexOf = require('lodash.lastindexof');
import { Option } from "../option/option";
import { expandColorF, expandMat2d, expandMat2dBuffer, expandVertexBuffer } from "../database/compression";
import { SetStrokeColorAction } from "../action/setStrokeColor";
import { SetLineWidthAction } from "../action/setLineWidth";
import { MoveToBackAction } from "../action/moveToBack";
import { MoveToFrontAction } from "../action/moveToFront";


export class Surface extends Base<Renderer> {

    mesh: Mesh;
    fillColor = new ColorFStruct();
    strokeColor = new ColorFStruct();
    lineWidth: number;
    zIndex = 1;

    clipboard: Drawable;

    actionStack = new ActionStack();

    database = new Database();
    canvasId = Option.num("canvasId",1, 1, 0xffffffff);

    buffer = new Float32Array(25000); // 100kb

    static create(){
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        // Note: alpha option not supported before iOS 10
        let gl = canvas.getContext('webgl', { alpha: false });
        let camera = new Camera(RectStruct.create$(-1,1,1,-1), 0.5, 1000);
        let renderer = new Renderer(gl, camera);
        renderer.ext = gl.getExtension('ANGLE_instanced_arrays');
        let surface = new Surface(canvas, renderer);
        let canvasId = surface.canvasId.val;
        let database = surface.database;
        // Get canvas or create if none exists
        database.getCanvas(canvasId).then(canvas => {
            if(canvas){
                surface.importCanvas(canvas.id);
            } else {
                database.createCanvas().then(id => {
                    surface.canvasId.val = id;
                })
            }
        })
        return surface;
    }

    importCanvas(canvasId: number){
        this.canvasId.val = canvasId;
        let db = this.database;
        this.clear();

        db.types.toArray().then(types => {
            db.transaction("rw", db.types, db.shapes, db.shapeBatches, db.strokes, db.canvases, () => {

                // Import shapes
                db.shapes.where("canvasId").equals(canvasId).each(data => {
                    let type = types.find(t => t.id === data.typeId);

                    let options: ShapeOptions = {
                        mesh: this.getMesh(type.name),
                        fillColor: expandColorF(data.fillColor),
                        strokeColor: expandColorF(data.strokeColor),
                        lineWidth: data.lineWidth,
                        matrix:  expandMat2d(data.matrix),
                        zIndex: data.zIndex,
                        id: data.id,
                    }

                    let shape = type.name === "circle" ? new Ellipse(options) : new Shape(options);
                    this.addDrawable(shape)
                    this.requestRender();
                });
                
                // Import shape batches
                db.shapeBatches.where("canvasId").equals(canvasId).each(data => {
                    let type = types.find(t => t.id === data.typeId);

                    let options: ShapeBatchOptions = {
                        mesh: this.getMesh(type.name),
                        fillColor: expandColorF(data.fillColor),
                        matrices:  expandMat2dBuffer(data.matrices),
                        zIndex: data.zIndex,
                        id: data.id,
                    }

                    let batch = type.name === "circle" ? new EllipseBatch(options) : new ShapeBatch(options);
                    this.addDrawable(batch)
                    this.requestRender();
                });

                // Import strokes
                db.strokes.where("canvasId").equals(canvasId).each(data => {

                    let stroke = new Stroke({
                        fillColor: expandColorF(data.fillColor),
                        matrix: expandMat2d(data.matrix),
                        vertices: expandVertexBuffer(data.vertices),
                        zIndex: data.zIndex,
                        id: data.id,
                    })

                    this.addDrawable(stroke);
                    this.requestRender();
                });

                // Update last access time for this canvas
                db.canvases.update(canvasId, { lastAccessTime: Date.now()} );

            }).then(() => {
                let stack = this.renderer.drawables;
                if(stack.length > 0){
                    this.zIndex = stack[stack.length-1].zIndex;
                }
            });
        });
    }

    importCanvasOnLeft(){
        let { canvasId, database } = this;
        return database.canvases.where("id").below(canvasId.val).last()
            .then(canvas => {
                if(canvas){
                    this.importCanvas(canvas.id);
                } 
                return canvas;
            })
    }

    importCanvasOnRight(){
        let { canvasId, database } = this;
        return database.canvases.where("id").above(canvasId.val).first()
            .then(canvas =>{
                if(canvas){
                    this.importCanvas(canvas.id);
                }
                return canvas;
            })
    }

    addCanvas(){
        let { canvasId, database } = this;
        database.createCanvas().then(id => {
            canvasId.val = id;
            this.clear(); 
            this.requestRender();
        })
    }

    removeCanvas(){
        this.clear();
        let { canvasId, database } = this;
        database.removeCanvas(canvasId.val).then(() => {
            this.importCanvasOnLeft().then(canvas => {
                if(!canvas){
                    this.importCanvasOnRight().then(canvas => {
                        if(!canvas){
                            this.addCanvas();
                        }
                    })
                }
            })
        })
    }

    clearCanvas(){
        let { renderer, actionStack } = this;
        let { drawables } = renderer;
        if(drawables.length > 0){
            let action = new ClearCanvasAction(renderer.drawables);
            action.redo(this); // Does the actual clear
            actionStack.push(action);
        }
    }

    // TODO: rename so not confused with clearCanvas
    clear(){
        this.renderer.drawables.length = 0;
        this.actionStack.clear();
    }

     addDrawable(drawable: Drawable){
        let stack = this.renderer.drawables;
        let position = stack.length;
        // TODO: implement binary search?
        while(--position >= 0){
            if(drawable.zIndex > stack[position].zIndex){
                break;
            }
        }
        stack.splice(position+1, 0, drawable);
    }




    getDrawableContaining(point: PointLike){
        let drawables = this.renderer.drawables;
        for(let i = drawables.length - 1; i>=0; i--){
            let drawable = drawables[i];
            if(drawable.contains(point)){
                return drawable;
            }
        }
        return null;
    }

    getTempLine(){
        let { renderer } = this;
        let line = renderer.temp as Line;
        if(!line){
            renderer.temp = line = new Line({
                mesh: this.getMesh("square"),
                fillColor: this.copyFillColor(),
                zIndex: this.zIndex,
            });
        }
        return line;
    }

    getTempShape(){
        let { renderer } = this;
        let shape = renderer.temp as Shape;
        if(!shape){
            let { mesh, zIndex, lineWidth } = this;
            let options: ShapeOptions = {
                mesh: mesh,
                fillColor: this.copyFillColor(),
                strokeColor: this.copyStrokeColor(),
                zIndex: zIndex,
                lineWidth: lineWidth 
            }
            renderer.temp = shape = this.mesh.id === "circle" ? new Ellipse(options): new Shape(options);
        }
        return shape;
    }

    getTempShapeBatch(){
        let { renderer } = this;
        let batch = renderer.temp as ShapeBatch;
        if(!batch){
            let matrices = new Mat2dBuffer(this.buffer);
            matrices.capacity = matrices.position; // Hack

            let options: ShapeBatchOptions = {
                mesh: this.mesh,
                fillColor: this.copyFillColor(),
                matrices: matrices,
                zIndex: this.zIndex,
            }

            renderer.temp = batch = this.mesh.id === "circle" ? new EllipseBatch(options) : new ShapeBatch(options);
        }
        return batch;
    }

    getTempStroke(){
        let { renderer, buffer } = this;
        let stroke = renderer.temp as Stroke;
        if(!stroke){
            let vertices = new VertexBuffer(buffer);
            vertices.capacity = vertices.position; // Hack
            renderer.temp = stroke = new Stroke({
                fillColor: this.copyFillColor(),
                vertices: vertices,
                zIndex: this.zIndex,
            });
        }
        return stroke;
    }

    getMesh(id: string){
        return this.renderer.meshes.find(mesh => mesh.id === id);
    }

    setMesh(id: string){
        this.mesh = this.getMesh(id);
    }

    copyFillColor(){
        return ColorFStruct.create(this.fillColor);
    }

    copyStrokeColor(){
        return ColorFStruct.create(this.strokeColor);
    }

    setFillColor(color: ColorLike){
        let { fillColor, renderer } = this;
        let { target } = renderer.selection;
        // Modify fill color
        fillColor.setFromColor(color);
        // Modify color of selected drawable (if any)
        if(target){
            let oldColor = ColorStruct.create(color);
            let newColor = ColorStruct.create(color);
            let action = new SetFillColorAction(target, oldColor, newColor);
            this.actionStack.push(action);
            action.redo(this);
            this.requestRender();
        }
    }

    setStrokeColor(color: ColorLike){
        let { strokeColor, renderer } = this;
        let { target } = renderer.selection;
        // Modify stroke color
        strokeColor.setFromColor(color);
        // Modify color of selected drawable (if any)
        if(target && target.saveStrokeColor){
            let oldColor = ColorStruct.create(color);
            let newColor = ColorStruct.create(color);
            let action = new SetStrokeColorAction(target, oldColor, newColor);
            this.actionStack.push(action);
            action.redo(this);
            this.requestRender();
        }
    }

    setLineWidth(lineWidth: number){
        this.lineWidth = lineWidth;
        let target = this.renderer.selection.target;
        if(target && target.saveLineWidth){
            let action = new SetLineWidthAction(target, target.lineWidth, lineWidth);
            this.actionStack.push(action);
            action.redo(this);
            this.requestRender();
        }
    }

    addTempDrawable(){
        let { renderer, actionStack } = this;
        let { temp, drawables, camera } = renderer;
        // If temp drawable lies inside viewable camera area
        if(temp && camera.target.intersects(temp.measureBoundaries())){
            // Add to drawable stack and record action
            let index = drawables.length;
            let action = new AddDrawableAction(temp, index);
            action.redo(this); // Does the actual insertion
            actionStack.push(action);
            this.zIndex++;
        }
        // Remove temp drawable
        renderer.temp = null;
    }

    addTempShapeBatch(){
        let { renderer } = this;
        let batch = renderer.temp as ShapeBatch;
        if(!batch) { return; }
        // If batch contains at least one shape
        let matrices = batch.matrices;
        let size = matrices.position();
        if(size > 0){
            // Copy matrices into new buffer with capacity equal to size
            matrices.moveToFirst();
            batch.matrices = Mat2dBuffer.create(size);
            batch.matrices.rsetFromBuffer(matrices, size);
            // Proceed with adding batch to drawable stack
            this.addTempDrawable();
        } else {
            renderer.temp = null;
        }
    }

    addTempStroke(){
        let { renderer } = this;
        let stroke = renderer.temp as Stroke;
        if(!stroke) { return; }
         // If batch contains at least one segment
        let vertices = stroke.vertices;
        let size = vertices.position();
        if(size > 3){
            // Copy vertices into new buffer with capacity equal to size
            vertices.moveToFirst();
            stroke.vertices = VertexBuffer.create(size);
            stroke.vertices.rsetFromBuffer(vertices, size);
            // Proceed with adding stroke to drawable stack
            this.addTempDrawable();
        } else {
            renderer.temp = null;
        }
    }

    transformDrawable(drawable?: Drawable, matrix?: Mat2d){
        if(drawable && matrix && !matrix.isIdentity()){
            let action = new TransformDrawableAction(drawable, matrix);
            this.actionStack.push(action);
            drawable.savePosition(this.database);
        }
    }
    
    remove(drawable: Drawable){
        let { renderer, actionStack } = this;
        let index = lastIndexOf(renderer.drawables, drawable);
        let action = new RemoveDrawableAction(drawable, index);
        action.redo(this); // Does the actual removal
        actionStack.push(action);
    }

    moveForward(drawable: Drawable){
        let { renderer, actionStack } = this;
        let { drawables } = renderer;
        // Invoke new action if drawable above exists
        let index = lastIndexOf(drawables, drawable);
        if(index !== drawables.length - 1){
            let action = new MoveForwardAction(index);
            action.redo(this);
            actionStack.push(action);
        }
    }

    moveBackward(drawable: Drawable){
        let { renderer, actionStack } = this;
        let { drawables } = renderer;
        // Invoke new action if drawable below exists
        let index = lastIndexOf(drawables, drawable);
        if(index !== 0){
            let action = new MoveBackwardAction(index);
            action.redo(this);
            actionStack.push(action);
        }
    }

    moveToFront(drawable: Drawable){
        let { renderer, actionStack } = this;
        let { drawables } = renderer;
        // Invoke new action if drawable not already at the front
        if(drawable !== drawables[drawables.length-1]){
            let action = new MoveToFrontAction(drawable.zIndex);
            action.redo(this);
            actionStack.push(action);
        }
    }

    moveToBack(drawable: Drawable){
        let { renderer, actionStack } = this;
        let { drawables } = renderer;
        // Invoke new action if drawable not already at the back
        if(drawable !== drawables[0]){
            let action = new MoveToBackAction(drawable.zIndex);
            action.redo(this);
            actionStack.push(action);
        }
    }

    undoLastAction(){
        let { renderer, actionStack } = this;
        let { drawables } = renderer;
        let action = actionStack.pop();

        if(!action && drawables.length > 0){
            let index = drawables.length - 1;
            action = new AddDrawableAction(drawables[index], index)
        }

        if(action){
            action.undo(this);
            actionStack.redos.push(action);
        }
        
        return action;
    }

    redoLastUndo(){
        let { actionStack } = this;
        let { undos, redos } = actionStack;
        let action: Action;

        if(redos.length > 0){
            action = redos.pop();
        }

        if(action){
            action.redo(this);
            undos.push(action);
        }

        return action;
    }

    /**
     * Swaps the drawable at index i with the drawable at position j.
     */
    swap(i: number, j: number){
        let { renderer, database } = this;
        let { drawables } = renderer;
        let drawable = drawables[i];
        let zIndex = drawable.zIndex;
        // Swap order in stack
        drawables[i] = drawables[j];
        drawables[j] = drawable;
        // Save order in database
        drawable.zIndex = drawables[j].zIndex;
        drawable.saveZindex(database);
        drawables[j].zIndex = zIndex;
        drawables[j].saveZindex(database);
    }

    copy(drawable: Drawable){
        this.clipboard = drawable;
    }

    paste(){
        let { clipboard, database, renderer, canvasId } = this;
        // Selection takes precedence over clipboard
        let drawable = renderer.selection.target || clipboard;
        if(drawable){
            let copy = drawable.copy();
            copy.zIndex = this.zIndex++;
            copy.save(database, canvasId.val);
            this.addDrawable(copy)
        }
    }

    zoomIn(desiredScaleFactor: number){
        let result = super.zoomIn(desiredScaleFactor);
        this.scaleFramesAndControlPoints(1/result);
        return result;
    }

    zoomOut(desiredScaleFactor: number){
        let result = super.zoomOut(desiredScaleFactor);
        this.scaleFramesAndControlPoints(1/result);
        return result;
    }

    zoomToPoint(desiredScaleFactor: number, focus: PointLike){
        let result = super.zoomToPoint(desiredScaleFactor, focus);
        this.scaleFramesAndControlPoints(1/result.scaleFactor);
        return result;
    }

    private scaleFramesAndControlPoints(scale: number){
        this.renderer.selectionHover.frame.lineWidth *= scale;
        this.renderer.selection.frame.lineWidth *= scale;
        this.renderer.selection.pivot.stretch(scale);
        this.renderer.selection.control.stretch(scale);
    }
}

