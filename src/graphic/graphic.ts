import { Renderer } from '../renderer';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { IPoint } from "gl2d/struct/point";
import { IRect } from "gl2d/struct/rect";

export interface Graphic {
    color: ColorFStruct;
    contains: (point: IPoint) => boolean;
    getBounds: () => IRect;
    draw: (renderer: Renderer) => void;
}