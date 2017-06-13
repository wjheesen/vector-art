import { Drawable } from '../drawable/drawable';
import { Frame } from '../drawable/frame';
import { FramedDrawable } from '../drawable/framed';
import { Selection } from '../drawable/selection';
import { SprayMesh } from '../mesh/spray';
import { EllipseProgram } from '../program/ellipse';
import { FrameProgram } from '../program/frame';
import { ShapeProgram } from '../program/shape';
import { StrokeProgram } from '../program/stroke';
import { ANGLEInstancedArrays } from './ANGLE_instanced_arrays';
import { Mesh, MeshSource } from 'gl2d/drawable/mesh';
import { Renderer as Base } from 'gl2d/rendering/renderer';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Rect } from "gl2d/struct/rect";

export class Renderer extends Base {

    ext: ANGLEInstancedArrays;
    
    shapeProgram: ShapeProgram;
    ellipseProgram: EllipseProgram;
    strokeProgram: StrokeProgram;
    frameProgram: FrameProgram;

    foreground: Frame;
    drawables: Drawable[] = [];
    temp: Drawable;

    selection: Selection;
    hover: FramedDrawable;

    meshes: Mesh[];

    onSurfaceCreated(): void {
        let gl = this.gl;
        gl.clearColor(1,1,1,1);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Init meshes 
        let triangle = Mesh.polygon(3,false,"triangle");
        this.meshes = [
            triangle,
            Mesh.rectangle(Rect.lbwh(0,0,1,1),"square"),
            Mesh.polygon(5,false,"pentagon"),
            Mesh.polygon(6, false, "hexagon"),
            Mesh.polygon(8, false, "octagon"),
            SprayMesh.create(triangle, 3, 3, "spray"),
            Mesh.star(2, .5,"diamond"),
            Mesh.star(3, .25,"star3"),
            Mesh.star(4, .25,"star4"),
            Mesh.star(5, .4,"star5"),
            Mesh.star(6, .5,"star6"),
            Mesh.star(8, .5,"star8"),
            Mesh.star(16, .1,"star16"),
            Mesh.star(16, .8,"sun"),
            Mesh.fromSource(heart()),
            Mesh.fromSource(flower()),
            Mesh.fromSource(bat()),
        ];
        // Init programs
        this.shapeProgram = ShapeProgram.create(gl, this.meshes);
        this.ellipseProgram = EllipseProgram.create(gl);
        this.meshes.push(this.ellipseProgram.mesh);
        this.strokeProgram = StrokeProgram.create(gl);
        this.frameProgram = FrameProgram.create(gl);
        // Init background
        this.foreground = new Frame(ColorFStruct.create$(.6,.6,.6,1), 10, this.camera.target);
        // Init selection boxes
        let frameThickness = 0.08;
        let pointRadius = 0.05;
        let blue = ColorFStruct.create$(0, 0.2, 0.9, 0.9);
        let blueHover = ColorFStruct.create$(0, 0.2, 0.9, 0.5);
        let red = ColorFStruct.create$(1,0,0,0.9);
        let pointMesh = this.ellipseProgram.mesh;
        this.selection = Selection.create(blue, frameThickness, pointMesh, red, pointRadius);
        this.hover = new FramedDrawable(new Frame(blueHover, frameThickness));
    }

    onDrawFrame(): void {
        let gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT);
        for(let drawable of this.drawables){
            drawable.draw(this);
        }
        if(this.temp){
            this.temp.draw(this);
        }
        this.foreground.draw(this);
        if(this.selection.target){
            this.selection.draw(this);
        }
        if(this.hover.target){
            this.hover.draw(this);
        }
        // Clear backbuffer alpha
        gl.colorMask(false, false, false, true);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.colorMask(true, true, true, true);
    }

}

function heart(): MeshSource {
    return {
         id: "heart",
         vertices: [0,12,-3,16,-5,16,-8,12,-8,8,0,0,8,8,8,12,5,16,3,16], 
         indices: Mesh.polygonIndices(10)
    }
}

function flower(): MeshSource {
    return { 
        id: "flower",
        vertices: [0,-2,-1,-1,-2,-1,-2,-2,-3,-3,-1,-3,-2,-4,-2,-5,-1,-5,0,-6,0,-4,1,-5,2,-5,2,-4,3,-3,1,-3,2,-2,2,-1,1,-1,0,0], 
        indices: [5,0,1,5,1,2,5,2,3,5,3,4,5,6,7,5,7,8,5,8,9,5,9,10,5,10,0,15,0,10,15,10,11,15,11,12,15,12,13,15,13,14,15,16,17,15,17,18,15,18,19,15,19,0] 
    };
}

function bat(): MeshSource {
    return { 
        id: "bat", 
        vertices: [0,3,-2,5,-3,2,-5,0,-8,3,-10,7,-17,10,-13,5,-12,-1,-3,-7,0,-10,3,-7,12,-1,13,5,17,10,10,7,8,3,5,0,3,2,2,5], 
        indices: [0,1,2,0,2,3,0,3,9,0,9,10,0,10,11,0,11,17,0,17,18,0,18,19,4,5,6,4,6,7,4,7,8,4,8,9,4,9,3,16,14,15,16,13,14,16,12,13,16,11,12,16,17,11],
    };
}
