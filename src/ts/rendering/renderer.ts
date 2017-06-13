import { square } from '../meshSpec/square';
import { leaf } from '../meshSpec/leaf';
import { chevron } from '../meshSpec/chevron';
import { pineTree } from '../meshSpec/pineTree';
import { bat } from '../meshSpec/bat';
import { flower } from '../meshSpec/flower';
import { heart } from '../meshSpec/heart';
import { sun } from '../meshSpec/sun';
import { star16 } from '../meshSpec/star16';
import { star8 } from '../meshSpec/star8';
import { star6 } from '../meshSpec/star6';
import { star5 } from '../meshSpec/star5';
import { star4 } from '../meshSpec/star4';
import { star3 } from '../meshSpec/star3';
import { diamond } from '../meshSpec/diamond';
import { octagon } from '../meshSpec/octagon';
import { hexagon } from '../meshSpec/hexagon';
import { pentagon } from '../meshSpec/pentagon';
import { triangle } from '../meshSpec/triangle';
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
import { Mesh } from 'gl2d/mesh/mesh';
import { Renderer as Base } from 'gl2d/rendering/renderer';
import { ColorFStruct } from 'gl2d/struct/colorf';

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
        let tri = Mesh.fromSpecification(triangle);
        this.meshes = [
            tri,
            Mesh.fromSpecification(square),
            Mesh.fromSpecification(pentagon),
            Mesh.fromSpecification(hexagon),
            Mesh.fromSpecification(octagon),
            SprayMesh.create(tri, 3, 3, "spray"),
            Mesh.fromSpecification(diamond),
            Mesh.fromSpecification(star3),
            Mesh.fromSpecification(star4),
            Mesh.fromSpecification(star5),
            Mesh.fromSpecification(star6),
            Mesh.fromSpecification(star8),
            Mesh.fromSpecification(star16),
            Mesh.fromSpecification(sun),
            Mesh.fromSpecification(heart),
            Mesh.fromSpecification(flower),
            Mesh.fromSpecification(bat),
            Mesh.fromSpecification(leaf),
            Mesh.fromSpecification(pineTree),
            Mesh.fromSpecification(chevron)
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

