export interface Uniforms {
    readonly [name: string]: WebGLUniformLocation;

    /**
     * The location of uniform mat4 projection.
     */
    projection: WebGLUniformLocation;
    /**
     * The location of uniform vec4 innerRect.
     */
    innerRect: WebGLUniformLocation;
    /**
     * The location of uniform float thickness.
     */
    thickness: WebGLUniformLocation;
    /**
     * The location of uniform vec4 color.
     */
    color: WebGLUniformLocation;
}

export interface Attributes {
    readonly [name: string]: number;

    /**
     * The location of attribute vec2 basisCoord.
     */
    basisCoord: number;
}

export type Variables = Uniforms|Attributes;

export const vertex = "precision mediump float;uniform mat4 l;uniform vec4 f;uniform float a;attribute vec2 i;varying vec2 g,h;void main(){float b=f.x-a,j=f.y+a,k=f.z+a,c=f.w-a,d=k-b,e=j-c;g=vec2(a/d,a/e),h=i;float m=d*i.x+b,n=e*i.y+c;gl_Position=l*vec4(m,n,1.,1.);}";
export const fragment = "precision mediump float;uniform vec4 o;varying vec2 g,h;void main(){float b=h.x,c=h.y,d=g.x,e=g.y;gl_FragColor=o*float(b<d||c<e||b>1.-d||c>1.-e);}";
export const UniformRenaming = {"projection":"l","innerRect":"f","thickness":"a","color":"o"};
export const AttributeRenaming = {"basisCoord":"i"};
