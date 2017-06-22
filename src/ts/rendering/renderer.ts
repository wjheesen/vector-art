import { Mesh } from 'gl2d/drawable/mesh';
import { Renderer as Base } from 'gl2d/rendering/renderer';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2dStruct, ScaleToFit } from 'gl2d/struct/mat2d';
import { Rect } from 'gl2d/struct/rect';

import { MeshSpecifications } from '../../res/build/mesh/specifications';
import { Drawable } from '../drawable/drawable';
import { Frame } from '../drawable/frame';
import { FramedDrawable } from '../drawable/framed';
import { Selection } from '../drawable/selection';
import { Shape } from '../drawable/shape';
import { EllipseProgram } from '../program/ellipse';
import { FrameProgram } from '../program/frame';
import { ShapeProgram } from '../program/shape';
import { ANGLEInstancedArrays } from './ANGLE_instanced_arrays';

export class Renderer extends Base {

    ext: ANGLEInstancedArrays;
    
    shapeProgram: ShapeProgram;
    ellipseProgram: EllipseProgram;
    frameProgram: FrameProgram;

    foreground: Frame;
    drawables: Drawable[] = [];
    temp: Drawable;

    selection: Selection;
    selectionHover: FramedDrawable;

    navigateRight: Shape;
    navigateLeft: Shape;
    addCanvas: Shape;
    removeCanvas: Shape;
    buttonHover: Shape;

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
        let black = ColorFStruct.create$(0,0,0,1);
        let arrow = this.meshes.find(mesh => mesh.id === "arrow");
        let square = this.meshes.find(mesh => mesh.id === "square");
        let x = this.meshes.find(mesh => mesh.id === "x");
        this.navigateLeft = new Shape(arrow, black, Mat2dStruct.rotate(-Math.PI/2));
        this.navigateRight = new Shape(arrow, black, Mat2dStruct.rotate(Math.PI/2));
        this.addCanvas = new Shape(x, black, Mat2dStruct.rotate(Math.PI/4));
        this.removeCanvas = new Shape(x, black)
        this.buttonHover = new Shape(square, blueHover, new Mat2dStruct());

        // Place navigation buttons on canvas
        let left = Rect.lrbt(-1.75, -1.25, -1, 1);
        let right = Rect.lrbt(1.25, 1.75, -1, 1);
        let bottom = Rect.lrbt(-1, 1, -1.75, -1.25);
        let top = Rect.lrbt(-1, 1, 1.25, 1.75);
        this.navigateLeft.mapToRect(left, ScaleToFit.Center, true);
        this.navigateRight.mapToRect(right, ScaleToFit.Center, true);
        this.addCanvas.mapToRect(top, ScaleToFit.Center, true);
        this.removeCanvas.mapToRect(bottom, ScaleToFit.Center, false);
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
        this.navigateLeft.draw(this);
        this.navigateRight.draw(this);
        this.addCanvas.draw(this);
        this.removeCanvas.draw(this);
        this.buttonHover.draw(this);
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

