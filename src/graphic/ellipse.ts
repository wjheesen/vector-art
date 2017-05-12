import { Graphic } from './graphic';
import { Renderer } from '../renderer';
import { RectStruct } from 'gl2d/struct/rect';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { EllipseStruct } from 'gl2d/struct/ellipse';
import { IPoint } from "gl2d/struct/point";

export class Ellipse extends EllipseStruct implements Graphic {

    color: ColorFStruct
    bounds: RectStruct

    constructor(color: ColorFStruct, bounds?: RectStruct){
        super();
        this.color = color;
        if (bounds === undefined) {
            this.bounds = new RectStruct();
        } else {
            this.bounds = bounds;
            this.setFromRect(bounds);
        }
    }

    setFromPointToPoint(p1: IPoint, p2: IPoint, maintainAspect: boolean){
        this.bounds.setUnionOfPoints([p1,p2]);
        if(maintainAspect){
            this.bounds.expandToSquare();
        }
        this.setFromRect(this.bounds);
    }

    draw(renderer: Renderer){
        let gl = renderer.gl;
        let program = renderer.ellipseProgram;
        renderer.useProgram(program);
        program.setProjection(gl, renderer.camera.matrix);
        program.setColor(gl, this.color);
        program.setEllipse(gl, this.bounds);
        program.draw(gl);
    }
}