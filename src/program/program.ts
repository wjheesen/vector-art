import { Program as Base } from 'gl2d/rendering/program'
import { AttribLocations, UniformLocations } from 'gl2d/rendering/util';
import { Renderer } from '../rendering/renderer';

export abstract class Program<U extends UniformLocations, A extends AttribLocations> extends Base<Renderer, U, A> {

}