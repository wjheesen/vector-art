export interface Uniforms {
    readonly [name: string]: WebGLUniformLocation;

    /**
     * The location of uniform mat4 projection.
     */
    projection: WebGLUniformLocation;
    /**
     * The location of uniform mat3 model.
     */
    model: WebGLUniformLocation;
    /**
     * The location of uniform vec4 color.
     */
    color: WebGLUniformLocation;
}

export interface Attributes {
    readonly [name: string]: number;

    /**
     * The location of attribute vec2 position.
     */
    position: number;
}

export type Variables = Uniforms|Attributes;

export const vertex = "precision mediump float;uniform mat4 e;uniform mat3 f;attribute vec2 c;varying vec2 a;void main(){vec3 b=f*vec3(c,1.);gl_Position=e*vec4(b,1.),a=c;}";
export const fragment = "precision mediump float;uniform vec4 g;varying vec2 a;void main(){float b=dot(a,a),d=float(b<=1.);gl_FragColor=g*d;}";
export const UniformRenaming = {"projection":"e","model":"f","color":"g"};
export const AttributeRenaming = {"position":"c"};
