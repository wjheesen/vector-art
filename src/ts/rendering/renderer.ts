import { Mesh } from 'gl2d/drawable/mesh';
import { Renderer as Base } from 'gl2d/rendering/renderer';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Mat2dStruct, ScaleToFit } from 'gl2d/struct/mat2d';
import { Rect } from 'gl2d/struct/rect';
import { MeshSpecifications } from '../../res/build/mesh/specifications';
import { Drawable } from '../drawable/drawable';
import { Ellipse } from '../drawable/ellipse';
import { Selection } from '../drawable/selection';
import { Shape } from '../drawable/shape';
import { EllipseProgram } from '../program/ellipse';
import { StrokeProgram } from '../program/outline';
import { FillProgram } from '../program/fill';
import { ANGLEInstancedArrays } from './ANGLE_instanced_arrays';

export class Renderer extends Base {

    ext: ANGLEInstancedArrays;
    
    fillProgram: FillProgram; 
    strokeProgram: StrokeProgram;
    ellipseProgram: EllipseProgram;

    drawables: Drawable[] = [];
    foreground: Shape;
    temp: Drawable;

    selection: Selection;
    selectionHover: Selection;

    navigateRight: Shape;
    navigateLeft: Shape;
    addCanvas: Shape;
    removeCanvas: Shape;

    meshes: Mesh[];

    onSurfaceCreated(): void {
        let gl = this.gl;
        gl.clearColor(1,1,1,1);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Init meshes 
        this.meshes = MeshSpecifications.map(spec => Mesh.fromSpecification(spec));
        
        // Init programs
        this.fillProgram = FillProgram.create(gl, this.meshes);
        this.strokeProgram = StrokeProgram.create(gl, this.meshes);
        this.ellipseProgram = EllipseProgram.create(gl);
        this.meshes.push(this.ellipseProgram.mesh);

        // Init foreground
        let grey = ColorFStruct.create$(.6,.6,.6,1);
        let squareMesh = this.meshes.find(mesh=> mesh.id === "square");
        this.foreground = new Shape({mesh: squareMesh, strokeColor: grey, lineWidth: 10});
        this.foreground.mapToRect(this.camera.target);
        
        // Init selection boxes
        let frameThickness = 0.08;
        let pointRadius = 0.05;
        let blue = ColorFStruct.create$(0, 0.2, 0.9, 0.9);
        let blueHover = ColorFStruct.create$(0, 0.3, 1, 0.6);
        let red = ColorFStruct.create$(1,0,0,0.9);
        let circleMesh = this.ellipseProgram.mesh;
        this.selectionHover = new Selection(
            new Shape({ mesh: squareMesh, strokeColor: blueHover, lineWidth: frameThickness, }),
        );
        this.selection = new Selection(
            new Shape({ mesh: squareMesh, strokeColor: blue, lineWidth: frameThickness, }),
            new Ellipse({ mesh: circleMesh, fillColor: red, matrix: Mat2dStruct.stretch(pointRadius)}),
            new Ellipse({ mesh: circleMesh, fillColor: red, matrix: Mat2dStruct.stretch(pointRadius)}),
        )

        // Init navigation buttons
        let black = ColorFStruct.create$(0,0,0,1);
        let arrow = this.meshes.find(mesh => mesh.id === "arrow");
        let x = this.meshes.find(mesh => mesh.id === "x");
        let lineWidth = 0.025;
        this.navigateLeft = new Shape({
            mesh: arrow, 
            fillColor:black,
            strokeColor: ColorFStruct.create$(0,0,0,0.5), 
            lineWidth: lineWidth, 
            matrix: Mat2dStruct.rotate(-Math.PI/2)
        });
        this.navigateRight = new Shape({
            mesh: arrow, 
            fillColor: black,
            strokeColor: ColorFStruct.create$(0,0,0,0.5), 
            lineWidth: lineWidth, 
            matrix: Mat2dStruct.rotate(Math.PI/2)
        });
        this.addCanvas = new Shape({
            mesh: x, 
            fillColor: black,
            strokeColor: ColorFStruct.create$(0,0,0,0.5), 
            lineWidth: lineWidth, 
            matrix: Mat2dStruct.rotate(Math.PI/4)
        });
        this.removeCanvas = new Shape({
            mesh: x, 
            fillColor: black,
            strokeColor: ColorFStruct.create$(0,0,0,0.5), 
            lineWidth: lineWidth, 
        })

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
            console.log("id", drawable.id, "zIndex", drawable.zIndex);
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

