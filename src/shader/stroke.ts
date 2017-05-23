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
     * The location of attribute vec4 position.
     */
    position: number;
}

export type Variables = Uniforms|Attributes;

export const vertex = "precision mediump float;uniform mat4 a;attribute vec4 b;void main(){gl_Position=a*b;}";
export const fragment = "precision mediump float;uniform vec4 c;void main(){gl_FragColor=c;}";
export const UniformRenaming = {"projection":"a","color":"c"};
export const AttributeRenaming = {"position":"b"};
