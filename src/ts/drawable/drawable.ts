import { ColorStruct } from 'gl2d/struct/color';
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
     * The unique identifier for this drawable (if any).
     */
    id: number;
    /**
     * The z position of this drawable (if any).
     */
    zIndex: number;
    /**
     * The fill color for this drawable. 
     */
    fillColor: ColorFStruct;
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
     * Saves this drawable to the surface database.
     */
    save(surface: Surface): void;
    /**
     * Deletes this drawable from the surface database.
     */
    delete(surface: Surface): void;
    /**
     * Sets the color of this drawable and saves the change in the surface database.
     */
    setFillColorAndSave(surface: Surface, color: ColorStruct): void;
    /**
     * Sets the zIndex of this drawable and saves the change in the surface database.
     */
    setZIndexAndSave(surface: Surface, zIndex: number): void;
    /**
     * Saves the position of this drawable in the surface database.
     */
    savePosition(surface: Surface): void;
}