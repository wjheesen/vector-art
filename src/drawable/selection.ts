import { Drawable } from './drawable';
import { Shape } from './shape';
import { Ellipse } from './ellipse';
import { Frame } from './frame';
import { Renderer } from "src/rendering/renderer";
import { IVec2 } from "gl2d/struct/vec2";
import { IMat2d } from "gl2d/struct/mat2d";
import { Mesh } from "gl2d/drawable/mesh";
import { ColorFStruct } from "gl2d/struct/colorf";
import { IPoint } from "gl2d/struct/point";

export class Selection {

    frame: Frame;
    pivot: Ellipse;
    control: Ellipse;
    target: Drawable;
    pointRadius: number;

    constructor(frame: Frame, pivot: Ellipse, control: Ellipse, pointRadius: number){
        this.frame = frame;
        this.pivot = pivot;
        this.control = control;
        this.pointRadius = pointRadius;
    }

    static create(frameColor: ColorFStruct, frameThickness: number, pointMesh: Mesh, pointColor: ColorFStruct, pointRadius: number){
        let frame = new Frame(frameColor, frameThickness);
        let pivot = new Ellipse(pointMesh, pointColor);
        let control = new Ellipse(pointMesh, pointColor);
        return new Selection(frame, pivot, control, pointRadius);
    }

    setTarget(target?: Drawable){
        this.target = target;
        if(target){
            let radius = this.pointRadius;
            let bounds = target.measureBoundaries();
            this.frame.innerRect.set(bounds);
            this.pivot.set(radius, radius, this.getPivot());
            this.control.set(radius, radius, this.getControl());
        } else {
            this.frame.innerRect.setScalar(0);
        }
    }

    contains(point: IPoint){
        return this.target && this.frame.contains(point);
    }

    offset(vec: IVec2){
        this.target.offset(vec);
        this.frame.innerRect.offset(vec);
        this.pivot.offset(vec);
        this.control.offset(vec);
    }

    scale(scale: IMat2d){
        let target = this.target;
        let frameRect = this.frame.innerRect;
        target.transform(scale);
        IMat2d.mapRect(scale, frameRect, frameRect);
        this.pivot.offsetTo(this.getPivot());
        this.control.offsetTo(this.getControl());
    }

    transform(matrix: IMat2d){
        let target = this.target;
        this.target.transform(matrix);
        this.frame.innerRect.set(target.measureBoundaries());
        this.pivot.offsetTo(this.getPivot());
        this.control.offsetTo(this.getControl());
    }

    private getPivot(){
        if(this.target instanceof Shape){
            return this.target.measurePivot();
        } else {
            return this.frame.innerRect.center();
        }
    }

    private getControl(){
        if(this.target instanceof Shape){
            return this.target.measureControl();
        } else {
            return this.frame.innerRect.centerBottom();
        }
    }

    draw(renderer: Renderer){
        this.frame.draw(renderer);
        this.pivot.draw(renderer);
        this.control.draw(renderer);
    }
}
