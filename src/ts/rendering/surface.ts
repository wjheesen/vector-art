import { ColorLike } from 'gl2d';
import { Action } from '../action/action';
import { ColorChange } from '../action/colorChange';
import { Insertion } from '../action/insertion';
import { ActionRecord } from '../action/record';
import { Removal } from '../action/removal';
import { Transformation } from '../action/transformation';
import { Database } from '../database/database';
import { Drawable } from '../drawable/drawable';
import { Ellipse } from '../drawable/ellipse';
import { EllipseBatch } from '../drawable/ellipseBatch';
import { Line } from '../drawable/line';
import { Shape } from '../drawable/shape';
import { ShapeBatch } from '../drawable/shapeBatch';
import { Stroke } from '../drawable/stroke';
import { Renderer } from './renderer';
import { Mesh } from 'gl2d/drawable/mesh';
import { Camera } from 'gl2d/rendering/camera';
import { Surface as Base } from 'gl2d/rendering/surface';
import { ColorStruct } from 'gl2d/struct/color';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2d, Mat2dBuffer, Mat2dStruct } from 'gl2d/struct/mat2d';
import { PointLike } from 'gl2d/struct/point';
import { RectStruct } from 'gl2d/struct/rect';
import { VertexBuffer } from 'gl2d/struct/vertex';
import lastIndexOf = require('lodash.lastindexof');


export class Surface extends Base<Renderer> {

    lineWidth: number;
    drawColor = new ColorFStruct();
    mesh: Mesh;

    record = new ActionRecord();

    database = new Database();
    canvasId: number;
    zIndex = 1;

    buffer = new Float32Array(25000); // 100kb

    static create(){
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        // Note: alpha option not supported before iOS 10
        let gl = canvas.getContext('webgl', { alpha: false });
        let camera = new Camera(RectStruct.create$(-1,1,1,-1), 1.0, 1000);
        let renderer = new Renderer(gl, camera);
        renderer.ext = gl.getExtension('ANGLE_instanced_arrays');
        let surface = new Surface(canvas, renderer);
        surface.importCanvas(1);
        return surface;
    }

    importCanvas(canvasId: number){
        this.canvasId = canvasId;
        let db = this.database;
        this.clear();

        db.types.toArray().then(types => {
            db.transaction("rw", db.types, db.shapes, db.shapeBatches, db.strokes, db.canvases, () => {
                // Import shapes
                db.shapes.where("canvasId").equals(canvasId).each(data => {
                    let type = types.find(t => t.id === data.typeId);
                    let mesh = this.getMesh(type.name);
                    let color = ColorFStruct.fromColor(new ColorStruct(new Uint8Array(data.color)));
                    let matrix = new Mat2dStruct(new Float32Array(data.matrix));
                    let { zIndex, id } = data;
                    let shape: Shape;
                    if(type.name === "circle"){
                        shape = new Ellipse(mesh, color, matrix, zIndex, id);
                    } else {
                        shape = new Shape(mesh, color, matrix, zIndex, id);
                    }
                    this.addDrawableToSortedStack(shape)
                    this.requestRender();
                });
                // Import shape batches
                db.shapeBatches.where("canvasId").equals(canvasId).each(data => {
                    let type = types.find(t => t.id === data.typeId);
                    let mesh = this.getMesh(type.name);
                    let color = ColorFStruct.fromColor(new ColorStruct(new Uint8Array(data.color)));
                    let matrices = new Mat2dBuffer(new Float32Array(data.matrices));
                    let { zIndex, id } = data;
                    matrices.moveToLast();

                    let batch: ShapeBatch;
                    if(type.name === "circle"){
                        batch = new EllipseBatch(mesh, color, matrices, zIndex, id);
                    } else {
                        batch = new ShapeBatch(mesh, color, matrices, zIndex, id);
                    }
                    this.addDrawableToSortedStack(batch)
                    this.requestRender();
                });
                // Import strokes
                db.strokes.where("canvasId").equals(canvasId).each(stroke => {
                    let color = ColorFStruct.fromColor(new ColorStruct(new Uint8Array(stroke.color)));
                    let vertices = new VertexBuffer(new Float32Array(stroke.vertices));
                    vertices.moveToLast();
                    this.addDrawableToSortedStack(new Stroke(color, vertices, stroke.zIndex, stroke.id))
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

    clear(){
        this.renderer.drawables.length = 0;
        this.record.clear();
    }

    private addDrawableToSortedStack(drawable: Drawable){
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
            let color = this.copyDrawColor();
            line = new Line(this.getMesh("square"), color);
            renderer.temp = line;
        }
        return line;
    }

    getTempShape(){
        let { renderer } = this;
        let shape = renderer.temp as Shape;
        if(!shape){
            let mesh = this.mesh;
            let color = this.copyDrawColor();
            if(mesh.id === "circle"){
                shape = new Ellipse(mesh, color);
            } else {
                shape = new Shape(mesh, color);
            }
            renderer.temp = shape;
        }
        return shape;
    }

    getTempShapeBatch(){
        let { renderer } = this;
        let batch = renderer.temp as ShapeBatch;
        if(!batch){
            let mesh = this.mesh; 
            let color = this.copyDrawColor();
            let matrices = new Mat2dBuffer(this.buffer);
            if(mesh.id === "circle"){
                batch = new EllipseBatch(mesh, color, matrices);
            } else {
                batch = new ShapeBatch(mesh, color, matrices);
            }
            renderer.temp = batch;
        }
        return batch;
    }

    getTempStroke(){
        let { renderer, buffer } = this;
        let stroke = renderer.temp as Stroke;
        if(!stroke){
            let color = this.copyDrawColor();
            let vertices = new VertexBuffer(buffer);
            stroke = new Stroke(color, vertices);
            renderer.temp = stroke;
        }
        return stroke;
    }

    getMesh(id: string){
        return this.renderer.meshes.find(mesh => mesh.id === id);
    }

    copyDrawColor(){
        return ColorFStruct.create(this.drawColor);
    }

    setDrawColor(color: ColorStruct){
        let { drawColor, renderer } = this;
        let { target } = renderer.selection;
        // Modify draw color
        drawColor.setFromColor(color);
        // Modify color of selected drawable (if any)
        if(target){
            target.color.set(drawColor);
            this.changeColor(target, drawColor);
        }
    }

    addTempDrawable(){
        let { renderer, record } = this;
        let { temp, drawables, camera } = renderer;
        // If temp drawable lies inside viewable camera area
        if(temp && camera.target.intersects(temp.measureBoundaries())){
            // Add to drawable stack and record action
            let index = drawables.length;
            let action = new Insertion(temp, index);
            action.redo(this); // Does the actual insertion
            record.push(action);
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
            batch.matrices.putBuffer(matrices, size);
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
            stroke.vertices.putBuffer(vertices, size);
            // Proceed with adding stroke to drawable stack
            this.addTempDrawable();
        } else {
            renderer.temp = null;
        }
    }

    recordTransformation(drawable?: Drawable, matrix?: Mat2d){
        if(drawable && matrix && !matrix.isIdentity()){
            let action = new Transformation(drawable, matrix);
            this.record.push(action);
            drawable.updatePosition(this);
        }
    }
    
    changeColor(drawable: Drawable, color: ColorLike){
        let oldColor = ColorStruct.create(color);
        let newColor = ColorStruct.create(color);
        let action = new ColorChange(drawable, oldColor, newColor);
        this.record.push(action);
        drawable.updateColor(this, newColor);
    }

    removeDrawable(drawable: Drawable){
        let { renderer, record } = this;
        let index = lastIndexOf(renderer.drawables, drawable);
        let action = new Removal(drawable, index);
        action.redo(this); // Does the actual removal
        record.push(action);
    }

    undoLastAction(){
        let { renderer, record } = this;
        let { drawables } = renderer;
        let { undoableActions, redoableActions } = record;
        let action: Action;

        if(undoableActions.length > 0){
            action = undoableActions.pop();
        } else if(drawables.length > 0){
            let index = drawables.length - 1;
            action = new Insertion(drawables[index], index)
        } 

        if(action){
            action.undo(this);
            redoableActions.push(action);
        }
        
        return action;
    }

    redoLastUndo(){
        let { record } = this;
        let { undoableActions, redoableActions } = record;
        let action: Action;

        if(redoableActions.length > 0){
            action = redoableActions.pop();
        }

        if(action){
            action.redo(this);
            undoableActions.push(action);
        }

        return action;
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
        this.renderer.hover.frame.thickness *= scale;
        this.renderer.selection.frame.thickness *= scale;
        this.renderer.selection.pivot.stretch(scale);
        this.renderer.selection.control.stretch(scale);
    }
}