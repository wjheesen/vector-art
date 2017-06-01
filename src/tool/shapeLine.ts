import { EllipseBatch } from '../drawable/ellipseBatch';
import { Mat2dBuffer } from 'gl2d/struct/mat2d';
import { ShapeBatch } from '../drawable/shapeBatch';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Surface } from '../rendering/surface';
import { MouseOrTouchTool } from "gl2d/tool/mouseOrTouch";
import { MouseOrTouchAction } from "gl2d/action/mouseOrTouch";
import { Status } from "gl2d/action/status";
import { IPoint, Point } from "gl2d/struct/point";
import { Vec2 } from "gl2d/struct/vec2";

type Action = MouseOrTouchAction<Surface>;

export class ShapeLineTool extends MouseOrTouchTool<Surface> {
    
    private start: IPoint;

   onStart(action: Action) {
        this.start = this.getPrimaryPointer(action);
    }

    onAction(action: Action): void {
        switch(action.status){
            case Status.Start:
                return this.onStart(action);
            case Status.Drag:
                return this.onDrag(action);
            case Status.End:
                return this.onEnd(action);
        }
    }

    onDrag(action: Action) {
        if(!this.start) { return; }

        let surface = action.target;
        let renderer = surface.renderer;
        let mesh = renderer.mesh;
        let stroke = renderer.temp as ShapeBatch;

        // Init shape stroke if needed
        if(!stroke){
            let color = ColorFStruct.create(renderer.color);
            let matrices = new Mat2dBuffer(renderer.buffer);
            if(mesh){
                stroke = new ShapeBatch(mesh, color, matrices);
            } else {
                stroke = new EllipseBatch(renderer.ellipseProgram.mesh, color, matrices);
            }
            renderer.temp = stroke;
        }

        // Add shapes from start to end, provided there is enough space
        let matrices = stroke.matrices;
        let start = this.start;
        let end = this.getPrimaryPointer(action);
        let vec = Vec2.fromPointToPoint(start, end);
        let len = vec.length();
        let thickness = renderer.lineThickness;
        let ratio = len / thickness;
        let count = Math.min(ratio >> 0, matrices.capacity());
        let p1 = Point.create(start);
        let p2 = Point.create(start);
        
        vec.divScalar(ratio);   // Gives vec a length equal to thickness
        matrices.moveToFirst(); // Allows previous shapes to be overwritten

        while(count--){
            p2.add(vec);
            stroke.addAcrossLine(p1, p2);
            p1.set(p2);
        }

        surface.requestRender();
    }

    onEnd(action: Action) {
        this.start = null;
        let surface = action.target;
        let renderer = surface.renderer;
        let stroke = renderer.temp as ShapeBatch;
        if(stroke){
            let buffer = stroke.matrices;
            let size = buffer.position();
            if(size > 0){
                buffer.moveToFirst();
                stroke.matrices = Mat2dBuffer.create(size);
                stroke.matrices.putBuffer(buffer, size);
                renderer.addDrawable();
                surface.requestRender();
            }
        }
    }
}