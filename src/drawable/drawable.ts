import { Renderer } from '../renderer';
import { Shape } from "gl2d/graphics/shape";

export interface Drawable extends Shape {
    /**
     * Draws this shape using the specified renderer.
     */
    draw: (renderer: Renderer) => void;
}
