import { Surface } from '../rendering/surface';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Renderer } from '../rendering/renderer';
import { Drawable as Base} from 'gl2d/drawable/drawable';
import { Rect } from "gl2d/struct/rect";
import { Vec2Like } from "gl2d/struct/vec2";
import { Mat2d } from "gl2d/struct/mat2d";
import { PointLike } from "gl2d/struct/point";

export interface Drawable extends Base<Renderer>{
    /**
     * The z position of this drawable.
     */
    zIndex: number;
    /**
     * The color of this drawable. 
     */
    color: ColorFStruct;
    /**
     * Measures the boundaries of this drawable in world space.
     * @returns the boundaries of this drawable.
     */
    measureBoundaries(): Rect;
    /**
     * Checks if this drawable contains the point (x,y).
     * @param point the point to check.
     * @returns true if the point lies on or within this drawable; false otherwise.
     */
    contains(pt: PointLike): boolean;
    /**
     * Offsets this drawable by the specified vector.
     */
    offset(vec: Vec2Like): void;
    /**
     * Transforms this drawable by the specified matrix.
     * @param matrix the transformation matrix.
     */
    transform(matrix: Mat2d): void;

    /**
     * Saves this drawable the database connected to the specified surface.
     */
    save(surface: Surface): void;
}