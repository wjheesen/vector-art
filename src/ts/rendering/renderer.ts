import { MeshSpecifications } from '../../res/build/mesh/specifications';
import { Drawable } from '../drawable/drawable';
import { Frame } from '../drawable/frame';
import { FramedDrawable } from '../drawable/framed';
import { Selection } from '../drawable/selection';
import { EllipseProgram } from '../program/ellipse';
import { FrameProgram } from '../program/frame';
import { ShapeProgram } from '../program/shape';
import { StrokeProgram } from '../program/stroke';
import { ANGLEInstancedArrays } from './ANGLE_instanced_arrays';
import { Mesh } from 'gl2d/drawable/mesh';
import { Renderer as Base } from 'gl2d/rendering/renderer';
import { ColorFStruct } from 'gl2d/struct/colorf';
// import { Shape } from "../drawable/shape";
// import { Rect } from "gl2d/struct/rect";
// import { ScaleToFit, Mat2dStruct } from "gl2d/struct/mat2d";

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
    selectionHover: FramedDrawable;

    // navigateRight: Shape;
    // navigateLeft: Shape;
    // buttonHover: Shape;

    meshes: Mesh[];

    onSurfaceCreated(): void {
        let gl = this.gl;
        gl.clearColor(1,1,1,1);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Init meshes 
        this.meshes = MeshSpecifications.map(spec => Mesh.fromSpecification(spec));
        
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
        this.selectionHover = new FramedDrawable(new Frame(blueHover, frameThickness));

        // Init navigation buttons
        // let black = ColorFStruct.create$(0,0,0,1);
        // let arrow = this.meshes.find(mesh => mesh.id === "arrow");
        // let square = this.meshes.find(mesh => mesh.id === "square");
        // this.navigateLeft = new Shape(arrow, black, Mat2dStruct.rotate(Math.PI/4));
        // this.navigateRight = new Shape(arrow, black, Mat2dStruct.rotate(-Math.PI/4));
        // this.buttonHover = new Shape(square, blueHover);
    }
    
    // onSurfaceChanged(width: number, height: number){
    //     super.onSurfaceChanged(width, height);
    //     let view = this.camera.view;
    //     if(width > height){
    //         // Landscape mode
    //         let left = Rect.lrbt(view.left, -1, -1, 1);
    //         let right = Rect.lrbt(1, view.right, -1, 1);
    //         this.navigateLeft.mapToRect(left, ScaleToFit.Center);
    //         this.navigateRight.mapToRect(right, ScaleToFit.Center);
    //     } else {
    //         // Portrait mode
    //         let top = Rect.lrbt(-1, 1, 1, view.top);
    //         this.navigateLeft.mapToRect(top, ScaleToFit.Center);
    //         this.navigateRight.mapToRect(top, ScaleToFit.Center);
    //     }
    // }

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
        // this.navigateLeft.draw(this);
        // this.navigateRight.draw(this);
        // this.buttonHover.draw(this);
        if(this.selection.target){
            this.selection.draw(this);
        }
        if(this.selectionHover.target){
            this.selectionHover.draw(this);
        }
        // Clear backbuffer alpha
        gl.colorMask(false, false, false, true);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.colorMask(true, true, true, true);
    }

}

