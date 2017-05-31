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

export const vertex = "precision mediump float;uniform mat4 b;attribute mat2 c;attribute vec2 a,d;void main(){vec2 f=c*d+a;gl_Position=b*vec4(f,1.,1.);}";
export const fragment = "precision mediump float;uniform vec4 e;void main(){gl_FragColor=e;}";
export const UniformRenaming = {"projection":"b","color":"e"};
export const AttributeRenaming = {"model":"c","offset":"a","position":"d"};
