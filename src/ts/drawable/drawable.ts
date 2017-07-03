import { ColorFStruct } from 'gl2d/struct/colorf';
import { Renderer } from '../rendering/renderer';
import { Drawable as Base} from 'gl2d/drawable/drawable';
import { Rect } from "gl2d/struct/rect";
import { Vec2Like } from "gl2d/struct/vec2";
import { Mat2d } from "gl2d/struct/mat2d";
import { PointLike } from "gl2d/struct/point";
import { Database } from "../database/database";

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
     * The stroke color for this drawable (if any). 
     */
    strokeColor?: ColorFStruct;
    /**
     * The width of the lines making up the stroke (if any). 
     */
    lineWidth?: number;
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
     * Saves this drawable to the specified canvas of the specified database.
     */
    save(database: Database, canvasId: number): void;
    /**
     * Deletes this drawable from the specified database.
     */
    delete(database: Database): void;
    /**
     * Saves this drawable's fill color to the specified database.
     */
    saveFillColor(database: Database): void;
    /**
     * Saves this drawable's stroke color to the specified database.
     */
    saveStrokeColor?(database: Database): void;
    /**
     * Saves this drawable's line width to the specified database.
     */
    saveLineWidth?(database: Database): void;
    /**
     * Saves this drawable's zIndex to the specified database.
     */
    saveZindex(database: Database): void;
    /**
     * Saves the position of this drawable to the specified database.
     */
    savePosition(database: Database): void;
}