import { ScaleToFit } from 'gl2d/struct/mat2d';
import { ShapeProgram } from 'gl2d/program/shape';
import { Mesh } from 'gl2d/graphics/mesh';
import { EllipseProgram } from 'gl2d/program/ellipse';
import { LineProgram } from 'gl2d/program/line';
import { ColorFStruct } from 'gl2d/struct/colorf';
import { Shape } from 'gl2d/graphics/shape';
import { RectStruct } from 'gl2d/struct/rect';
import { LineStruct } from 'gl2d/struct/line';
import { Renderer as Base } from 'gl2d/rendering/renderer'

export class Renderer extends Base {

    shapeProgram: ShapeProgram;
    ellipseProgram: EllipseProgram;
    lineProgram: LineProgram;

    color = ColorFStruct.create$(1,0.5, 0.5, 1);
    meshes =  [Mesh.diamond(), Mesh.star5()];
    shape = new Shape(this.meshes[0]);
    ellipse = RectStruct.create$(-1, 1,1, -1);
    line = LineStruct.create$(-1, 1, 1, -1);
    lineThickness = 0.3;

    onSurfaceCreated(): void {
        let gl = this.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        this.shape.fitInRect(this.ellipse, ScaleToFit.Fill);
        this.shapeProgram = ShapeProgram.create(gl, [Mesh.diamond(), Mesh.star5()]);
        this.ellipseProgram = EllipseProgram.create(gl);
        this.lineProgram = LineProgram.create(gl);
    }
    onDrawFrame(): void {
        let { gl, camera, shapeProgram, ellipseProgram, lineProgram } = this;
        this.useProgram(ellipseProgram);
        ellipseProgram.setProjection(gl, camera.matrix);
        ellipseProgram.setColor(gl, this.color);
        ellipseProgram.setEllipse(gl, this.ellipse);
        ellipseProgram.draw(gl);
        this.useProgram(lineProgram);
        lineProgram.setProjection(gl, camera.matrix);
        lineProgram.setColor(gl, this.color);
        lineProgram.setThickness(gl, this.lineThickness);
        lineProgram.setLine(gl, this.line);
        lineProgram.draw(gl);
        this.useProgram(shapeProgram);
        shapeProgram.setProjection(gl, camera.matrix);
        shapeProgram.setColor(gl, this.color);
        shapeProgram.setMesh(gl, this.shape.mesh);
        shapeProgram.setMatrix(gl, this.shape.matrix);
        shapeProgram.draw(gl);
    }
}