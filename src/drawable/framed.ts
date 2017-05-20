import { Renderer } from '../rendering/renderer';
import { Frame } from './frame';
import { Drawable } from './drawable';
import { IPoint } from "gl2d/struct/point";

export class FramedDrawable {

    frame: Frame;
    target: Drawable;

    constructor(frame: Frame, drawable?: Drawable){
        this.frame = frame;
        this.target = drawable;
    }

    setTarget(target?: Drawable){
        this.target = target;
        if(target){
            this.frame.innerRect.set(target.measureBoundaries())
        } else {
            this.frame.innerRect.setScalar(0);
        }
    }

    contains(point: IPoint){
        return this.target && this.frame.contains(point);
    }

    draw(renderer: Renderer){
        this.frame.draw(renderer);
        this.target.draw(renderer);
    }
}