export interface Uniforms {
    readonly [name: string]: WebGLUniformLocation;

    /**
     * The location of uniform mat4 projection.
     */
    projection: WebGLUniformLocation;
    /**
     * The location of uniform vec4 color.
     */
    color: WebGLUniformLocation;
}

export interface Attributes {
    readonly [name: string]: number;

    /**
     * The location of attribute mat2 model.
     */
    model: number;
    /**
     * The location of attribute vec2 offset.
     */
    offset: number;
    /**
     * The location of attribute vec2 position.
     */
    position: number;
}

export type Variables = Uniforms|Attributes;

export const vertex = "precision mediump float;uniform mat4 e;attribute mat2 f;attribute vec2 g,c;varying vec2 a;void main(){vec2 b=f*c+g;gl_Position=e*vec4(b,1.,1.),a=c;}";
export const fragment = "precision mediump float;uniform vec4 h;varying vec2 a;void main(){float b=dot(a,a),d=float(b<=1.);gl_FragColor=h*d;}";
export const UniformRenaming = {"projection":"e","color":"h"};
export const AttributeRenaming = {"model":"f","offset":"g","position":"c"};
