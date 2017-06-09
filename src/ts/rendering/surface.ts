import { Action } from '../action/action';
import { ColorChange } from '../action/colorChange';
import { Insertion } from '../action/insertion';
import { ActionRecord } from '../action/record';
import { Removal } from '../action/removal';
import { Transformation } from '../action/transformation';
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
import { Mat2d, Mat2dBuffer } from 'gl2d/struct/mat2d';
import { IPoint } from 'gl2d/struct/point';
import { RectStruct } from 'gl2d/struct/rect';
import { VertexBuffer } from 'gl2d/struct/vertex';
import lastIndexOf = require('lodash.lastindexof');


export class Surface extends Base<Renderer> {

    lineWidth: number;
    drawColor = new ColorFStruct();
    mesh: Mesh;

    record = new ActionRecord();

    buffer = new Float32Array(25000); // 100kb

    static create(){
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        // Note: alpha option not supported before iOS 10
        let gl = canvas.getContext('webgl', { alpha: false });
        let camera = new Camera(RectStruct.create$(-1,1,1,-1), 1.0, 1000);
        let renderer = new Renderer(gl, camera);
        renderer.ext = gl.getExtension('ANGLE_instanced_arrays');
        return new Surface(canvas, renderer);
    }

    getDrawableContaining(point: IPoint){
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
            line = new Line(renderer.meshes[1], color);
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
            if(mesh){
                shape = new Shape(mesh, color);
            } else {
                shape = new Ellipse(renderer.ellipseProgram.mesh, color);
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
            if(mesh){
                batch = new ShapeBatch(mesh, color, matrices);
            } else {
                batch = new EllipseBatch(renderer.ellipseProgram.mesh, color, matrices);
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
            this.recordColorChange(target, drawColor);
        }
    }

    addTempDrawable(){
        let { renderer, record } = this;
        let { temp, drawables, camera } = renderer;
        // If temp drawable lies inside viewable camera area
        if(temp && camera.target.intersects(temp.measureBoundaries())){
            // Add to drawable stack and record action
            let index = drawables.length;
            drawables.push(temp);
            record.push(new Insertion(temp, index));
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
        }
    }
    
    recordColorChange(drawable: Drawable, color: ColorFStruct){
        let oldColor = ColorStruct.fromColorF(drawable.color);
        let newColor = ColorStruct.fromColorF(color);
        let action = new ColorChange(drawable, oldColor, newColor);
        this.record.push(action);
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
            action = new Insertion(drawables.pop(), drawables.length)
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

    zoomToPoint(desiredScaleFactor: number, focus: IPoint){
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