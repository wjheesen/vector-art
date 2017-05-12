import { Renderer } from '../renderer';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { IPoint } from "gl2d/struct/point";

export interface Graphic {
    color: ColorFStruct;
    contains: (point: IPoint) => boolean;
    draw: (renderer: Renderer) => void;
}