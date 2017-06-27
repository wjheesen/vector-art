var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("ts/action/action", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("res/build/mesh/specifications", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var MeshSpecifications;
    return {
        setters: [],
        execute: function () {
            exports_2("MeshSpecifications", MeshSpecifications = [{ "type": "polygon", "vertices": [12, 10.83, 7.41, 15.41, 6, 14, 12, 8, 18, 14, 16.59, 15.41], "id": "arrow" }, { "vertices": [0, 3, -2, 5, -3, 2, -5, 0, -8, 3, -10, 7, -17, 10, -13, 5, -12, -1, -3, -7, 0, -10, 3, -7, 12, -1, 13, 5, 17, 10, 10, 7, 8, 3, 5, 0, 3, 2, 2, 5], "triangleIndices": [0, 1, 2, 0, 2, 3, 0, 3, 9, 0, 9, 10, 0, 10, 11, 0, 11, 17, 0, 17, 18, 0, 18, 19, 4, 5, 6, 4, 6, 7, 4, 7, 8, 4, 8, 9, 4, 9, 3, 16, 14, 15, 16, 13, 14, 16, 12, 13, 16, 11, 12, 16, 17, 11], "id": "bat" }, { "vertices": [0, 3, -1, 4, -2, 3, -1, 2, -2, 1, -1, 0, 0, 1, 1, 0, 2, 1, 1, 2, 2, 3, 1, 4], "triangleIndices": [0, 1, 2, 0, 2, 3, 6, 3, 4, 6, 4, 5, 8, 9, 6, 8, 6, 7, 10, 11, 0, 10, 0, 9], "polygonIndices": [[0, 1, 2, 3], [3, 4, 5, 6], [6, 7, 8, 9], [9, 10, 11, 0]], "id": "blockFlower4" }, { "vertices": [0, 1, 1, 2, 0, 3, -1, 2, -1, 0, -2, 1, -3, 0, -2, -1, 0, -1, -1, -2, 0, -3, 1, -2, 1, 0, 2, -1, 3, 0, 2, 1], "triangleIndices": [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 0, 4, 8, 0, 8, 12], "polygonIndices": [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], [0, 4, 8, 12]], "id": "blockFlower5" }, { "type": "polygon", "vertices": [0, 0, -1, 1, -1, 0, 0, -1, 1, 0, 1, 1], "id": "chevron" }, { "type": "polygon", "vertices": [0, 0, 3, -3, 5, -3, 7, -1, 7, 1, 5, 3, 3, 3, 3, 5, 1, 7, -1, 7, -3, 5, -3, 3, -5, 3, -7, 1, -7, -1, -5, -3, -3, -3], "id": "cloud" }, { "type": "star", "points": 2, "ratio": 0.5, "id": "diamond" }, { "vertices": [0, -2, -1, -1, -2, -1, -2, -2, -3, -3, -1, -3, -2, -4, -2, -5, -1, -5, 0, -6, 0, -4, 1, -5, 2, -5, 2, -4, 3, -3, 1, -3, 2, -2, 2, -1, 1, -1, 0, 0], "triangleIndices": [5, 0, 1, 5, 1, 2, 5, 2, 3, 5, 3, 4, 5, 6, 7, 5, 7, 8, 5, 8, 9, 5, 9, 10, 5, 10, 0, 15, 0, 10, 15, 10, 11, 15, 11, 12, 15, 12, 13, 15, 13, 14, 15, 16, 17, 15, 17, 18, 15, 18, 19, 15, 19, 0], "id": "flower" }, { "type": "polygon", "vertices": [0, 12, -3, 16, -5, 16, -8, 12, -8, 8, 0, 0, 8, 8, 8, 12, 5, 16, 3, 16], "id": "heart" }, { "type": "polygon", "sides": 6, "id": "hexagon" }, { "vertices": [1, 2, -1, 2, 0, 1, -1, 0, 1, 0], "triangleIndices": [0, 1, 2, 2, 3, 4], "polygonIndices": [[0, 1, 2], [2, 3, 4]], "id": "hourglass" }, { "type": "polygon", "vertices": [0, 1, 1, 0, 3, 0, 2, 1, 4, 3, 2, 3, 2, 5, 1, 4, 0, 7, -1, 4, -2, 5, -2, 3, -4, 3, -2, 1, -3, 0, -1, 0], "id": "leaf" }, { "type": "polygon", "sides": 8, "id": "octagon" }, { "type": "polygon", "sides": 5, "id": "pentagon" }, { "vertices": [0, 8, -2, 6, -1, 6, -3, 4, -2, 4, -4, 2, -3, 2, -5, 0, 5, 0, 3, 2, 4, 2, 2, 4, 3, 4, 1, 6, 2, 6], "triangleIndices": [0, 1, 2, 0, 2, 13, 0, 13, 14, 2, 3, 4, 2, 4, 11, 2, 11, 12, 2, 12, 13, 4, 5, 6, 4, 6, 9, 4, 9, 10, 4, 10, 11, 6, 7, 8, 6, 8, 9], "id": "pineTree" }, { "type": "polygon", "vertices": [0, 3, -1, 1, 0, 0, 1, 1], "id": "raindrop" }, { "type": "polygon", "sides": 3, "effect": "spray", "innerRing": "3", "rings": "3", "id": "spray" }, { "type": "rectangle", "bounds": { "left": 0, "bottom": 0, "right": 1, "top": 1 }, "id": "square" }, { "type": "star", "points": 16, "ratio": 0.1, "id": "star16" }, { "type": "star", "points": 3, "ratio": 0.25, "id": "star3" }, { "type": "star", "points": 4, "ratio": 0.25, "id": "star4" }, { "type": "star", "points": 5, "ratio": 0.4, "id": "star5" }, { "type": "star", "points": 6, "ratio": 0.5, "id": "star6" }, { "type": "star", "points": 8, "ratio": 0.5, "id": "star8" }, { "type": "star", "points": 16, "ratio": 0.8, "id": "sun" }, { "type": "polygon", "vertices": [-1, 3, -2, 0, 2, 0, 1, 3], "id": "trapezoid" }, { "type": "polygon", "sides": 3, "id": "triangle" }, { "vertices": [2, 2, 1, 3, 0, 2, 1, 2, 0, 1, 1, 0, 1, 1, 2, 0, 3, 1, 2, 1, 3, 2, 2, 3], "triangleIndices": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "polygonIndices": [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]], "id": "triangleFlower1" }, { "vertices": [0, 0, -1, 1, -1, 0, -1, -1, 0, -1, 1, -1, 1, 0, 1, 1, 0, 1], "triangleIndices": [0, 1, 2, 0, 3, 4, 0, 5, 6, 0, 7, 8], "polygonIndices": [[0, 1, 2], [0, 3, 4], [0, 5, 6], [0, 7, 8]], "id": "triangleFlower2" }, { "vertices": [0, 2, -1, 1, -2, 0, -1, -1, 0, -2, 1, -1, 2, 0, 1, 1], "triangleIndices": [7, 0, 1, 1, 2, 3, 3, 4, 5, 5, 6, 7], "polygonIndices": [[7, 0, 1], [1, 2, 3], [3, 4, 5], [5, 6, 7]], "id": "triangleFrame" }, { "vertices": [0, 2, -0.57735025, 1, -1.1547005, 0, 0, 0, 1.1547005, 0, 0.57735025, 1], "triangleIndices": [0, 1, 5, 1, 2, 3, 3, 4, 5], "polygonIndices": [[0, 1, 5], [1, 2, 3], [3, 4, 5]], "id": "triforce" }, { "type": "polygon", "vertices": [0, 6, -4, 5, -7, 0, 7, 0, 4, 5], "id": "umbrella" }, { "vertices": [6.41, 19, 5, 17.59, 10.59, 12, 5, 6.41, 6.41, 5, 12, 10.59, 17.59, 5, 19, 6.41, 13.41, 12, 19, 17.59, 17.59, 19, 12, 13.41], "triangleIndices": [0, 1, 6, 0, 6, 7, 2, 3, 4, 2, 4, 5, 8, 9, 10, 8, 10, 11], "id": "x" }]);
        }
    };
});
System.register("ts/drawable/frame", ["gl2d/struct/rect", "gl2d/struct/point"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var rect_1, point_1, Frame;
    return {
        setters: [
            function (rect_1_1) {
                rect_1 = rect_1_1;
            },
            function (point_1_1) {
                point_1 = point_1_1;
            }
        ],
        execute: function () {
            Frame = (function () {
                function Frame(color, thickness, innerRect) {
                    this.color = color;
                    this.thickness = thickness;
                    if (innerRect === undefined) {
                        this.innerRect = new rect_1.RectStruct();
                    }
                    else {
                        this.innerRect = innerRect;
                    }
                }
                Frame.prototype.measureBoundaries = function () {
                    var bounds = rect_1.Rect.create(this.innerRect);
                    var inset = -this.thickness;
                    bounds.inset$(inset, inset);
                    return bounds;
                };
                Frame.prototype.contains = function (point) {
                    return this.measureBoundaries().contains(point);
                };
                /**
                 * Finds a vertex on this frame that is opposite the specified point.
                 * @param point the point.
                 * @return the vertex that is opposite the point.
                 */
                Frame.prototype.getVertexOpposite = function (point) {
                    var frame = this.innerRect;
                    var opposite = new point_1.Point();
                    // If the point is to the left of the frame center
                    if (point.x < frame.centerX()) {
                        // Then the opposite point is to the right of the frame center
                        opposite.x = frame.right;
                    }
                    else {
                        // Otherwise the opposite point is to the left of the frame center
                        opposite.x = frame.left;
                    }
                    // Similarly, if the point is below the fram center
                    if (point.y < frame.centerY()) {
                        // Then the opposite point is above the frame center
                        opposite.y = frame.top;
                    }
                    else {
                        // Then the opposite point is below the frame center
                        opposite.y = frame.bottom;
                    }
                    return opposite;
                };
                Frame.prototype.draw = function (renderer) {
                    var gl = renderer.gl;
                    var program = renderer.frameProgram;
                    renderer.attachProgram(program);
                    program.setProjection(gl, renderer.camera.matrix);
                    program.setInnerRect(gl, this.innerRect);
                    program.setColor(gl, this.color);
                    program.setThickness(gl, this.thickness);
                    program.draw(gl);
                };
                return Frame;
            }());
            exports_3("Frame", Frame);
        }
    };
});
System.register("ts/drawable/framed", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var FramedDrawable;
    return {
        setters: [],
        execute: function () {
            FramedDrawable = (function () {
                function FramedDrawable(frame, drawable) {
                    this.frame = frame;
                    this.target = drawable;
                }
                FramedDrawable.prototype.setTarget = function (target) {
                    this.target = target;
                    if (target) {
                        this.frame.innerRect.set(target.measureBoundaries());
                    }
                    else {
                        this.frame.innerRect.setScalar(0);
                    }
                };
                FramedDrawable.prototype.contains = function (point) {
                    return this.target && this.frame.contains(point);
                };
                FramedDrawable.prototype.draw = function (renderer) {
                    this.frame.draw(renderer);
                    this.target.draw(renderer); // Draw twice so target is shown on top and highlighted if transparent
                };
                return FramedDrawable;
            }());
            exports_4("FramedDrawable", FramedDrawable);
        }
    };
});
System.register("ts/drawable/shape", ["gl2d/drawable/shape", "gl2d/struct/color", "gl2d/struct/colorf", "gl2d/struct/mat2d"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var shape_1, color_1, colorf_1, mat2d_1, Shape;
    return {
        setters: [
            function (shape_1_1) {
                shape_1 = shape_1_1;
            },
            function (color_1_1) {
                color_1 = color_1_1;
            },
            function (colorf_1_1) {
                colorf_1 = colorf_1_1;
            },
            function (mat2d_1_1) {
                mat2d_1 = mat2d_1_1;
            }
        ],
        execute: function () {
            Shape = (function (_super) {
                __extends(Shape, _super);
                function Shape(mesh, color, matrix, zIndex, id) {
                    var _this = _super.call(this, mesh, matrix) || this;
                    _this.strokeColor = colorf_1.ColorFStruct.create$(0, 0, 0, 0.3);
                    _this.lineWidth = 0.025;
                    _this.color = color;
                    _this.zIndex = zIndex;
                    _this.id = id;
                    return _this;
                }
                Shape.prototype.mapToRect = function (dst, stf, preserveOrientation) {
                    if (preserveOrientation === void 0) { preserveOrientation = false; }
                    if (preserveOrientation) {
                        var src = preserveOrientation ? this.measureBoundaries() : this.mesh.bounds;
                        var matrix = mat2d_1.Mat2d.rectToRect(src, dst, stf);
                        this.transform(matrix);
                    }
                    else {
                        _super.prototype.mapToRect.call(this, dst, stf);
                    }
                };
                Shape.prototype.draw = function (renderer) {
                    var _a = this, color = _a.color, mesh = _a.mesh, matrix = _a.matrix, strokeColor = _a.strokeColor, lineWidth = _a.lineWidth;
                    var gl = renderer.gl, ext = renderer.ext, shapeProgram = renderer.shapeProgram, outlineProgram = renderer.outlineProgram;
                    renderer.attachProgram(shapeProgram);
                    shapeProgram.setProjection(gl, renderer.camera.matrix);
                    shapeProgram.setColor(gl, color);
                    shapeProgram.setVertices(gl, mesh);
                    shapeProgram.setMatrices(gl, matrix);
                    if (mesh.triangleIndices) {
                        var count_1 = mesh.triangleIndices.data.length;
                        var offset_1 = mesh.elementBufferOffset;
                        ext.drawElementsInstancedANGLE(gl.TRIANGLES, count_1, gl.UNSIGNED_SHORT, offset_1, 1);
                    }
                    else {
                        var count_2 = mesh.vertices.capacity();
                        ext.drawArraysInstancedANGLE(gl.TRIANGLES, 0, count_2, 1);
                    }
                    renderer.attachProgram(outlineProgram);
                    outlineProgram.setProjection(gl, renderer.camera.matrix);
                    outlineProgram.setMatrices(gl, matrix);
                    outlineProgram.setColor(gl, strokeColor);
                    outlineProgram.setVertices(gl, mesh);
                    outlineProgram.setMiters(gl, mesh);
                    outlineProgram.setLineWidth(gl, lineWidth);
                    var count = mesh.vertices.capacity() * 2 + 2;
                    var offset = mesh.strokeElementBufferOffset;
                    ext.drawElementsInstancedANGLE(gl.TRIANGLE_STRIP, count, gl.UNSIGNED_SHORT, offset, 1);
                };
                Shape.prototype.save = function (surface) {
                    var _this = this;
                    var database = surface.database, canvasId = surface.canvasId, zIndex = surface.zIndex;
                    this.zIndex = zIndex;
                    var color = color_1.ColorStruct.fromColorF(this.color).data.buffer;
                    var matrix = this.matrix.data.buffer;
                    database.getTypeId(this.mesh.id).then(function (typeId) {
                        database.shapes.add({
                            zIndex: zIndex,
                            canvasId: canvasId.val,
                            typeId: typeId,
                            color: color,
                            matrix: matrix
                        }).then(function (id) { return _this.id = id; });
                    });
                };
                Shape.prototype.delete = function (surface) {
                    surface.database.shapes.delete(this.id);
                };
                Shape.prototype.updateColor = function (surface, color) {
                    this.color.setFromColor(color);
                    surface.database.shapes.update(this.id, {
                        color: color.data.buffer
                    });
                };
                Shape.prototype.updateZIndex = function (surface, zIndex) {
                    this.zIndex = zIndex;
                    surface.database.shapes.update(this.id, {
                        zIndex: zIndex
                    });
                };
                Shape.prototype.updatePosition = function (surface) {
                    surface.database.shapes.update(this.id, {
                        matrix: this.matrix.data.buffer
                    });
                };
                return Shape;
            }(shape_1.Shape));
            exports_5("Shape", Shape);
        }
    };
});
System.register("ts/drawable/ellipse", ["ts/drawable/shape", "gl2d/struct/rect"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var shape_2, rect_2, Ellipse;
    return {
        setters: [
            function (shape_2_1) {
                shape_2 = shape_2_1;
            },
            function (rect_2_1) {
                rect_2 = rect_2_1;
            }
        ],
        execute: function () {
            Ellipse = (function (_super) {
                __extends(Ellipse, _super);
                function Ellipse() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * Sets this ellipse to an ellipse with the specified axes and center point.
                 * @param rx the semi-x axis.
                 * @param ry the semi-y axis.
                 * @param center the center of the ellipse. Defaults to the origin.
                 */
                Ellipse.prototype.set = function (rx, ry, center) {
                    this.matrix.setScale(rx, ry);
                    if (center) {
                        this.matrix.postTranslate(center);
                    }
                };
                Ellipse.prototype.measureBoundaries = function () {
                    return Ellipse.measureBoundaries(this.matrix);
                };
                /**
                 * Measures the boundaries of a unit circle transformed to an ellipse by the specified matrix.
                 * @param matrix the transformation matrix.
                 */
                Ellipse.measureBoundaries = function (matrix) {
                    // Performs singular value decomposition of the model matrix to extract
                    // (1) The length of the semi-x axis (sx), which is equal to the first singular value in the Sigma matrix
                    // (2) The length of the semi-y axis (sy), which is equal to the second singular value in the Sigma matrix
                    // (3) The rotation angle (theta), from -PI/2 to PI/2, which is equal to the angle used to form the U matrix
                    // Note: there is no need to compute the matrix V*
                    // Boundaries are then computed with the formula:
                    // x = (sx)^2 * (cos(theta)^2) + (sy)^2*(sin(theta)^2)
                    // y = (sx)^2 * (sin(theta)^2) + (sy)^2*(cos(theta)^2)
                    // left = tx - x, right = tx + x, bottom = ty - y, top = ty + y
                    var a = matrix.c1r1, b = matrix.c2r1, tx = matrix.c3r1, c = matrix.c1r2, d = matrix.c2r2, ty = matrix.c3r2;
                    // Helper variables:
                    var a2 = a * a;
                    var b2 = b * b;
                    var c2 = c * c;
                    var d2 = d * d;
                    var m = a * c + b * d;
                    var n = a2 + b2 - c2 - d2;
                    // Cos and sin of angle squared:
                    var theta = 0.5 * Math.atan2(2 * m, n);
                    var cos2 = Math.pow(Math.cos(theta), 2);
                    var sin2 = Math.pow(Math.sin(theta), 2);
                    // Length of axes squared:
                    var s1 = a2 + b2 + c2 + d2;
                    var s2 = Math.sqrt(Math.pow(n, 2) + 4 * Math.pow(m, 2));
                    var sx2 = 0.5 * (s1 + s2);
                    var sy2 = 0.5 * (s1 - s2);
                    // Boundaries:
                    var x = Math.sqrt(sx2 * cos2 + sy2 * sin2);
                    var y = Math.sqrt(sx2 * sin2 + sy2 * cos2);
                    return rect_2.Rect.lrbt(tx - x, tx + x, ty - y, ty + y);
                };
                /**
                 * Checks if this ellipse contains the point (x,y).
                 * @param point the point to check.
                 * @param inverse the inverse of this ellipse's model matrix. If undefined, the inverse matrix will be calculated on the fly.
                 */
                Ellipse.prototype.contains = function (pt, inverse) {
                    var modelPoint = this.convertPointToModelSpace(pt, inverse);
                    if (this.mesh.bounds.contains(modelPoint)) {
                        return modelPoint.distance2() <= 1;
                    }
                    else {
                        return false;
                    }
                };
                Ellipse.prototype.draw = function (renderer) {
                    var gl = renderer.gl;
                    var program = renderer.ellipseProgram;
                    renderer.attachProgram(program);
                    program.setProjection(gl, renderer.camera.matrix);
                    program.setColor(gl, this.color);
                    program.setMatrices(gl, this.matrix);
                    program.draw(renderer);
                };
                return Ellipse;
            }(shape_2.Shape));
            exports_6("Ellipse", Ellipse);
        }
    };
});
System.register("ts/drawable/selection", ["ts/drawable/shape", "ts/drawable/ellipse", "ts/drawable/frame", "gl2d/struct/mat2d"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var shape_3, ellipse_1, frame_1, mat2d_2, Selection;
    return {
        setters: [
            function (shape_3_1) {
                shape_3 = shape_3_1;
            },
            function (ellipse_1_1) {
                ellipse_1 = ellipse_1_1;
            },
            function (frame_1_1) {
                frame_1 = frame_1_1;
            },
            function (mat2d_2_1) {
                mat2d_2 = mat2d_2_1;
            }
        ],
        execute: function () {
            Selection = (function () {
                function Selection(frame, pivot, control) {
                    this.frame = frame;
                    this.pivot = pivot;
                    this.control = control;
                }
                Selection.create = function (frameColor, frameThickness, pointMesh, pointColor, pointRadius) {
                    var frame = new frame_1.Frame(frameColor, frameThickness);
                    var pivot = new ellipse_1.Ellipse(pointMesh, pointColor, mat2d_2.Mat2dStruct.stretch(pointRadius));
                    var control = new ellipse_1.Ellipse(pointMesh, pointColor, mat2d_2.Mat2dStruct.stretch(pointRadius));
                    return new Selection(frame, pivot, control);
                };
                Selection.prototype.setTarget = function (target) {
                    this.target = target;
                    if (target) {
                        var bounds = target.measureBoundaries();
                        this.frame.innerRect.set(bounds);
                        this.pivot.offsetTo(this.getPivot());
                        this.control.offsetTo(this.getControl());
                    }
                    else {
                        this.frame.innerRect.setScalar(0);
                    }
                };
                Selection.prototype.contains = function (point) {
                    return this.target &&
                        (this.frame.contains(point) ||
                            this.pivot.contains(point) ||
                            this.control.contains(point));
                };
                Selection.prototype.offset = function (vec) {
                    this.target.offset(vec);
                    this.frame.innerRect.offset(vec);
                    this.pivot.offset(vec);
                    this.control.offset(vec);
                };
                Selection.prototype.scale = function (scale) {
                    var target = this.target;
                    var frameRect = this.frame.innerRect;
                    target.transform(scale);
                    scale.mapRect(frameRect, frameRect);
                    this.pivot.offsetTo(this.getPivot());
                    this.control.offsetTo(this.getControl());
                };
                Selection.prototype.transform = function (matrix) {
                    // Transform target and frame
                    var target = this.target;
                    this.target.transform(matrix);
                    this.frame.innerRect.set(target.measureBoundaries());
                    // Transform pivot point
                    var pc = this.pivot.measureCenter();
                    matrix.map(pc, pc);
                    this.pivot.offsetTo(pc);
                    // Transform control point        
                    var cc = this.control.measureCenter();
                    matrix.map(cc, cc);
                    this.control.offsetTo(cc);
                };
                Selection.prototype.getPivot = function () {
                    if (this.target instanceof shape_3.Shape) {
                        return this.target.measurePivot();
                    }
                    else {
                        return this.frame.innerRect.centerTop();
                    }
                };
                Selection.prototype.getControl = function () {
                    if (this.target instanceof shape_3.Shape) {
                        return this.target.measureControl();
                    }
                    else {
                        return this.frame.innerRect.centerBottom();
                    }
                };
                Selection.prototype.draw = function (renderer) {
                    this.frame.draw(renderer);
                    this.pivot.draw(renderer);
                    this.control.draw(renderer);
                };
                return Selection;
            }());
            exports_7("Selection", Selection);
        }
    };
});
System.register("ts/program/program", ["gl2d/rendering/program"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var program_1, Program;
    return {
        setters: [
            function (program_1_1) {
                program_1 = program_1_1;
            }
        ],
        execute: function () {
            Program = (function (_super) {
                __extends(Program, _super);
                function Program() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Program;
            }(program_1.Program));
            exports_8("Program", Program);
        }
    };
});
System.register("res/build/shader/ellipse", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var vertex, fragment, UniformRenaming, AttributeRenaming;
    return {
        setters: [],
        execute: function () {
            exports_9("vertex", vertex = "precision mediump float;uniform mat4 e;attribute mat2 f;attribute vec2 g,c;varying vec2 a;void main(){vec2 b=f*c+g;gl_Position=e*vec4(b,1.,1.),a=c;}");
            exports_9("fragment", fragment = "precision mediump float;uniform vec4 h;varying vec2 a;void main(){float b=dot(a,a),d=float(b<=1.);gl_FragColor=h*d;}");
            exports_9("UniformRenaming", UniformRenaming = { "projection": "e", "color": "h" });
            exports_9("AttributeRenaming", AttributeRenaming = { "model": "f", "offset": "g", "position": "c" });
        }
    };
});
System.register("ts/program/ellipse", ["ts/program/program", "gl2d/drawable/mesh", "gl2d/rendering/util", "res/build/shader/ellipse"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var program_2, mesh_1, Util, Shader, EllipseProgram;
    return {
        setters: [
            function (program_2_1) {
                program_2 = program_2_1;
            },
            function (mesh_1_1) {
                mesh_1 = mesh_1_1;
            },
            function (Util_1) {
                Util = Util_1;
            },
            function (Shader_1) {
                Shader = Shader_1;
            }
        ],
        execute: function () {
            /**
             * Program for rendering ellipses.
             */
            EllipseProgram = (function (_super) {
                __extends(EllipseProgram, _super);
                function EllipseProgram() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.mesh = mesh_1.Mesh.fromSpecification({ id: "circle", vertices: [-1, 1, -1, -1, 1, -1, 1, 1] });
                    return _this;
                }
                EllipseProgram.create = function (gl) {
                    var program = new EllipseProgram();
                    program.location = Util.createProgramFromSources(gl, Shader.vertex, Shader.fragment);
                    program.uniforms = Util.getUniformLocations(gl, program.location, Shader.UniformRenaming);
                    program.attribs = Util.getAttributeLocations(gl, program.location, Shader.AttributeRenaming);
                    program.positionBuffer = Util.createArrayBuffer(gl, program.mesh.vertices.data);
                    program.matrixBuffer = gl.createBuffer();
                    return program;
                };
                EllipseProgram.prototype.onAttach = function (renderer) {
                    var gl = renderer.gl, ext = renderer.ext;
                    var c1 = this.attribs.model;
                    var c2 = c1 + 1;
                    var c3 = this.attribs.offset;
                    // Enable blending (for transparency)
                    gl.enable(gl.BLEND);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
                    gl.enableVertexAttribArray(this.attribs.position);
                    gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, 0);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer);
                    gl.enableVertexAttribArray(c1);
                    gl.enableVertexAttribArray(c2);
                    gl.enableVertexAttribArray(c3);
                    ext.vertexAttribDivisorANGLE(c1, 1);
                    ext.vertexAttribDivisorANGLE(c2, 1);
                    ext.vertexAttribDivisorANGLE(c3, 1);
                };
                EllipseProgram.prototype.onDetach = function (renderer) {
                    var ext = renderer.ext;
                    var c1 = this.attribs.model;
                    var c2 = c1 + 1;
                    var c3 = this.attribs.offset;
                    ext.vertexAttribDivisorANGLE(c1, 0);
                    ext.vertexAttribDivisorANGLE(c2, 0);
                    ext.vertexAttribDivisorANGLE(c3, 0);
                };
                /**
                 * Sets this program's projection matrix.
                 */
                EllipseProgram.prototype.setProjection = function (gl, projection) {
                    gl.uniformMatrix4fv(this.uniforms.projection, false, projection.data);
                };
                /**
                  * Sets the matrix for each ellipse instance.
                  */
                EllipseProgram.prototype.setMatrices = function (gl, matrices) {
                    // Note: assumes 
                    // (1) matrix buffer is already bound
                    // (2) attrib arrays are already enabled
                    // (3) attrib divisors have already been specified
                    var c1 = this.attribs.model;
                    var c2 = c1 + 1;
                    var c3 = this.attribs.offset;
                    // Load data into WebGL
                    gl.bufferData(gl.ARRAY_BUFFER, matrices.data, gl.DYNAMIC_DRAW);
                    // Set first column vector (part of mat2)
                    gl.vertexAttribPointer(c1, 2, gl.FLOAT, false, 24, 0);
                    // Set second column vector (part of mat2)
                    gl.vertexAttribPointer(c2, 2, gl.FLOAT, false, 24, 8);
                    // Set third column vector (separate vec2)
                    gl.vertexAttribPointer(c3, 2, gl.FLOAT, false, 24, 16);
                };
                /**
                 * Sets this program's draw color.
                 */
                EllipseProgram.prototype.setColor = function (gl, color) {
                    gl.uniform4fv(this.uniforms.color, color.data);
                };
                /**
                 * Draws an ellipse using the color and bounds data loaded into the program.
                 */
                EllipseProgram.prototype.draw = function (renderer, primcount) {
                    if (primcount === void 0) { primcount = 1; }
                    var gl = renderer.gl;
                    var ext = renderer.ext;
                    ext.drawArraysInstancedANGLE(gl.TRIANGLE_FAN, 0, 4, primcount);
                };
                return EllipseProgram;
            }(program_2.Program));
            exports_10("EllipseProgram", EllipseProgram);
        }
    };
});
System.register("res/build/shader/frame", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var vertex, fragment, UniformRenaming, AttributeRenaming;
    return {
        setters: [],
        execute: function () {
            exports_11("vertex", vertex = "precision mediump float;uniform mat4 l;uniform vec4 f;uniform float a;attribute vec2 i;varying vec2 g,h;void main(){float b=f.x-a,j=f.y+a,k=f.z+a,c=f.w-a,d=k-b,e=j-c,m=d*i.x+b,n=e*i.y+c;gl_Position=l*vec4(m,n,1.,1.),g=vec2(a/d,a/e),h=i;}");
            exports_11("fragment", fragment = "precision mediump float;uniform vec4 o;varying vec2 g,h;void main(){float b=h.x,c=h.y,d=g.x,e=g.y;gl_FragColor=o*float(b<d||c<e||b>1.-d||c>1.-e);}");
            exports_11("UniformRenaming", UniformRenaming = { "projection": "l", "innerRect": "f", "thickness": "a", "color": "o" });
            exports_11("AttributeRenaming", AttributeRenaming = { "basisCoord": "i" });
        }
    };
});
System.register("ts/program/frame", ["ts/program/program", "res/build/shader/frame", "gl2d/rendering/util"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var program_3, Shader, Util, FrameProgram;
    return {
        setters: [
            function (program_3_1) {
                program_3 = program_3_1;
            },
            function (Shader_2) {
                Shader = Shader_2;
            },
            function (Util_2) {
                Util = Util_2;
            }
        ],
        execute: function () {
            /**
             * Program for rendering frames.
             */
            FrameProgram = (function (_super) {
                __extends(FrameProgram, _super);
                function FrameProgram() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * Creates a program that can render frames.
                 */
                FrameProgram.create = function (gl) {
                    var program = new FrameProgram();
                    program.location = Util.createProgramFromSources(gl, Shader.vertex, Shader.fragment);
                    program.uniforms = Util.getUniformLocations(gl, program.location, Shader.UniformRenaming);
                    program.attribs = Util.getAttributeLocations(gl, program.location, Shader.AttributeRenaming);
                    program.positionBuffer = Util.createArrayBuffer(gl, new Float32Array([0, 1, 0, 0, 1, 0, 1, 1]));
                    return program;
                };
                FrameProgram.prototype.onAttach = function (renderer) {
                    var gl = renderer.gl;
                    // Enable blending (for transparency)
                    gl.enable(gl.BLEND);
                    // Bind position buffer
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
                    gl.enableVertexAttribArray(this.attribs.basisCoord);
                    gl.vertexAttribPointer(this.attribs.basisCoord, 2, gl.FLOAT, false, 0, 0);
                };
                FrameProgram.prototype.onDetach = function (renderer) {
                };
                /**
                 * Sets this program's projection matrix.
                 */
                FrameProgram.prototype.setProjection = function (gl, projection) {
                    gl.uniformMatrix4fv(this.uniforms.projection, false, projection.data);
                };
                /**
                 * Sets this program's draw color.
                 */
                FrameProgram.prototype.setColor = function (gl, color) {
                    gl.uniform4fv(this.uniforms.color, color.data);
                };
                /**
                  * Sets the matrix applied to shapes this program will draw.
                  */
                FrameProgram.prototype.setInnerRect = function (gl, innerRect) {
                    gl.uniform4fv(this.uniforms.innerRect, innerRect.data);
                };
                /**
                  * Sets the thickness of the frames this program will draw.
                  */
                FrameProgram.prototype.setThickness = function (gl, thickness) {
                    gl.uniform1f(this.uniforms.thickness, thickness);
                };
                /**
                 * Draws a shape using the color, mesh, and mesh matrix loaded into this program.
                 */
                FrameProgram.prototype.draw = function (gl) {
                    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
                };
                return FrameProgram;
            }(program_3.Program));
            exports_12("FrameProgram", FrameProgram);
        }
    };
});
System.register("res/build/shader/outline", [], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var vertex, fragment, UniformRenaming, AttributeRenaming;
    return {
        setters: [],
        execute: function () {
            exports_13("vertex", vertex = "precision mediump float;uniform mat4 d;uniform float e;attribute mat2 c;attribute vec2 f,g,b;void main(){float a=length(b)*e;vec2 i=a==0.?b:a*normalize(c*b),j=c*g+f+i;gl_Position=d*vec4(j,1.,1.);}");
            exports_13("fragment", fragment = "precision mediump float;uniform vec4 h;void main(){gl_FragColor=h;}");
            exports_13("UniformRenaming", UniformRenaming = { "projection": "d", "lineWidth": "e", "color": "h" });
            exports_13("AttributeRenaming", AttributeRenaming = { "model": "c", "offset": "f", "position": "g", "miter": "b" });
        }
    };
});
System.register("res/build/shader/shape", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var vertex, fragment, UniformRenaming, AttributeRenaming;
    return {
        setters: [],
        execute: function () {
            exports_14("vertex", vertex = "precision mediump float;uniform mat4 b;attribute mat2 c;attribute vec2 a,d;void main(){vec2 f=c*d+a;gl_Position=b*vec4(f,1.,1.);}");
            exports_14("fragment", fragment = "precision mediump float;uniform vec4 e;void main(){gl_FragColor=e;}");
            exports_14("UniformRenaming", UniformRenaming = { "projection": "b", "color": "e" });
            exports_14("AttributeRenaming", AttributeRenaming = { "model": "c", "offset": "a", "position": "d" });
        }
    };
});
System.register("ts/program/shape", ["ts/program/program", "gl2d/rendering/util", "res/build/shader/shape"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    function isMesh(src) {
        return !!src.vertices;
    }
    /**
    * Packs mesh vertices into a single buffer.
    * @param meshes the meshes to pack.
    * @returns the packed vertices.
    */
    function packMeshVertices(gl, meshes) {
        // Create an array buffer big enough to hold all the vertices
        var size = 0;
        for (var _i = 0, meshes_1 = meshes; _i < meshes_1.length; _i++) {
            var mesh = meshes_1[_i];
            size += mesh.vertices.data.byteLength;
        }
        var buffer = Util.createArrayBuffer(gl, size, gl.STATIC_DRAW);
        // Pack the vertices into the buffer, saving the byte offsets
        var offset = 0;
        for (var _a = 0, meshes_2 = meshes; _a < meshes_2.length; _a++) {
            var mesh = meshes_2[_a];
            var data = mesh.vertices.data;
            gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
            mesh.vertexBufferOffset = offset;
            offset += data.byteLength;
        }
        return buffer;
    }
    /**
    * Packs mesh indices into a single buffer.
    * @param meshes the meshes to pack.
    * @returns the packed indices.
    */
    function packMeshIndices(gl, meshes) {
        // Create an array buffer big enough to hold all the indices
        var size = 0;
        for (var _i = 0, meshes_3 = meshes; _i < meshes_3.length; _i++) {
            var mesh = meshes_3[_i];
            size += mesh.triangleIndices.data.byteLength;
        }
        var buffer = Util.createElementBuffer(gl, size, gl.STATIC_DRAW);
        // Pack the indices into the buffer, saving the byte offsets
        var offset = 0;
        for (var _a = 0, meshes_4 = meshes; _a < meshes_4.length; _a++) {
            var mesh = meshes_4[_a];
            var data = mesh.triangleIndices.data;
            gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offset, data);
            mesh.elementBufferOffset = offset;
            offset += data.byteLength;
        }
        return buffer;
    }
    var program_4, Util, Shader, ShapeProgram;
    return {
        setters: [
            function (program_4_1) {
                program_4 = program_4_1;
            },
            function (Util_3) {
                Util = Util_3;
            },
            function (Shader_3) {
                Shader = Shader_3;
            }
        ],
        execute: function () {
            /**
             * Program for rendering shapes.
             */
            ShapeProgram = (function (_super) {
                __extends(ShapeProgram, _super);
                function ShapeProgram() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ShapeProgram.create = function (gl, meshes) {
                    var program = new ShapeProgram();
                    program.location = Util.createProgramFromSources(gl, Shader.vertex, Shader.fragment);
                    program.uniforms = Util.getUniformLocations(gl, program.location, Shader.UniformRenaming);
                    program.attribs = Util.getAttributeLocations(gl, program.location, Shader.AttributeRenaming);
                    program.elementBuffer = packMeshIndices(gl, meshes);
                    program.positionBuffer = packMeshVertices(gl, meshes);
                    program.matrixBuffer = gl.createBuffer();
                    program.dynamicBuffer = gl.createBuffer();
                    return program;
                };
                ShapeProgram.prototype.onAttach = function (renderer) {
                    var gl = renderer.gl, ext = renderer.ext;
                    var column1 = this.attribs.model;
                    var column2 = column1 + 1;
                    var column3 = this.attribs.offset;
                    gl.enable(gl.BLEND);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
                    gl.enableVertexAttribArray(this.attribs.position);
                    // Enable a separate array for each column of the 3x2 model matrix
                    gl.enableVertexAttribArray(column1);
                    gl.enableVertexAttribArray(column2);
                    gl.enableVertexAttribArray(column3);
                    // Only change the model matrix when the instance changes
                    ext.vertexAttribDivisorANGLE(column1, 1);
                    ext.vertexAttribDivisorANGLE(column2, 1);
                    ext.vertexAttribDivisorANGLE(column3, 1);
                };
                ShapeProgram.prototype.onDetach = function (renderer) {
                    var ext = renderer.ext;
                    var column1 = this.attribs.model;
                    var column2 = column1 + 1;
                    var column3 = this.attribs.offset;
                    // Disable instancing of 3x2 model matrix (because it affects global state)
                    ext.vertexAttribDivisorANGLE(column1, 0);
                    ext.vertexAttribDivisorANGLE(column2, 0);
                    ext.vertexAttribDivisorANGLE(column3, 0);
                };
                /**
                 * Sets this program's projection matrix.
                 */
                ShapeProgram.prototype.setProjection = function (gl, projection) {
                    gl.uniformMatrix4fv(this.uniforms.projection, false, projection.data);
                };
                /**
                 * Sets this program's draw color.
                 */
                ShapeProgram.prototype.setColor = function (gl, color) {
                    gl.uniform4fv(this.uniforms.color, color.data);
                };
                /**
                 * Sets the vertices used to draw the shape.
                 */
                ShapeProgram.prototype.setVertices = function (gl, src) {
                    if (isMesh(src)) {
                        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
                        gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, src.vertexBufferOffset);
                    }
                    else {
                        gl.bindBuffer(gl.ARRAY_BUFFER, this.dynamicBuffer);
                        gl.bufferData(gl.ARRAY_BUFFER, src.data, gl.DYNAMIC_DRAW);
                        gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, 0);
                    }
                };
                /**
                  * Sets the matrix for each shape instance.
                  */
                ShapeProgram.prototype.setMatrices = function (gl, matrices) {
                    var column1 = this.attribs.model;
                    var column2 = column1 + 1;
                    var column3 = this.attribs.offset;
                    // Load data into WebGL
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer);
                    gl.bufferData(gl.ARRAY_BUFFER, matrices.data, gl.DYNAMIC_DRAW);
                    // Set each column of the 3x2 model matrix
                    gl.vertexAttribPointer(column1, 2, gl.FLOAT, false, 24, 0);
                    gl.vertexAttribPointer(column2, 2, gl.FLOAT, false, 24, 8);
                    gl.vertexAttribPointer(column3, 2, gl.FLOAT, false, 24, 16);
                };
                return ShapeProgram;
            }(program_4.Program));
            exports_15("ShapeProgram", ShapeProgram);
        }
    };
});
System.register("ts/program/outline", ["gl2d/drawable/mesh", "gl2d/rendering/util", "res/build/shader/outline", "ts/program/shape"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    function packMiterBuffer(gl, meshes) {
        // Create an array buffer big enough to hold all the vertices
        var size = 0;
        for (var _i = 0, meshes_5 = meshes; _i < meshes_5.length; _i++) {
            var mesh = meshes_5[_i];
            size += mesh.vertices.data.byteLength;
        }
        var buffer = Util.createArrayBuffer(gl, size * 2, gl.STATIC_DRAW);
        // Pack the vertices into the buffer, saving the byte offsets
        var offset = 0;
        for (var _a = 0, meshes_6 = meshes; _a < meshes_6.length; _a++) {
            var mesh = meshes_6[_a];
            if (mesh instanceof mesh_2.PolygonMesh) {
                var data = mesh.miters.data;
                mesh.miterBufferOffset = offset;
                offset += data.byteLength; // Leave zeros
                gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
                offset += data.byteLength;
            }
        }
        return buffer;
    }
    /**
    * Packs mesh vertices into a single buffer.
    * @param meshes the meshes to pack.
    * @returns the packed vertices.
    */
    function packMeshVertices(gl, meshes) {
        // Create an array buffer big enough to hold all the vertices
        var size = 0;
        for (var _i = 0, meshes_7 = meshes; _i < meshes_7.length; _i++) {
            var mesh = meshes_7[_i];
            size += mesh.vertices.data.byteLength;
        }
        var buffer = Util.createArrayBuffer(gl, size * 2, gl.STATIC_DRAW);
        // Pack the vertices into the buffer, saving the byte offsets
        var offset = 0;
        for (var _a = 0, meshes_8 = meshes; _a < meshes_8.length; _a++) {
            var mesh = meshes_8[_a];
            var data = mesh.vertices.data;
            // Repeat vertex data twice in buffer
            gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
            mesh.strokeVertexBufferOffset = offset;
            offset += data.byteLength;
            gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
            offset += data.byteLength;
        }
        return buffer;
    }
    /**
    * Packs mesh indices into a single buffer.
    * @param meshes the meshes to pack.
    * @returns the packed indices.
    */
    function packMeshIndices(gl, meshes) {
        // Create an array buffer big enough to hold all the indices (2 per vertex)
        var size = 0;
        for (var _i = 0, meshes_9 = meshes; _i < meshes_9.length; _i++) {
            var mesh = meshes_9[_i];
            size += mesh.vertices.data.byteLength;
        }
        var buffer = Util.createElementBuffer(gl, size * 2, gl.STATIC_DRAW);
        // Pack the indices into the buffer, saving the byte offsets
        var offset = 0;
        for (var _a = 0, meshes_10 = meshes; _a < meshes_10.length; _a++) {
            var mesh = meshes_10[_a];
            var count = mesh.vertices.capacity();
            var arr = [];
            for (var i = 0; i < count; i++) {
                arr.push(i, i + count);
            }
            arr.push(0, count); // close
            var indices = new Uint16Array(arr);
            gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offset, indices);
            mesh.strokeElementBufferOffset = offset;
            offset += indices.byteLength;
        }
        return buffer;
    }
    var mesh_2, Util, Shader, shape_4, OutlineProgram;
    return {
        setters: [
            function (mesh_2_1) {
                mesh_2 = mesh_2_1;
            },
            function (Util_4) {
                Util = Util_4;
            },
            function (Shader_4) {
                Shader = Shader_4;
            },
            function (shape_4_1) {
                shape_4 = shape_4_1;
            }
        ],
        execute: function () {
            OutlineProgram = (function (_super) {
                __extends(OutlineProgram, _super);
                function OutlineProgram() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OutlineProgram.create = function (gl, meshes) {
                    var program = new OutlineProgram();
                    program.location = Util.createProgramFromSources(gl, Shader.vertex, Shader.fragment);
                    program.uniforms = Util.getUniformLocations(gl, program.location, Shader.UniformRenaming);
                    program.attribs = Util.getAttributeLocations(gl, program.location, Shader.AttributeRenaming);
                    program.elementBuffer = packMeshIndices(gl, meshes);
                    program.positionBuffer = packMeshVertices(gl, meshes);
                    program.miterBuffer = packMiterBuffer(gl, meshes);
                    program.matrixBuffer = gl.createBuffer();
                    program.dynamicBuffer = gl.createBuffer();
                    return program;
                };
                OutlineProgram.prototype.onAttach = function (renderer) {
                    _super.prototype.onAttach.call(this, renderer);
                    renderer.gl.enableVertexAttribArray(this.attribs.miter);
                };
                /**
                 * Sets the vertices used to draw the outline.
                 */
                OutlineProgram.prototype.setVertices = function (gl, src) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
                    gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 0, src.strokeVertexBufferOffset);
                };
                OutlineProgram.prototype.setMiters = function (gl, mesh) {
                    if (mesh instanceof mesh_2.PolygonMesh) {
                        gl.bindBuffer(gl.ARRAY_BUFFER, this.miterBuffer);
                        gl.vertexAttribPointer(this.attribs.miter, 2, gl.FLOAT, false, 0, mesh.miterBufferOffset);
                    }
                };
                OutlineProgram.prototype.setLineWidth = function (gl, lineWidth) {
                    gl.uniform1f(this.uniforms.lineWidth, lineWidth);
                };
                return OutlineProgram;
            }(shape_4.ShapeProgram));
            exports_16("OutlineProgram", OutlineProgram);
        }
    };
});
System.register("ts/rendering/renderer", ["gl2d/drawable/mesh", "gl2d/rendering/renderer", "gl2d/struct/colorf", "gl2d/struct/mat2d", "gl2d/struct/rect", "res/build/mesh/specifications", "ts/drawable/frame", "ts/drawable/framed", "ts/drawable/selection", "ts/drawable/shape", "ts/program/ellipse", "ts/program/frame", "ts/program/outline", "ts/program/shape"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var mesh_3, renderer_1, colorf_2, mat2d_3, rect_3, specifications_1, frame_2, framed_1, selection_1, shape_5, ellipse_2, frame_3, outline_1, shape_6, Renderer;
    return {
        setters: [
            function (mesh_3_1) {
                mesh_3 = mesh_3_1;
            },
            function (renderer_1_1) {
                renderer_1 = renderer_1_1;
            },
            function (colorf_2_1) {
                colorf_2 = colorf_2_1;
            },
            function (mat2d_3_1) {
                mat2d_3 = mat2d_3_1;
            },
            function (rect_3_1) {
                rect_3 = rect_3_1;
            },
            function (specifications_1_1) {
                specifications_1 = specifications_1_1;
            },
            function (frame_2_1) {
                frame_2 = frame_2_1;
            },
            function (framed_1_1) {
                framed_1 = framed_1_1;
            },
            function (selection_1_1) {
                selection_1 = selection_1_1;
            },
            function (shape_5_1) {
                shape_5 = shape_5_1;
            },
            function (ellipse_2_1) {
                ellipse_2 = ellipse_2_1;
            },
            function (frame_3_1) {
                frame_3 = frame_3_1;
            },
            function (outline_1_1) {
                outline_1 = outline_1_1;
            },
            function (shape_6_1) {
                shape_6 = shape_6_1;
            }
        ],
        execute: function () {
            Renderer = (function (_super) {
                __extends(Renderer, _super);
                function Renderer() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.drawables = [];
                    return _this;
                }
                Renderer.prototype.onSurfaceCreated = function () {
                    var gl = this.gl;
                    gl.clearColor(1, 1, 1, 1);
                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                    // Init meshes 
                    this.meshes = specifications_1.MeshSpecifications.map(function (spec) { return mesh_3.Mesh.fromSpecification(spec); });
                    // Init programs
                    this.shapeProgram = shape_6.ShapeProgram.create(gl, this.meshes);
                    this.outlineProgram = outline_1.OutlineProgram.create(gl, this.meshes);
                    this.ellipseProgram = ellipse_2.EllipseProgram.create(gl);
                    this.meshes.push(this.ellipseProgram.mesh);
                    this.frameProgram = frame_3.FrameProgram.create(gl);
                    // Init background
                    this.foreground = new frame_2.Frame(colorf_2.ColorFStruct.create$(.6, .6, .6, 1), 10, this.camera.target);
                    // Init selection boxes
                    var frameThickness = 0.08;
                    var pointRadius = 0.05;
                    var blue = colorf_2.ColorFStruct.create$(0, 0.2, 0.9, 0.9);
                    var blueHover = colorf_2.ColorFStruct.create$(0, 0.2, 0.9, 0.5);
                    var red = colorf_2.ColorFStruct.create$(1, 0, 0, 0.9);
                    var pointMesh = this.ellipseProgram.mesh;
                    this.selection = selection_1.Selection.create(blue, frameThickness, pointMesh, red, pointRadius);
                    this.selectionHover = new framed_1.FramedDrawable(new frame_2.Frame(blueHover, frameThickness));
                    // Init navigation buttons
                    var black = colorf_2.ColorFStruct.create$(0, 0, 0, 1);
                    var arrow = this.meshes.find(function (mesh) { return mesh.id === "arrow"; });
                    var square = this.meshes.find(function (mesh) { return mesh.id === "square"; });
                    var x = this.meshes.find(function (mesh) { return mesh.id === "x"; });
                    this.navigateLeft = new shape_5.Shape(arrow, black, mat2d_3.Mat2dStruct.rotate(-Math.PI / 2));
                    this.navigateRight = new shape_5.Shape(arrow, black, mat2d_3.Mat2dStruct.rotate(Math.PI / 2));
                    this.addCanvas = new shape_5.Shape(x, black, mat2d_3.Mat2dStruct.rotate(Math.PI / 4));
                    this.removeCanvas = new shape_5.Shape(x, black);
                    this.buttonHover = new shape_5.Shape(square, blueHover, new mat2d_3.Mat2dStruct());
                    // Place navigation buttons on canvas
                    var left = rect_3.Rect.lrbt(-1.75, -1.25, -1, 1);
                    var right = rect_3.Rect.lrbt(1.25, 1.75, -1, 1);
                    var bottom = rect_3.Rect.lrbt(-1, 1, -1.75, -1.25);
                    var top = rect_3.Rect.lrbt(-1, 1, 1.25, 1.75);
                    this.navigateLeft.mapToRect(left, 0 /* Center */, true);
                    this.navigateRight.mapToRect(right, 0 /* Center */, true);
                    this.addCanvas.mapToRect(top, 0 /* Center */, true);
                    this.removeCanvas.mapToRect(bottom, 0 /* Center */, false);
                };
                Renderer.prototype.onDrawFrame = function () {
                    var gl = this.gl;
                    gl.clear(gl.COLOR_BUFFER_BIT);
                    for (var _i = 0, _a = this.drawables; _i < _a.length; _i++) {
                        var drawable = _a[_i];
                        drawable.draw(this);
                    }
                    if (this.temp) {
                        this.temp.draw(this);
                    }
                    this.foreground.draw(this);
                    this.navigateLeft.draw(this);
                    this.navigateRight.draw(this);
                    this.addCanvas.draw(this);
                    this.removeCanvas.draw(this);
                    this.buttonHover.draw(this);
                    if (this.selection.target) {
                        this.selection.draw(this);
                    }
                    if (this.selectionHover.target) {
                        this.selectionHover.draw(this);
                    }
                    // Clear backbuffer alpha 
                    gl.colorMask(false, false, false, true);
                    gl.clear(gl.COLOR_BUFFER_BIT);
                    gl.colorMask(true, true, true, true);
                };
                return Renderer;
            }(renderer_1.Renderer));
            exports_17("Renderer", Renderer);
        }
    };
});
System.register("ts/drawable/drawable", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("ts/action/colorChange", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var ColorChange;
    return {
        setters: [],
        execute: function () {
            ColorChange = (function () {
                function ColorChange(drawable, oldColor, newColor) {
                    this.drawable = drawable;
                    this.oldColor = oldColor;
                    this.newColor = newColor;
                }
                ColorChange.prototype.redo = function (surface) {
                    var _a = this, drawable = _a.drawable, newColor = _a.newColor;
                    drawable.color.setFromColor(newColor);
                };
                ColorChange.prototype.undo = function (surface) {
                    var _a = this, drawable = _a.drawable, oldColor = _a.oldColor;
                    drawable.color.setFromColor(oldColor);
                };
                return ColorChange;
            }());
            exports_19("ColorChange", ColorChange);
        }
    };
});
System.register("ts/action/insertion", [], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var Insertion;
    return {
        setters: [],
        execute: function () {
            Insertion = (function () {
                function Insertion(drawable, index) {
                    this.drawable = drawable;
                    this.index = index;
                }
                Insertion.prototype.redo = function (surface) {
                    var _a = this, drawable = _a.drawable, index = _a.index;
                    var stack = surface.renderer.drawables;
                    stack.splice(index, 0, drawable); // "stack.add(index, drawable)"
                    drawable.save(surface);
                };
                Insertion.prototype.undo = function (surface) {
                    var _a = this, drawable = _a.drawable, index = _a.index;
                    var stack = surface.renderer.drawables;
                    stack.splice(index, 1); // "stack.remove(index)"
                    drawable.delete(surface);
                };
                return Insertion;
            }());
            exports_20("Insertion", Insertion);
        }
    };
});
System.register("ts/action/record", [], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var ActionRecord;
    return {
        setters: [],
        execute: function () {
            /**
             * Keeps a record of event.s that can be undone or redone.
             */
            ActionRecord = (function () {
                function ActionRecord() {
                    this.undoableActions = [];
                    this.redoableActions = [];
                }
                ActionRecord.prototype.push = function (action) {
                    this.undoableActions.push(action);
                    this.redoableActions.length = 0;
                };
                ActionRecord.prototype.clear = function () {
                    this.undoableActions.length = 0;
                    this.redoableActions.length = 0;
                };
                return ActionRecord;
            }());
            exports_21("ActionRecord", ActionRecord);
        }
    };
});
System.register("ts/action/removal", ["ts/action/insertion"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var insertion_1, Removal;
    return {
        setters: [
            function (insertion_1_1) {
                insertion_1 = insertion_1_1;
            }
        ],
        execute: function () {
            Removal = (function (_super) {
                __extends(Removal, _super);
                function Removal() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Removal.prototype.redo = function (surface) {
                    _super.prototype.undo.call(this, surface);
                };
                Removal.prototype.undo = function (surface) {
                    _super.prototype.redo.call(this, surface);
                };
                return Removal;
            }(insertion_1.Insertion));
            exports_22("Removal", Removal);
        }
    };
});
System.register("ts/action/transformation", ["gl2d/struct/mat2d"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var mat2d_4, Transformation;
    return {
        setters: [
            function (mat2d_4_1) {
                mat2d_4 = mat2d_4_1;
            }
        ],
        execute: function () {
            Transformation = (function () {
                function Transformation(drawable, matrix) {
                    this.drawable = drawable;
                    this.matrix = matrix;
                }
                Transformation.prototype.redo = function (surface) {
                    var _a = this, drawable = _a.drawable, matrix = _a.matrix;
                    drawable.transform(matrix);
                };
                Transformation.prototype.undo = function (surface) {
                    var _a = this, drawable = _a.drawable, matrix = _a.matrix;
                    var inverse = mat2d_4.Mat2d.inverse(matrix);
                    drawable.transform(inverse);
                };
                return Transformation;
            }());
            exports_23("Transformation", Transformation);
        }
    };
});
System.register("ts/database/canvas", [], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("ts/database/drawable", [], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("ts/database/shape", [], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("ts/database/stroke", [], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("ts/database/shapeBatch", [], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("ts/database/type", [], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("ts/database/database", ["dexie"], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var dexie_1, Database;
    return {
        setters: [
            function (dexie_1_1) {
                dexie_1 = dexie_1_1;
            }
        ],
        execute: function () {
            Database = (function (_super) {
                __extends(Database, _super);
                function Database() {
                    var _this = _super.call(this, "VectorArtDatabase") || this;
                    // Define tables and indexes
                    // (Here's where the implicit table props are dynamically created)
                    _this.version(1).stores({
                        canvases: '++id, creationTime, lastAccessTime',
                        types: '++id, name',
                        shapes: '++id, canvasId, typeId, zIndex, color, matrix',
                        shapeBatches: '++id, canvasId, typeId, zIndex, color, matrices',
                        strokes: '++id, canvasId, zIndex, color, vertices, matrix',
                    });
                    return _this;
                }
                Database.prototype.getCanvas = function (id) {
                    return this.canvases.where("id").equals(id).first();
                };
                Database.prototype.createCanvas = function () {
                    var time = Date.now();
                    return this.canvases.add({
                        creationTime: time,
                        lastAccessTime: time
                    });
                };
                /**
                 * Removes all the drawables from a canvas.
                 * @param id the id of the canvas to clear.
                 */
                Database.prototype.clearCanvas = function (id) {
                    var _a = this, shapes = _a.shapes, shapeBatches = _a.shapeBatches, strokes = _a.strokes;
                    for (var _i = 0, _b = [shapes, shapeBatches, strokes]; _i < _b.length; _i++) {
                        var table = _b[_i];
                        table.where("canvasId").equals(id).delete();
                    }
                };
                /**
                 * Removes a canvas and all its drawables from the database.
                * @param id the id of the canvas to remove.
                 */
                Database.prototype.removeCanvas = function (id) {
                    var _this = this;
                    var _a = this, canvases = _a.canvases, shapes = _a.shapes, shapeBatches = _a.shapeBatches, strokes = _a.strokes;
                    return this.transaction("rw", canvases, shapes, shapeBatches, strokes, function () {
                        // Delete all the drawables on the canvas
                        _this.clearCanvas(id);
                        // Delete the canvas itself
                        canvases.delete(id);
                    });
                };
                Database.prototype.getTypeId = function (name) {
                    var _this = this;
                    var search = { name: name };
                    return this.types.get(search).then(function (type) {
                        return type ? type.id : _this.types.add(search);
                    });
                };
                return Database;
            }(dexie_1.default));
            exports_30("Database", Database);
        }
    };
});
System.register("ts/drawable/shapeBatch", ["ts/drawable/shape", "gl2d/struct/color", "gl2d/struct/mat2d", "gl2d/struct/point", "gl2d/struct/rect", "gl2d/struct/vec2"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var shape_7, color_2, mat2d_5, point_2, rect_4, vec2_1, ShapeBatch;
    return {
        setters: [
            function (shape_7_1) {
                shape_7 = shape_7_1;
            },
            function (color_2_1) {
                color_2 = color_2_1;
            },
            function (mat2d_5_1) {
                mat2d_5 = mat2d_5_1;
            },
            function (point_2_1) {
                point_2 = point_2_1;
            },
            function (rect_4_1) {
                rect_4 = rect_4_1;
            },
            function (vec2_1_1) {
                vec2_1 = vec2_1_1;
            }
        ],
        execute: function () {
            ShapeBatch = (function () {
                function ShapeBatch(mesh, color, matrices, zIndex, id) {
                    this.mesh = mesh;
                    this.color = color;
                    this.matrices = matrices;
                    this.zIndex = zIndex;
                    this.id = id;
                }
                ShapeBatch.prototype.add = function (center, radius) {
                    var src = this.mesh.bounds;
                    var dst = rect_4.Rect.unionOfPoints([center]);
                    dst.inset$(-radius, -radius);
                    this.matrices.setRectToRect(src, dst, 0 /* Center */);
                    this.matrices.moveToNext();
                };
                ShapeBatch.prototype.addAcrossLine = function (p1, p2) {
                    shape_7.Shape.stretchAcrossLine(this.matrices, this.mesh, p1, p2);
                    this.matrices.moveToNext();
                };
                ShapeBatch.prototype.addLine = function (start, end, thickness) {
                    // Paramaterize line to a + bt, 0 <= t <= 1
                    var a = point_2.Point.create(start);
                    var b = vec2_1.Vec2.fromPointToPoint(start, end);
                    // Determine how many shapes can be drawn on the line end to end
                    var ratio = b.length() / thickness;
                    var count = ratio >>> 0;
                    // Re-parameterize the line to a + bt, o <= t <= count
                    b.divScalar(ratio);
                    // Fill the line with shapes
                    var p1 = a;
                    var p2 = point_2.Point.create(a);
                    while (count-- && this.matrices.hasValidPosition()) {
                        p2.add(b);
                        this.addAcrossLine(p1, p2);
                        p1.set(p2);
                    }
                    return p1;
                };
                ShapeBatch.prototype.measureBoundaries = function () {
                    var bounds = null;
                    var matrices = this.matrices;
                    var vertices = this.mesh.vertices;
                    if (matrices.moveToFirst() && vertices.moveToFirst()) {
                        // Enclose the first shape
                        bounds = shape_7.Shape.measureBoundaries(matrices, vertices);
                        // Enclose the remaining shapes
                        while (matrices.moveToNext()) {
                            bounds.union(shape_7.Shape.measureBoundaries(matrices, vertices));
                        }
                    }
                    // Bounds will be null if batch is empty
                    return bounds;
                };
                ShapeBatch.prototype.offset = function (vec) {
                    var matrices = this.matrices;
                    matrices.moveToPosition(-1);
                    while (matrices.moveToNext()) {
                        matrices.postTranslate(vec);
                    }
                };
                ShapeBatch.prototype.transform = function (matrix) {
                    var matrices = this.matrices;
                    matrices.moveToPosition(-1);
                    while (matrices.moveToNext()) {
                        matrices.postConcat(matrix);
                    }
                };
                /**
                 * Returns true if any shape in this batch contains the specified point.
                 */
                ShapeBatch.prototype.contains = function (pt) {
                    var mesh = this.mesh;
                    var matrices = this.matrices;
                    var inverse = new mat2d_5.Mat2d();
                    var modelPt = new point_2.Point();
                    matrices.moveToPosition(-1);
                    while (matrices.moveToNext()) {
                        inverse.setInverse(matrices);
                        inverse.map(pt, modelPt);
                        if (mesh.contains(modelPt)) {
                            return true;
                        }
                    }
                    return false;
                };
                ShapeBatch.prototype.draw = function (renderer) {
                    var _a = this, color = _a.color, matrices = _a.matrices, mesh = _a.mesh;
                    var gl = renderer.gl, ext = renderer.ext, program = renderer.shapeProgram;
                    var primcount = matrices.capacity();
                    renderer.attachProgram(program);
                    program.setProjection(gl, renderer.camera.matrix);
                    program.setVertices(gl, mesh);
                    program.setMatrices(gl, matrices);
                    program.setColor(gl, color);
                    if (mesh.triangleIndices) {
                        var count = mesh.triangleIndices.data.length;
                        var offset = mesh.elementBufferOffset;
                        ext.drawElementsInstancedANGLE(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, offset, primcount);
                    }
                    else {
                        var count = mesh.vertices.capacity();
                        ext.drawArraysInstancedANGLE(gl.TRIANGLES, 0, count, primcount);
                    }
                };
                ShapeBatch.prototype.save = function (surface) {
                    var _this = this;
                    var database = surface.database, canvasId = surface.canvasId, zIndex = surface.zIndex;
                    this.zIndex = zIndex;
                    var color = color_2.ColorStruct.fromColorF(this.color).data.buffer;
                    var matrices = this.matrices.data.buffer;
                    database.getTypeId(this.mesh.id).then(function (typeId) {
                        database.shapeBatches.add({
                            canvasId: canvasId.val,
                            typeId: typeId,
                            zIndex: zIndex,
                            color: color,
                            matrices: matrices
                        }).then(function (id) { return _this.id = id; });
                    });
                };
                ShapeBatch.prototype.delete = function (surface) {
                    surface.database.shapeBatches.delete(this.id);
                };
                ShapeBatch.prototype.updateColor = function (surface, color) {
                    this.color.setFromColor(color);
                    surface.database.shapeBatches.update(this.id, {
                        color: color.data.buffer
                    });
                };
                ShapeBatch.prototype.updateZIndex = function (surface, zIndex) {
                    this.zIndex = zIndex;
                    surface.database.shapeBatches.update(this.id, {
                        zIndex: zIndex
                    });
                };
                ShapeBatch.prototype.updatePosition = function (surface) {
                    surface.database.shapeBatches.update(this.id, {
                        matrices: this.matrices.data.buffer
                    });
                };
                return ShapeBatch;
            }());
            exports_31("ShapeBatch", ShapeBatch);
        }
    };
});
System.register("ts/drawable/ellipseBatch", ["ts/drawable/ellipse", "ts/drawable/shapeBatch", "gl2d/struct/mat2d", "gl2d/struct/point"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var ellipse_3, shapeBatch_1, mat2d_6, point_3, EllipseBatch;
    return {
        setters: [
            function (ellipse_3_1) {
                ellipse_3 = ellipse_3_1;
            },
            function (shapeBatch_1_1) {
                shapeBatch_1 = shapeBatch_1_1;
            },
            function (mat2d_6_1) {
                mat2d_6 = mat2d_6_1;
            },
            function (point_3_1) {
                point_3 = point_3_1;
            }
        ],
        execute: function () {
            EllipseBatch = (function (_super) {
                __extends(EllipseBatch, _super);
                function EllipseBatch() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                EllipseBatch.prototype.measureBoundaries = function () {
                    var bounds = null;
                    var matrices = this.matrices;
                    if (matrices.moveToFirst()) {
                        // Enclose the first ellipse
                        bounds = ellipse_3.Ellipse.measureBoundaries(matrices);
                        // Enclose the remaining ellipses
                        while (matrices.moveToNext()) {
                            bounds.union(ellipse_3.Ellipse.measureBoundaries(matrices));
                        }
                    }
                    // Bounds will be null if batch is empty
                    return bounds;
                };
                /**
                 * Returns true if any shape in this batch contains the specified point.
                 */
                EllipseBatch.prototype.contains = function (pt) {
                    var matrices = this.matrices;
                    var bounds = this.mesh.bounds;
                    var inverse = new mat2d_6.Mat2d();
                    var modelPt = new point_3.Point();
                    matrices.moveToPosition(-1);
                    while (matrices.moveToNext()) {
                        inverse.setInverse(matrices);
                        inverse.map(pt, modelPt);
                        if (bounds.contains(modelPt) && modelPt.distance2() <= 1) {
                            return matrices.moveToLast();
                        }
                    }
                    return false;
                };
                EllipseBatch.prototype.draw = function (renderer) {
                    var gl = renderer.gl;
                    var program = renderer.ellipseProgram;
                    var matrices = this.matrices;
                    var instanceCount = matrices.position();
                    renderer.attachProgram(program);
                    program.setProjection(gl, renderer.camera.matrix);
                    program.setMatrices(gl, matrices);
                    program.setColor(gl, this.color);
                    program.draw(renderer, instanceCount);
                };
                return EllipseBatch;
            }(shapeBatch_1.ShapeBatch));
            exports_32("EllipseBatch", EllipseBatch);
        }
    };
});
System.register("ts/drawable/line", ["ts/drawable/shape", "gl2d/struct/mat2d"], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var shape_8, mat2d_7, Line;
    return {
        setters: [
            function (shape_8_1) {
                shape_8 = shape_8_1;
            },
            function (mat2d_7_1) {
                mat2d_7 = mat2d_7_1;
            }
        ],
        execute: function () {
            Line = (function (_super) {
                __extends(Line, _super);
                function Line() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Line.prototype.setFromPointToPoint = function (p1, p2, thickness) {
                    // Assume mesh is the square {left: 0, right: 1, bottom: 0, top: 1}
                    // Translate square to {left: 0, right: 1, bottom: -0.5, top: 0.5}
                    this.matrix.setTranslate$(0, -0.5);
                    // Scale the square to a rectangle with width = dist(p1,p2), and height = thickness
                    var width = p1.distance(p2);
                    var height = thickness;
                    this.matrix.postScale(width, height);
                    // Rotate the rectangle by the angle formed by p2, p1, and (x1+e, y1) for any e>0-->
                    var hypotenuse = width;
                    var adjacent = p2.x - p1.x;
                    var opposite = p2.y - p1.y;
                    var sin = opposite / hypotenuse;
                    var cos = adjacent / hypotenuse;
                    this.matrix.postConcat(mat2d_7.Mat2d.sinCos(sin, cos));
                    // Translate rectangle to p1
                    this.matrix.postTranslate(p1);
                };
                Line.prototype.measureControl = function () {
                    return this.convertPointToWorldSpace(this.mesh.bounds.centerLeft());
                };
                Line.prototype.measurePivot = function () {
                    return this.convertPointToWorldSpace(this.mesh.bounds.centerRight());
                };
                return Line;
            }(shape_8.Shape));
            exports_33("Line", Line);
        }
    };
});
System.register("ts/drawable/stroke", ["ts/drawable/shape", "gl2d/drawable/graphic", "gl2d/struct/color", "gl2d/struct/point", "gl2d/struct/rect", "gl2d/struct/vec2", "gl2d/math/miter"], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var shape_9, graphic_1, color_3, point_4, rect_5, vec2_2, miter_1, Stroke;
    return {
        setters: [
            function (shape_9_1) {
                shape_9 = shape_9_1;
            },
            function (graphic_1_1) {
                graphic_1 = graphic_1_1;
            },
            function (color_3_1) {
                color_3 = color_3_1;
            },
            function (point_4_1) {
                point_4 = point_4_1;
            },
            function (rect_5_1) {
                rect_5 = rect_5_1;
            },
            function (vec2_2_1) {
                vec2_2 = vec2_2_1;
            },
            function (miter_1_1) {
                miter_1 = miter_1_1;
            }
        ],
        execute: function () {
            Stroke = (function (_super) {
                __extends(Stroke, _super);
                function Stroke(color, vertices, matrix, zIndex, id) {
                    var _this = _super.call(this, matrix) || this;
                    _this.color = color;
                    _this.vertices = vertices;
                    _this.zIndex = zIndex;
                    _this.id = id;
                    return _this;
                }
                Stroke.prototype.measureBoundaries = function (dst) {
                    if (dst === void 0) { dst = new rect_5.Rect(); }
                    var _a = this, matrix = _a.matrix, vertices = _a.vertices;
                    return shape_9.Shape.measureBoundaries(matrix, vertices);
                };
                Stroke.prototype.contains = function (pt, inverse) {
                    var vertices = this.vertices;
                    var modelPt = this.convertPointToModelSpace(pt, inverse);
                    var count = vertices.capacity();
                    // If the stroke has at least one segment
                    if (count > 3) {
                        // Return true if any of the segments inside this stroke contain the point
                        for (var i = 3; i < count; i += 2) {
                            if (vertices.indexedContains(modelPt, [i - 3, i - 2, i, i - 1])) {
                                return true;
                            }
                        }
                    }
                    //This stroke does not contain the point.
                    return false;
                };
                /**
                 * Begins this stroke at the specified point.
                 * @param point where to begin the stroke.
                 * @param lineWidth the width of the initial line.
                 */
                Stroke.prototype.moveTo = function (point, lineWidth) {
                    var x = point.x, y = point.y;
                    var vertices = this.vertices;
                    var halfThickness = 0.5 * lineWidth;
                    if (vertices.moveToFirst()) {
                        vertices.rset$(x, y + halfThickness);
                        vertices.rset$(x, y - halfThickness);
                    }
                };
                /**
                  * Adds a line to the specified point.
                  * @param point the point at the end of the line.
                  * @param lineWidth the width of the line.
                  */
                Stroke.prototype.lineTo = function (point, lineWidth) {
                    var vertices = this.vertices;
                    var position = vertices.position();
                    var halfThickness = 0.5 * lineWidth;
                    var halfThickness2 = halfThickness * halfThickness;
                    // Assume the stroke already has at least one line
                    // TODO: throw error if not
                    var prevTop = vertices.aget(position - 2);
                    var prevBot = vertices.aget(position - 1);
                    var prevCen = point_4.Point.midpoint(prevTop, prevBot);
                    var line = vec2_2.Vec2.fromPointToPoint(prevCen, point);
                    var prevLine;
                    var miter;
                    var ortho;
                    // If previous line exists
                    if (position >= 4) {
                        // Compute previous line
                        var prevPrevTop = vertices.aget(position - 4);
                        var prevPrevBot = vertices.aget(position - 3);
                        var prevPrevCen = point_4.Point.midpoint(prevPrevTop, prevPrevBot);
                        prevLine = vec2_2.Vec2.fromPointToPoint(prevPrevCen, prevCen);
                        // If lines are too short
                        if (line.length2() < halfThickness2 && prevLine.length2() < halfThickness2) {
                            // Merge them into a single line
                            position -= 2;
                            prevTop = prevPrevTop;
                            prevBot = prevPrevBot;
                            prevCen = prevPrevCen;
                            line = vec2_2.Vec2.fromPointToPoint(prevCen, point);
                            prevLine = null;
                            // Compute the (previous) previous line if it exists
                            if (position >= 4) {
                                prevPrevTop = vertices.aget(position - 4);
                                prevPrevBot = vertices.aget(position - 3);
                                prevPrevCen = point_4.Point.midpoint(prevPrevTop, prevPrevBot);
                                prevLine = vec2_2.Vec2.fromPointToPoint(prevPrevCen, prevCen);
                            }
                        }
                    }
                    // Compute the ortho vector needed to compute the top and bottom right vertices of the line segment.
                    ortho = vec2_2.Vec2.create(line);
                    ortho.normalize();
                    ortho.rotateLeft();
                    ortho.mulScalar(halfThickness);
                    // If there are more than two line segments (with non-zero length), use a miter vector join them. 
                    // Otherwise use the ortho vector to compute the top and bottom left vertices of the line segment.
                    if (prevLine && !prevLine.epsilonEqualsScalar(0, halfThickness / 8)) {
                        miter = miter_1.measureMiter(prevLine, line, halfThickness, halfThickness * 3);
                    }
                    else {
                        miter = ortho;
                    }
                    // Join to previous line
                    vertices.moveToPosition(position - 2);
                    // Update previous top
                    vertices.set(prevCen);
                    vertices.add(miter);
                    vertices.moveToNext();
                    // Update previous bottom
                    vertices.set(prevCen);
                    vertices.subtract(miter);
                    vertices.moveToNext();
                    // Add new top
                    vertices.set(point);
                    vertices.add(ortho);
                    vertices.moveToNext();
                    // Add new bottom
                    vertices.set(point);
                    vertices.subtract(ortho);
                    vertices.moveToNext();
                };
                /**
                 * Adds a line to the first point in this stroke.
                 * @param lineWidth the width of the point.
                 */
                Stroke.prototype.close = function (lineWidth) {
                    var vertices = this.vertices;
                    var position = vertices.position();
                    var miter;
                    // Must have at least 6 vertices (2 line segments) to close the path
                    if (position < 6) {
                        return;
                    }
                    // Measure the previous line
                    vertices.moveToPosition(position - 4);
                    var prevPrevPoint = point_4.Point.midpoint(vertices.rget(), vertices.rget());
                    var prevPoint = point_4.Point.midpoint(vertices.rget(), vertices.rget());
                    var prevLine = vec2_2.Vec2.fromPointToPoint(prevPrevPoint, prevPoint);
                    // Measure the current line (previous point to first)
                    vertices.moveToFirst();
                    var currPoint = point_4.Point.midpoint(vertices.rget(), vertices.rget());
                    var currLine = vec2_2.Vec2.fromPointToPoint(prevPoint, currPoint);
                    // Measure the next line (first point to second)
                    var nextPoint = point_4.Point.midpoint(vertices.rget(), vertices.rget());
                    var nextLine = vec2_2.Vec2.fromPointToPoint(currPoint, nextPoint);
                    // Join the previous line to the current line
                    miter = miter_1.measureMiter(prevLine, currLine, 0.5 * lineWidth, 1.5 * lineWidth);
                    vertices.moveToPosition(position - 2);
                    vertices.set(prevPoint);
                    vertices.add(miter);
                    vertices.moveToNext();
                    vertices.set(prevPoint);
                    vertices.subtract(miter);
                    vertices.moveToNext();
                    // Join the current line to the next line
                    miter = miter_1.measureMiter(currLine, nextLine, 0.5 * lineWidth, 1.5 * lineWidth);
                    var top = point_4.Point.create(currPoint);
                    top.add(miter);
                    var bot = point_4.Point.create(currPoint);
                    bot.subtract(miter);
                    vertices.rset(top);
                    vertices.rset(bot);
                    vertices.aset(0, top);
                    vertices.aset(1, bot);
                };
                Stroke.prototype.draw = function (renderer) {
                    var _a = this, color = _a.color, vertices = _a.vertices, matrix = _a.matrix;
                    var gl = renderer.gl, ext = renderer.ext, program = renderer.shapeProgram;
                    var count = vertices.capacity();
                    renderer.attachProgram(program);
                    program.setProjection(gl, renderer.camera.matrix);
                    program.setColor(gl, color);
                    program.setVertices(gl, vertices);
                    program.setMatrices(gl, matrix);
                    ext.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, count, 1);
                };
                Stroke.prototype.save = function (surface) {
                    var _this = this;
                    var database = surface.database, canvasId = surface.canvasId, zIndex = surface.zIndex;
                    this.zIndex = zIndex;
                    var color = color_3.ColorStruct.fromColorF(this.color).data.buffer;
                    var vertices = this.vertices.data.buffer;
                    var matrix = this.matrix.data.buffer;
                    database.strokes.add({
                        zIndex: zIndex,
                        canvasId: canvasId.val,
                        color: color,
                        vertices: vertices,
                        matrix: matrix
                    }).then(function (id) { return _this.id = id; });
                };
                Stroke.prototype.delete = function (surface) {
                    surface.database.strokes.delete(this.id);
                };
                Stroke.prototype.updateColor = function (surface, color) {
                    this.color.setFromColor(color);
                    surface.database.strokes.update(this.id, {
                        color: color.data.buffer
                    });
                };
                Stroke.prototype.updateZIndex = function (surface, zIndex) {
                    this.zIndex = zIndex;
                    surface.database.strokes.update(this.id, {
                        zIndex: zIndex
                    });
                };
                Stroke.prototype.updatePosition = function (surface) {
                    surface.database.strokes.update(this.id, {
                        matrix: this.matrix.data.buffer
                    });
                };
                return Stroke;
            }(graphic_1.Graphic));
            exports_34("Stroke", Stroke);
        }
    };
});
System.register("ts/option/option", [], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var Option;
    return {
        setters: [],
        execute: function () {
            /**
             * Option backed by local storage.
             */
            Option = (function () {
                function Option(key, value) {
                    this.key = key;
                    this.value = value;
                }
                Option.get = function (key) {
                    if (localStorage) {
                        return localStorage.getItem(key);
                    }
                    else {
                        return null;
                    }
                };
                Option.bool = function (key, initial) {
                    var str = Option.get(key);
                    var val;
                    if (str === 'true') {
                        val = true;
                    }
                    else if (str === 'false') {
                        val = false;
                    }
                    else {
                        val = initial;
                    }
                    return new Option(key, val);
                };
                Option.num = function (key, initial, min, max) {
                    var val = parseInt(Option.get(key));
                    if (isNaN(val) || val < min || val > max) {
                        val = initial;
                    }
                    return new Option(key, val);
                };
                Option.str = function (key, initial) {
                    var str = Option.get(key);
                    var val = str ? str : initial;
                    return new Option(key, val);
                };
                Object.defineProperty(Option.prototype, "val", {
                    get: function () {
                        return this.value;
                    },
                    set: function (value) {
                        this.value = value;
                        if (localStorage) {
                            localStorage.setItem(this.key, value.toString());
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Option;
            }());
            exports_35("Option", Option);
        }
    };
});
System.register("ts/rendering/surface", ["ts/action/colorChange", "ts/action/insertion", "ts/action/record", "ts/action/removal", "ts/action/transformation", "ts/database/database", "ts/drawable/ellipse", "ts/drawable/ellipseBatch", "ts/drawable/line", "ts/drawable/shape", "ts/drawable/shapeBatch", "ts/drawable/stroke", "ts/rendering/renderer", "gl2d/rendering/camera", "gl2d/rendering/surface", "gl2d/struct/color", "gl2d/struct/colorf", "gl2d/struct/mat2d", "gl2d/struct/rect", "gl2d/struct/vertex", "lodash.lastindexof", "ts/option/option"], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var colorChange_1, insertion_2, record_1, removal_1, transformation_1, database_1, ellipse_4, ellipseBatch_1, line_1, shape_10, shapeBatch_2, stroke_1, renderer_2, camera_1, surface_1, color_4, colorf_3, mat2d_8, rect_6, vertex_1, lastIndexOf, option_1, Surface;
    return {
        setters: [
            function (colorChange_1_1) {
                colorChange_1 = colorChange_1_1;
            },
            function (insertion_2_1) {
                insertion_2 = insertion_2_1;
            },
            function (record_1_1) {
                record_1 = record_1_1;
            },
            function (removal_1_1) {
                removal_1 = removal_1_1;
            },
            function (transformation_1_1) {
                transformation_1 = transformation_1_1;
            },
            function (database_1_1) {
                database_1 = database_1_1;
            },
            function (ellipse_4_1) {
                ellipse_4 = ellipse_4_1;
            },
            function (ellipseBatch_1_1) {
                ellipseBatch_1 = ellipseBatch_1_1;
            },
            function (line_1_1) {
                line_1 = line_1_1;
            },
            function (shape_10_1) {
                shape_10 = shape_10_1;
            },
            function (shapeBatch_2_1) {
                shapeBatch_2 = shapeBatch_2_1;
            },
            function (stroke_1_1) {
                stroke_1 = stroke_1_1;
            },
            function (renderer_2_1) {
                renderer_2 = renderer_2_1;
            },
            function (camera_1_1) {
                camera_1 = camera_1_1;
            },
            function (surface_1_1) {
                surface_1 = surface_1_1;
            },
            function (color_4_1) {
                color_4 = color_4_1;
            },
            function (colorf_3_1) {
                colorf_3 = colorf_3_1;
            },
            function (mat2d_8_1) {
                mat2d_8 = mat2d_8_1;
            },
            function (rect_6_1) {
                rect_6 = rect_6_1;
            },
            function (vertex_1_1) {
                vertex_1 = vertex_1_1;
            },
            function (lastIndexOf_1) {
                lastIndexOf = lastIndexOf_1;
            },
            function (option_1_1) {
                option_1 = option_1_1;
            }
        ],
        execute: function () {
            Surface = (function (_super) {
                __extends(Surface, _super);
                function Surface() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.drawColor = new colorf_3.ColorFStruct();
                    _this.record = new record_1.ActionRecord();
                    _this.database = new database_1.Database();
                    _this.canvasId = option_1.Option.num("canvasId", 1, 1, 0xffffffff);
                    _this.zIndex = 1;
                    _this.buffer = new Float32Array(25000); // 100kb
                    return _this;
                }
                Surface.create = function () {
                    var canvas = document.getElementById("canvas");
                    // Note: alpha option not supported before iOS 10
                    var gl = canvas.getContext('webgl', { alpha: false });
                    var camera = new camera_1.Camera(rect_6.RectStruct.create$(-1, 1, 1, -1), 0.5, 1000);
                    var renderer = new renderer_2.Renderer(gl, camera);
                    renderer.ext = gl.getExtension('ANGLE_instanced_arrays');
                    var surface = new Surface(canvas, renderer);
                    var canvasId = surface.canvasId.val;
                    var database = surface.database;
                    // Get canvas or create if none exists
                    database.getCanvas(canvasId).then(function (canvas) {
                        if (canvas) {
                            surface.importCanvas(canvas.id);
                        }
                        else {
                            database.createCanvas().then(function (id) {
                                surface.canvasId.val = id;
                            });
                        }
                    });
                    return surface;
                };
                Surface.prototype.importCanvas = function (canvasId) {
                    var _this = this;
                    this.canvasId.val = canvasId;
                    var db = this.database;
                    this.clear();
                    db.types.toArray().then(function (types) {
                        db.transaction("rw", db.types, db.shapes, db.shapeBatches, db.strokes, db.canvases, function () {
                            // Import shapes
                            db.shapes.where("canvasId").equals(canvasId).each(function (data) {
                                var type = types.find(function (t) { return t.id === data.typeId; });
                                var mesh = _this.getMesh(type.name);
                                var color = colorf_3.ColorFStruct.fromColor(new color_4.ColorStruct(new Uint8Array(data.color)));
                                var matrix = new mat2d_8.Mat2dStruct(new Float32Array(data.matrix));
                                var zIndex = data.zIndex, id = data.id;
                                var shape;
                                if (type.name === "circle") {
                                    shape = new ellipse_4.Ellipse(mesh, color, matrix, zIndex, id);
                                }
                                else {
                                    shape = new shape_10.Shape(mesh, color, matrix, zIndex, id);
                                }
                                _this.addDrawableToSortedStack(shape);
                                _this.requestRender();
                            });
                            // Import shape batches
                            db.shapeBatches.where("canvasId").equals(canvasId).each(function (data) {
                                var type = types.find(function (t) { return t.id === data.typeId; });
                                var mesh = _this.getMesh(type.name);
                                var color = colorf_3.ColorFStruct.fromColor(new color_4.ColorStruct(new Uint8Array(data.color)));
                                var matrices = new mat2d_8.Mat2dBuffer(new Float32Array(data.matrices));
                                var zIndex = data.zIndex, id = data.id;
                                var batch;
                                if (type.name === "circle") {
                                    batch = new ellipseBatch_1.EllipseBatch(mesh, color, matrices, zIndex, id);
                                }
                                else {
                                    batch = new shapeBatch_2.ShapeBatch(mesh, color, matrices, zIndex, id);
                                }
                                _this.addDrawableToSortedStack(batch);
                                _this.requestRender();
                            });
                            // Import strokes
                            db.strokes.where("canvasId").equals(canvasId).each(function (stroke) {
                                var color = colorf_3.ColorFStruct.fromColor(new color_4.ColorStruct(new Uint8Array(stroke.color)));
                                var matrix = new mat2d_8.Mat2dStruct(new Float32Array(stroke.matrix));
                                var vertices = new vertex_1.VertexBuffer(new Float32Array(stroke.vertices));
                                _this.addDrawableToSortedStack(new stroke_1.Stroke(color, vertices, matrix, stroke.zIndex, stroke.id));
                                _this.requestRender();
                            });
                            // Update last access time for this canvas
                            db.canvases.update(canvasId, { lastAccessTime: Date.now() });
                        }).then(function () {
                            var stack = _this.renderer.drawables;
                            if (stack.length > 0) {
                                _this.zIndex = stack[stack.length - 1].zIndex;
                            }
                        });
                    });
                };
                Surface.prototype.importCanvasOnLeft = function () {
                    var _this = this;
                    var _a = this, canvasId = _a.canvasId, database = _a.database;
                    return database.canvases.where("id").below(canvasId.val).last()
                        .then(function (canvas) {
                        if (canvas) {
                            _this.importCanvas(canvas.id);
                        }
                        return canvas;
                    });
                };
                Surface.prototype.importCanvasOnRight = function () {
                    var _this = this;
                    var _a = this, canvasId = _a.canvasId, database = _a.database;
                    return database.canvases.where("id").above(canvasId.val).first()
                        .then(function (canvas) {
                        if (canvas) {
                            _this.importCanvas(canvas.id);
                        }
                        return canvas;
                    });
                };
                Surface.prototype.addCanvas = function () {
                    var _this = this;
                    var _a = this, canvasId = _a.canvasId, database = _a.database;
                    database.createCanvas().then(function (id) {
                        canvasId.val = id;
                        _this.clear();
                    });
                };
                Surface.prototype.removeCanvas = function () {
                    var _this = this;
                    this.clear();
                    var _a = this, canvasId = _a.canvasId, database = _a.database;
                    database.removeCanvas(canvasId.val).then(function () {
                        _this.importCanvasOnLeft().then(function (canvas) {
                            if (!canvas) {
                                _this.importCanvasOnRight().then(function (canvas) {
                                    if (!canvas) {
                                        _this.addCanvas();
                                    }
                                });
                            }
                        });
                    });
                };
                Surface.prototype.clear = function () {
                    this.renderer.drawables.length = 0;
                    this.record.clear();
                };
                Surface.prototype.addDrawableToSortedStack = function (drawable) {
                    var stack = this.renderer.drawables;
                    var position = stack.length;
                    // TODO: implement binary search?
                    while (--position >= 0) {
                        if (drawable.zIndex > stack[position].zIndex) {
                            break;
                        }
                    }
                    stack.splice(position + 1, 0, drawable);
                };
                Surface.prototype.getDrawableContaining = function (point) {
                    var drawables = this.renderer.drawables;
                    for (var i = drawables.length - 1; i >= 0; i--) {
                        var drawable = drawables[i];
                        if (drawable.contains(point)) {
                            return drawable;
                        }
                    }
                    return null;
                };
                Surface.prototype.getTempLine = function () {
                    var renderer = this.renderer;
                    var line = renderer.temp;
                    if (!line) {
                        var color = this.copyDrawColor();
                        line = new line_1.Line(this.getMesh("square"), color);
                        renderer.temp = line;
                    }
                    return line;
                };
                Surface.prototype.getTempShape = function () {
                    var renderer = this.renderer;
                    var shape = renderer.temp;
                    if (!shape) {
                        var mesh = this.mesh;
                        var color = this.copyDrawColor();
                        if (mesh.id === "circle") {
                            shape = new ellipse_4.Ellipse(mesh, color);
                        }
                        else {
                            shape = new shape_10.Shape(mesh, color);
                        }
                        renderer.temp = shape;
                    }
                    return shape;
                };
                Surface.prototype.getTempShapeBatch = function () {
                    var renderer = this.renderer;
                    var batch = renderer.temp;
                    if (!batch) {
                        var mesh = this.mesh;
                        var color = this.copyDrawColor();
                        var matrices = new mat2d_8.Mat2dBuffer(this.buffer);
                        matrices.capacity = matrices.position;
                        if (mesh.id === "circle") {
                            batch = new ellipseBatch_1.EllipseBatch(mesh, color, matrices);
                        }
                        else {
                            batch = new shapeBatch_2.ShapeBatch(mesh, color, matrices);
                        }
                        renderer.temp = batch;
                    }
                    return batch;
                };
                Surface.prototype.getTempStroke = function () {
                    var _a = this, renderer = _a.renderer, buffer = _a.buffer;
                    var stroke = renderer.temp;
                    if (!stroke) {
                        var color = this.copyDrawColor();
                        var vertices = new vertex_1.VertexBuffer(buffer);
                        vertices.capacity = vertices.position;
                        stroke = new stroke_1.Stroke(color, vertices);
                        renderer.temp = stroke;
                    }
                    return stroke;
                };
                Surface.prototype.getMesh = function (id) {
                    return this.renderer.meshes.find(function (mesh) { return mesh.id === id; });
                };
                Surface.prototype.copyDrawColor = function () {
                    return colorf_3.ColorFStruct.create(this.drawColor);
                };
                Surface.prototype.setDrawColor = function (color) {
                    var _a = this, drawColor = _a.drawColor, renderer = _a.renderer;
                    var target = renderer.selection.target;
                    // Modify draw color
                    drawColor.setFromColor(color);
                    // Modify color of selected drawable (if any)
                    if (target) {
                        target.color.set(drawColor);
                        this.changeColor(target, drawColor);
                    }
                };
                Surface.prototype.addTempDrawable = function () {
                    var _a = this, renderer = _a.renderer, record = _a.record;
                    var temp = renderer.temp, drawables = renderer.drawables, camera = renderer.camera;
                    // If temp drawable lies inside viewable camera area
                    if (temp && camera.target.intersects(temp.measureBoundaries())) {
                        // Add to drawable stack and record action
                        var index = drawables.length;
                        var action = new insertion_2.Insertion(temp, index);
                        action.redo(this); // Does the actual insertion
                        record.push(action);
                        this.zIndex++;
                    }
                    // Remove temp drawable
                    renderer.temp = null;
                };
                Surface.prototype.addTempShapeBatch = function () {
                    var renderer = this.renderer;
                    var batch = renderer.temp;
                    if (!batch) {
                        return;
                    }
                    // If batch contains at least one shape
                    var matrices = batch.matrices;
                    var size = matrices.position();
                    if (size > 0) {
                        // Copy matrices into new buffer with capacity equal to size
                        matrices.moveToFirst();
                        batch.matrices = mat2d_8.Mat2dBuffer.create(size);
                        batch.matrices.rsetFromBuffer(matrices, size);
                        // Proceed with adding batch to drawable stack
                        this.addTempDrawable();
                    }
                    else {
                        renderer.temp = null;
                    }
                };
                Surface.prototype.addTempStroke = function () {
                    var renderer = this.renderer;
                    var stroke = renderer.temp;
                    if (!stroke) {
                        return;
                    }
                    // If batch contains at least one segment
                    var vertices = stroke.vertices;
                    var size = vertices.position();
                    if (size > 3) {
                        // Copy vertices into new buffer with capacity equal to size
                        vertices.moveToFirst();
                        stroke.vertices = vertex_1.VertexBuffer.create(size);
                        stroke.vertices.rsetFromBuffer(vertices, size);
                        // Proceed with adding stroke to drawable stack
                        this.addTempDrawable();
                    }
                    else {
                        renderer.temp = null;
                    }
                };
                Surface.prototype.recordTransformation = function (drawable, matrix) {
                    if (drawable && matrix && !matrix.isIdentity()) {
                        var action = new transformation_1.Transformation(drawable, matrix);
                        this.record.push(action);
                        drawable.updatePosition(this);
                    }
                };
                Surface.prototype.changeColor = function (drawable, color) {
                    var oldColor = color_4.ColorStruct.create(color);
                    var newColor = color_4.ColorStruct.create(color);
                    var action = new colorChange_1.ColorChange(drawable, oldColor, newColor);
                    this.record.push(action);
                    drawable.updateColor(this, newColor);
                };
                Surface.prototype.removeDrawable = function (drawable) {
                    var _a = this, renderer = _a.renderer, record = _a.record;
                    var index = lastIndexOf(renderer.drawables, drawable);
                    var action = new removal_1.Removal(drawable, index);
                    action.redo(this); // Does the actual removal
                    record.push(action);
                };
                Surface.prototype.undoLastAction = function () {
                    var _a = this, renderer = _a.renderer, record = _a.record;
                    var drawables = renderer.drawables;
                    var undoableActions = record.undoableActions, redoableActions = record.redoableActions;
                    var action;
                    if (undoableActions.length > 0) {
                        action = undoableActions.pop();
                    }
                    else if (drawables.length > 0) {
                        var index = drawables.length - 1;
                        action = new insertion_2.Insertion(drawables[index], index);
                    }
                    if (action) {
                        action.undo(this);
                        redoableActions.push(action);
                    }
                    return action;
                };
                Surface.prototype.redoLastUndo = function () {
                    var record = this.record;
                    var undoableActions = record.undoableActions, redoableActions = record.redoableActions;
                    var action;
                    if (redoableActions.length > 0) {
                        action = redoableActions.pop();
                    }
                    if (action) {
                        action.redo(this);
                        undoableActions.push(action);
                    }
                    return action;
                };
                Surface.prototype.zoomIn = function (desiredScaleFactor) {
                    var result = _super.prototype.zoomIn.call(this, desiredScaleFactor);
                    this.scaleFramesAndControlPoints(1 / result);
                    return result;
                };
                Surface.prototype.zoomOut = function (desiredScaleFactor) {
                    var result = _super.prototype.zoomOut.call(this, desiredScaleFactor);
                    this.scaleFramesAndControlPoints(1 / result);
                    return result;
                };
                Surface.prototype.zoomToPoint = function (desiredScaleFactor, focus) {
                    var result = _super.prototype.zoomToPoint.call(this, desiredScaleFactor, focus);
                    this.scaleFramesAndControlPoints(1 / result.scaleFactor);
                    return result;
                };
                Surface.prototype.scaleFramesAndControlPoints = function (scale) {
                    this.renderer.selectionHover.frame.thickness *= scale;
                    this.renderer.selection.frame.thickness *= scale;
                    this.renderer.selection.pivot.stretch(scale);
                    this.renderer.selection.control.stretch(scale);
                };
                return Surface;
            }(surface_1.Surface));
            exports_36("Surface", Surface);
        }
    };
});
System.register("ts/event/mouseOrTouch", [], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("ts/tool/shape", ["gl2d/struct/rect", "gl2d/tool/mouseOrTouch"], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var rect_7, mouseOrTouch_1, ShapeTool;
    return {
        setters: [
            function (rect_7_1) {
                rect_7 = rect_7_1;
            },
            function (mouseOrTouch_1_1) {
                mouseOrTouch_1 = mouseOrTouch_1_1;
            }
        ],
        execute: function () {
            ShapeTool = (function (_super) {
                __extends(ShapeTool, _super);
                function ShapeTool() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ShapeTool.prototype.onSurfaceEvent = function (event) {
                    switch (event.status) {
                        case 0 /* Start */:
                            return this.onStart(event);
                        case 2 /* Drag */:
                            return this.onDrag(event);
                        case 4 /* End */:
                            return this.onEnd(event);
                    }
                };
                ShapeTool.prototype.onStart = function (event) {
                    this.start = this.getPrimaryPointer(event);
                };
                ShapeTool.prototype.onDrag = function (event) {
                    if (!this.start) {
                        return;
                    }
                    var surface = event.target;
                    var shape = surface.getTempShape();
                    var start = this.start;
                    var end = this.getPrimaryPointer(event);
                    var dst = rect_7.Rect.unionOfPoints([start, end]);
                    shape.mapToRect(dst, 2 /* Fill */);
                    surface.requestRender();
                };
                ShapeTool.prototype.onEnd = function (event) {
                    this.start = null;
                    var surface = event.target;
                    surface.addTempDrawable();
                    surface.requestRender();
                };
                return ShapeTool;
            }(mouseOrTouch_1.MouseOrTouchTool));
            exports_38("ShapeTool", ShapeTool);
        }
    };
});
System.register("ts/tool/shapeAspect", ["ts/tool/shape"], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var shape_11, ShapeAspectTool;
    return {
        setters: [
            function (shape_11_1) {
                shape_11 = shape_11_1;
            }
        ],
        execute: function () {
            ShapeAspectTool = (function (_super) {
                __extends(ShapeAspectTool, _super);
                function ShapeAspectTool() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ShapeAspectTool.prototype.onDrag = function (event) {
                    if (!this.start) {
                        return;
                    }
                    var surface = event.target;
                    var shape = surface.getTempShape();
                    var start = this.start;
                    var end = this.getPrimaryPointer(event);
                    shape.stretchAcrossLine(start, end);
                    surface.requestRender();
                };
                return ShapeAspectTool;
            }(shape_11.ShapeTool));
            exports_39("ShapeAspectTool", ShapeAspectTool);
        }
    };
});
System.register("ts/tool/group", [], function (exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("ts/tool/colorSampler", ["gl2d/tool/mouseOrTouch"], function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var mouseOrTouch_2, ColorSampler;
    return {
        setters: [
            function (mouseOrTouch_2_1) {
                mouseOrTouch_2 = mouseOrTouch_2_1;
            }
        ],
        execute: function () {
            ColorSampler = (function (_super) {
                __extends(ColorSampler, _super);
                function ColorSampler(onColorSample) {
                    var _this = _super.call(this) || this;
                    _this.onColorSample = onColorSample;
                    return _this;
                }
                ColorSampler.prototype.onSurfaceEvent = function (event) {
                    switch (event.status) {
                        case 0 /* Start */:
                        case 2 /* Drag */:
                            var surface = event.target;
                            var pointer = this.getPrimaryPointer(event);
                            var drawable = surface.getDrawableContaining(pointer);
                            if (drawable) {
                                var color = drawable.color;
                                this.onColorSample(color);
                            }
                    }
                };
                return ColorSampler;
            }(mouseOrTouch_2.MouseOrTouchTool));
            exports_41("ColorSampler", ColorSampler);
        }
    };
});
System.register("ts/option/color", ["gl2d/struct/util", "ts/option/option", "gl2d/struct/color"], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var util_1, option_2, color_5, ColorOption;
    return {
        setters: [
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (option_2_1) {
                option_2 = option_2_1;
            },
            function (color_5_1) {
                color_5 = color_5_1;
            }
        ],
        execute: function () {
            ColorOption = (function () {
                function ColorOption(unparsed, value) {
                    this.unparsed = unparsed;
                    this.value = value;
                }
                ColorOption.create = function (key, initial) {
                    var src = option_2.Option.str(key, null);
                    var val;
                    if (src.val && util_1.ArgbRegex.test(src.val)) {
                        val = color_5.Color.fromArgbString(src.val);
                    }
                    else {
                        val = initial;
                        src.val = initial.toArgbString();
                    }
                    return new ColorOption(src, val);
                };
                Object.defineProperty(ColorOption.prototype, "val", {
                    get: function () {
                        return this.value;
                    },
                    set: function (value) {
                        this.value = value;
                        this.unparsed.val = value.toArgbString();
                    },
                    enumerable: true,
                    configurable: true
                });
                return ColorOption;
            }());
            exports_42("ColorOption", ColorOption);
        }
    };
});
System.register("ts/settings/color", ["spectrum-colorpicker", "ts/option/color", "gl2d/struct/color", "jquery"], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var color_6, color_7, $, ColorSettings;
    return {
        setters: [
            function (_1) {
            },
            function (color_6_1) {
                color_6 = color_6_1;
            },
            function (color_7_1) {
                color_7 = color_7_1;
            },
            function ($_1) {
                $ = $_1;
            }
        ],
        execute: function () {
            ColorSettings = (function () {
                function ColorSettings() {
                }
                ColorSettings.prototype.pickRandom = function () {
                    this.color.val.setRandom();
                    this.updateColorSetting();
                };
                ColorSettings.prototype.pickColorF = function (color) {
                    this.color.val.setFromColorF(color);
                    this.updateColorSetting();
                };
                ColorSettings.prototype.updateColorSetting = function () {
                    var _a = this, color = _a.color, input = _a.input, callback = _a.callback;
                    color.unparsed.val = color.val.toArgbString();
                    input.spectrum("set", color.unparsed.val);
                    callback(color.val);
                };
                ColorSettings.create = function (onColorPick) {
                    var picker = new ColorSettings();
                    picker.input = $("#color-settings");
                    picker.color = color_6.ColorOption.create("drawColor", new color_7.Color(39, 78, 19, 255));
                    picker.alpha = picker.color.val.a / 0xff;
                    picker.callback = onColorPick;
                    onColorPick(picker.color.val);
                    picker.input.spectrum({
                        color: picker.color.unparsed.val,
                        flat: false,
                        showInput: false,
                        showInitial: false,
                        allowEmpty: false,
                        showAlpha: true,
                        disabled: false,
                        showPalette: true,
                        showPaletteOnly: true,
                        togglePaletteOnly: true,
                        showSelectionPalette: false,
                        clickoutFiresChange: true,
                        hideAfterPaletteSelect: true,
                        preferredFormat: "rgb",
                        palette: [
                            ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                            ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                            ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                            ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                            ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                            ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                            ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
                        ],
                        change: function (tinycolor) {
                            if (tinycolor) {
                                // Override alpha (in case of palette selection)
                                tinycolor.setAlpha(picker.alpha);
                                // Update UI component
                                var argb = tinycolor.toHex8String();
                                picker.input.spectrum("set", argb);
                                // Update color
                                picker.color.val.setFromArgbString(argb);
                                picker.color.unparsed.val = argb;
                                // Update renderer color
                                onColorPick(picker.color.val);
                            }
                        },
                        hide: function (tinycolor) {
                            // Set unconfirmed alpha back to alpha
                            picker.alpha = picker.color.val.a / 0xff;
                        }
                    });
                    picker.input.on("dragstop.spectrum", function (e, tinyColor) {
                        // Value confirmed if change event is called.
                        // Otherwise reverts to alpha when color picker is hidden.
                        picker.alpha = tinyColor.getAlpha();
                    });
                    return picker;
                };
                return ColorSettings;
            }());
            exports_43("ColorSettings", ColorSettings);
        }
    };
});
System.register("ts/settings/other", ["ts/option/option"], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var option_3, Slider, OtherSettings;
    return {
        setters: [
            function (option_3_1) {
                option_3 = option_3_1;
            }
        ],
        execute: function () {
            // import * as $ from 'jquery';
            Slider = require('bootstrap-slider');
            OtherSettings = (function () {
                function OtherSettings() {
                }
                OtherSettings.create = function (onStrokeThicknessPick, onZoomSpeedPick) {
                    var settings = new OtherSettings();
                    settings.strokeWidth = option_3.Option.num("stroke-width", 50, 1, 100);
                    settings.onStrokeWidthPick = onStrokeThicknessPick;
                    settings.zoomSpeed = option_3.Option.num("zoom-speed", 50, 1, 100);
                    settings.onZoomSpeedPick = onZoomSpeedPick;
                    // Set initial values
                    onStrokeThicknessPick(settings.strokeWidth.val);
                    onZoomSpeedPick(settings.zoomSpeed.val);
                    // Init stroke thickness slider
                    var strokeSlider = new Slider("input[name=stroke-width]", {
                        min: 1,
                        max: 100,
                        step: 1,
                        value: settings.strokeWidth.val,
                        tooltip: 'show'
                    });
                    strokeSlider.on('slideStop', function () {
                        var val = strokeSlider.getValue();
                        settings.strokeWidth.val = val;
                        settings.onStrokeWidthPick(val);
                    });
                    // Init zoom speed slider
                    var zoomSlider = new Slider("input[name=zoom-speed]", {
                        min: 1,
                        max: 100,
                        step: 1,
                        value: settings.zoomSpeed.val,
                        tooltip: 'show'
                    });
                    zoomSlider.on('slideStop', function () {
                        var val = zoomSlider.getValue();
                        settings.zoomSpeed.val = val;
                        settings.onZoomSpeedPick(val);
                    });
                    return settings;
                };
                return OtherSettings;
            }());
            exports_44("OtherSettings", OtherSettings);
        }
    };
});
System.register("ts/settings/shape", ["ts/option/option", "jquery"], function (exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var option_4, $, ShapeSettings;
    return {
        setters: [
            function (option_4_1) {
                option_4 = option_4_1;
            },
            function ($_2) {
                $ = $_2;
            }
        ],
        execute: function () {
            ShapeSettings = (function () {
                function ShapeSettings() {
                }
                ShapeSettings.create = function (onShapePick) {
                    var settings = new ShapeSettings();
                    settings.shape = option_4.Option.str("shape", "triangle");
                    settings.onShapePick = onShapePick;
                    $("#shape-button")
                        .click(function () {
                        settings.onShapePick(settings.shape.val);
                    })
                        .children("i").addClass("icon-" + settings.shape.val);
                    // Set initial shape
                    onShapePick(settings.shape.val);
                    $("#shape-settings > a").click(function () {
                        var shape = $(this).attr("id");
                        // Set shape as button icon
                        $("#shape-button").children("i")
                            .removeClass("icon-" + settings.shape.val)
                            .addClass("icon-" + shape);
                        // Update option and send callback
                        settings.shape.val = shape;
                        settings.onShapePick(shape);
                    });
                    return settings;
                };
                return ShapeSettings;
            }());
            exports_45("ShapeSettings", ShapeSettings);
        }
    };
});
System.register("ts/settings/tool", ["ts/option/option", "jquery"], function (exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var option_5, $, ToolSettings;
    return {
        setters: [
            function (option_5_1) {
                option_5 = option_5_1;
            },
            function ($_3) {
                $ = $_3;
            }
        ],
        execute: function () {
            ToolSettings = (function () {
                function ToolSettings() {
                }
                ToolSettings.create = function (onToolPick) {
                    var settings = new ToolSettings();
                    settings.tool = option_5.Option.str("tool", "shape");
                    settings.onToolPick = onToolPick;
                    $("#tool-button")
                        .click(function () {
                        settings.onToolPick(settings.tool.val);
                    })
                        .children("i")
                        .addClass("icon-" + settings.tool.val);
                    // Set initial tool
                    onToolPick(settings.tool.val);
                    $("#tool-settings > a").click(function () {
                        var toolType = $(this).attr("id");
                        settings.pickToolType(toolType);
                    });
                    return settings;
                };
                ToolSettings.prototype.pickToolType = function (toolType) {
                    // Set stroke as button icon
                    $("#tool-button").children("i")
                        .removeClass("icon-" + this.tool.val)
                        .addClass("icon-" + toolType);
                    // Update setting and send callback
                    this.tool.val = toolType;
                    this.onToolPick(toolType);
                };
                return ToolSettings;
            }());
            exports_46("ToolSettings", ToolSettings);
        }
    };
});
System.register("ts/tool/line", ["gl2d/tool/mouseOrTouch"], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var mouseOrTouch_3, LineTool;
    return {
        setters: [
            function (mouseOrTouch_3_1) {
                mouseOrTouch_3 = mouseOrTouch_3_1;
            }
        ],
        execute: function () {
            LineTool = (function (_super) {
                __extends(LineTool, _super);
                function LineTool() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LineTool.prototype.onSurfaceEvent = function (event) {
                    switch (event.status) {
                        case 0 /* Start */:
                            return this.onStart(event);
                        case 2 /* Drag */:
                            return this.onDrag(event);
                        case 4 /* End */:
                            return this.onEnd(event);
                    }
                };
                LineTool.prototype.onStart = function (event) {
                    this.start = this.getPrimaryPointer(event);
                };
                LineTool.prototype.onDrag = function (event) {
                    if (!this.start) {
                        return;
                    }
                    var surface = event.target;
                    var line = surface.getTempLine();
                    // Transform line based on start and end points
                    var start = this.start;
                    var end = this.getPrimaryPointer(event);
                    line.setFromPointToPoint(start, end, surface.lineWidth);
                    surface.requestRender();
                };
                LineTool.prototype.onEnd = function (event) {
                    this.start = null;
                    var surface = event.target;
                    surface.addTempDrawable();
                    surface.requestRender();
                };
                return LineTool;
            }(mouseOrTouch_3.MouseOrTouchTool));
            exports_47("LineTool", LineTool);
        }
    };
});
System.register("ts/tool/select", ["gl2d/struct/mat2d", "gl2d/struct/vec2", "gl2d/tool/mouseOrTouch"], function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var mat2d_9, vec2_3, mouseOrTouch_4, SelectTool;
    return {
        setters: [
            function (mat2d_9_1) {
                mat2d_9 = mat2d_9_1;
            },
            function (vec2_3_1) {
                vec2_3 = vec2_3_1;
            },
            function (mouseOrTouch_4_1) {
                mouseOrTouch_4 = mouseOrTouch_4_1;
            }
        ],
        execute: function () {
            SelectTool = (function (_super) {
                __extends(SelectTool, _super);
                function SelectTool() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.dragCount = 0;
                    _this.reselected = false;
                    return _this;
                }
                SelectTool.prototype.onSurfaceEvent = function (event) {
                    var pointer = this.getPrimaryPointer(event);
                    switch (event.status) {
                        case 1 /* Move */:
                            this.onMove(event, pointer);
                            return;
                        case 0 /* Start */:
                            this.dragCount = 0;
                            this.onStart(event, pointer);
                            break;
                        case 2 /* Drag */:
                            this.dragCount++;
                            this.onDrag(event, pointer);
                            break;
                        case 4 /* End */:
                            this.onEnd(event, pointer);
                            break;
                    }
                    this.previous = pointer;
                };
                SelectTool.prototype.onMove = function (event, pointer) {
                    var surface = event.target;
                    var _a = surface.renderer, selection = _a.selection, selectionHover = _a.selectionHover;
                    // If the point is outside of the selection 
                    if (!selection.contains(pointer)) {
                        // Check if the point is inside some other drawable
                        var drawable = surface.getDrawableContaining(pointer);
                        // If the drawable is not already the hover target
                        if (drawable !== selectionHover.target) {
                            // Indicate that drawable is being hovered
                            selectionHover.setTarget(drawable);
                            // Render to show changes
                            surface.requestRender();
                        }
                    }
                };
                SelectTool.prototype.onStart = function (event, pointer) {
                    var surface = event.target;
                    var _a = surface.renderer, selection = _a.selection, selectionHover = _a.selectionHover;
                    this.reselected = selection.contains(pointer);
                    if (this.reselected) {
                        // Reclicked a drawable that has already been selected
                        this.transform = this.getTransformType(pointer, selection);
                    }
                    else {
                        if (selectionHover.contains(pointer)) {
                            // Selected a drawable that has already been indicated by the hover graphic
                            selection.setTarget(selectionHover.target);
                            selectionHover.setTarget(null);
                            this.transform = 1 /* Translate */;
                        }
                        else {
                            // Selected a new drawable, or clicked on nothing
                            selection.setTarget(surface.getDrawableContaining(pointer));
                            this.transform = selection.target ? 1 /* Translate */ : 0 /* None */;
                        }
                    }
                    if (this.transform !== 0 /* None */) {
                        this.matrix = mat2d_9.Mat2d.identity();
                    }
                    surface.requestRender();
                };
                SelectTool.prototype.onDrag = function (event, pointer) {
                    if (!this.matrix) {
                        return;
                    }
                    var surface = event.target;
                    var renderer = surface.renderer;
                    var selection = renderer.selection;
                    var matrix = this.matrix;
                    switch (this.transform) {
                        case 1 /* Translate */:
                            var vector = vec2_3.Vec2.fromPointToPoint(this.previous, pointer);
                            selection.offset(vector);
                            matrix.postTranslate(vector);
                            break;
                        case 3 /* Scale */:
                            var scaleMatrix = mat2d_9.Mat2d.scaleToPoint(this.previous, pointer, this.pivot);
                            selection.scale(scaleMatrix);
                            matrix.postConcat(scaleMatrix);
                            break;
                        case 2 /* Rotate */:
                            var rotationMatrix = mat2d_9.Mat2d.stretchRotateToPoint(this.control.measureCenter(), pointer, this.pivot);
                            selection.transform(rotationMatrix);
                            matrix.postConcat(rotationMatrix);
                            break;
                    }
                    surface.requestRender();
                };
                SelectTool.prototype.onEnd = function (event, pointer) {
                    var surface = event.target;
                    var renderer = surface.renderer;
                    var selection = renderer.selection;
                    // Save transform 
                    surface.recordTransformation(selection.target, this.matrix);
                    this.matrix = null;
                    // End transform if user tapped the selected shape
                    if (this.reselected && this.dragCount < 5 && selection.contains(pointer)) {
                        this.onDetach(surface);
                    }
                };
                SelectTool.prototype.onDetach = function (surface) {
                    var renderer = surface.renderer;
                    var selection = renderer.selection;
                    // Remove selections
                    var hover = renderer.selectionHover;
                    selection.setTarget(null);
                    hover.setTarget(null);
                    // Reset helper variables
                    this.transform = 0 /* None */;
                    this.reselected = false;
                    this.dragCount = 0;
                    this.previous = null;
                    this.control = null;
                    this.pivot = null;
                    this.matrix = null;
                    surface.requestRender();
                };
                SelectTool.prototype.getTransformType = function (pointer, selected) {
                    var pivot = selected.pivot, control = selected.control, frame = selected.frame;
                    // Choose transformation based on position of pointer
                    if (selected.target && selected.contains(pointer)) {
                        if (pivot.contains(pointer)) {
                            // Pointer on pivot
                            this.control = pivot;
                            this.pivot = control.measureCenter();
                            return 2 /* Rotate */;
                        }
                        else if (control.contains(pointer)) {
                            // Pointer on control
                            this.control = control;
                            this.pivot = pivot.measureCenter();
                            return 2 /* Rotate */;
                        }
                        else if (frame.innerRect.contains(pointer)) {
                            // Pointer in frame
                            this.pivot = null;
                            return 1 /* Translate */;
                        }
                        else {
                            // Pointer on frame
                            this.pivot = frame.getVertexOpposite(pointer);
                            return 3 /* Scale */;
                        }
                    }
                    // Pointer outside frame
                    return 0 /* None */;
                };
                return SelectTool;
            }(mouseOrTouch_4.MouseOrTouchTool));
            exports_48("SelectTool", SelectTool);
        }
    };
});
System.register("ts/tool/shapeLine", ["gl2d/tool/mouseOrTouch"], function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var mouseOrTouch_5, ShapeLineTool;
    return {
        setters: [
            function (mouseOrTouch_5_1) {
                mouseOrTouch_5 = mouseOrTouch_5_1;
            }
        ],
        execute: function () {
            ShapeLineTool = (function (_super) {
                __extends(ShapeLineTool, _super);
                function ShapeLineTool() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ShapeLineTool.prototype.onSurfaceEvent = function (event) {
                    switch (event.status) {
                        case 0 /* Start */:
                            return this.onStart(event);
                        case 2 /* Drag */:
                            return this.onDrag(event);
                        case 4 /* End */:
                            return this.onEnd(event);
                    }
                };
                ShapeLineTool.prototype.onStart = function (event) {
                    this.start = this.getPrimaryPointer(event);
                };
                ShapeLineTool.prototype.onDrag = function (event) {
                    if (!this.start) {
                        return;
                    }
                    var surface = event.target;
                    var start = this.start;
                    var end = this.getPrimaryPointer(event);
                    var stroke = surface.getTempShapeBatch();
                    // Clear previous line
                    var matrices = stroke.matrices;
                    matrices.moveToFirst();
                    // Add new line
                    stroke.addLine(start, end, surface.lineWidth);
                    surface.requestRender();
                };
                ShapeLineTool.prototype.onEnd = function (event) {
                    this.start = null;
                    var surface = event.target;
                    surface.addTempShapeBatch();
                    surface.requestRender();
                };
                return ShapeLineTool;
            }(mouseOrTouch_5.MouseOrTouchTool));
            exports_49("ShapeLineTool", ShapeLineTool);
        }
    };
});
System.register("ts/tool/shapeSpray", ["gl2d/tool/mouseOrTouch"], function (exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var mouseOrTouch_6, ShapeSprayTool;
    return {
        setters: [
            function (mouseOrTouch_6_1) {
                mouseOrTouch_6 = mouseOrTouch_6_1;
            }
        ],
        execute: function () {
            ShapeSprayTool = (function (_super) {
                __extends(ShapeSprayTool, _super);
                function ShapeSprayTool() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ShapeSprayTool.prototype.onSurfaceEvent = function (event) {
                    switch (event.status) {
                        case 2 /* Drag */:
                            return this.onDrag(event);
                        case 4 /* End */:
                            return this.onEnd(event);
                    }
                };
                ShapeSprayTool.prototype.onDrag = function (event) {
                    var surface = event.target;
                    var stroke = surface.getTempShapeBatch();
                    // Add another shape if there is room
                    var matrices = stroke.matrices;
                    if (matrices.hasValidPosition()) {
                        var center = this.getPrimaryPointer(event);
                        var radius = surface.lineWidth / 2;
                        stroke.add(center, radius);
                        surface.requestRender();
                    }
                };
                ShapeSprayTool.prototype.onEnd = function (event) {
                    var surface = event.target;
                    surface.addTempShapeBatch();
                    surface.requestRender();
                };
                return ShapeSprayTool;
            }(mouseOrTouch_6.MouseOrTouchTool));
            exports_50("ShapeSprayTool", ShapeSprayTool);
        }
    };
});
System.register("ts/tool/shapeStroke", ["gl2d/tool/mouseOrTouch"], function (exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var mouseOrTouch_7, ShapeStrokeTool;
    return {
        setters: [
            function (mouseOrTouch_7_1) {
                mouseOrTouch_7 = mouseOrTouch_7_1;
            }
        ],
        execute: function () {
            ShapeStrokeTool = (function (_super) {
                __extends(ShapeStrokeTool, _super);
                function ShapeStrokeTool() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ShapeStrokeTool.prototype.onSurfaceEvent = function (event) {
                    switch (event.status) {
                        case 0 /* Start */:
                            return this.onStart(event);
                        case 2 /* Drag */:
                            return this.onDrag(event);
                        case 4 /* End */:
                            return this.onEnd(event);
                    }
                };
                ShapeStrokeTool.prototype.onStart = function (event) {
                    this.previous = this.getPrimaryPointer(event);
                };
                ShapeStrokeTool.prototype.onDrag = function (event) {
                    if (!this.previous) {
                        return;
                    }
                    var surface = event.target;
                    var stroke = surface.getTempShapeBatch();
                    var thickness = surface.lineWidth;
                    var current = this.getPrimaryPointer(event);
                    var previous = this.previous;
                    // Add line from current to previous shape if there is room
                    if (current.distance2(previous) > thickness * thickness) {
                        this.previous = stroke.addLine(previous, current, thickness);
                        surface.requestRender();
                    }
                };
                ShapeStrokeTool.prototype.onEnd = function (event) {
                    var surface = event.target;
                    surface.addTempShapeBatch();
                    surface.requestRender();
                };
                return ShapeStrokeTool;
            }(mouseOrTouch_7.MouseOrTouchTool));
            exports_51("ShapeStrokeTool", ShapeStrokeTool);
        }
    };
});
System.register("ts/tool/stroke", ["gl2d/tool/mouseOrTouch"], function (exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var mouseOrTouch_8, StrokeTool;
    return {
        setters: [
            function (mouseOrTouch_8_1) {
                mouseOrTouch_8 = mouseOrTouch_8_1;
            }
        ],
        execute: function () {
            StrokeTool = (function (_super) {
                __extends(StrokeTool, _super);
                function StrokeTool() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                StrokeTool.prototype.onSurfaceEvent = function (action) {
                    switch (action.status) {
                        case 0 /* Start */:
                            return this.onStart(action);
                        case 2 /* Drag */:
                            return this.onDrag(action);
                        case 4 /* End */:
                            return this.onEnd(action);
                    }
                };
                StrokeTool.prototype.onStart = function (action) {
                    var surface = action.target;
                    var lineWidth = surface.lineWidth;
                    var pointer = this.getPrimaryPointer(action);
                    var stroke = surface.getTempStroke();
                    stroke.moveTo(pointer, lineWidth);
                    surface.requestRender();
                };
                StrokeTool.prototype.onDrag = function (action) {
                    var surface = action.target;
                    var lineWidth = surface.lineWidth;
                    var pointer = this.getPrimaryPointer(action);
                    var stroke = surface.getTempStroke();
                    if (stroke.vertices.hasValidPosition()) {
                        stroke.lineTo(pointer, lineWidth);
                        surface.requestRender();
                    }
                };
                StrokeTool.prototype.onEnd = function (action) {
                    var surface = action.target;
                    surface.addTempStroke();
                    surface.requestRender();
                };
                return StrokeTool;
            }(mouseOrTouch_8.MouseOrTouchTool));
            exports_52("StrokeTool", StrokeTool);
        }
    };
});
System.register("ts/tool/navigation", ["gl2d/tool/mouseOrTouch"], function (exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var mouseOrTouch_9, NavigationTool;
    return {
        setters: [
            function (mouseOrTouch_9_1) {
                mouseOrTouch_9 = mouseOrTouch_9_1;
            }
        ],
        execute: function () {
            NavigationTool = (function (_super) {
                __extends(NavigationTool, _super);
                function NavigationTool() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                NavigationTool.prototype.onSurfaceEvent = function (event) {
                    switch (event.status) {
                        case 1 /* Move */:
                            return this.onMove(event);
                        case 0 /* Start */:
                            return this.onStart(event);
                        case 4 /* End */:
                            return this.onEnd(event);
                    }
                };
                NavigationTool.prototype.onMove = function (event) {
                    var surface = event.target;
                    var _a = surface.renderer, navigateLeft = _a.navigateLeft, navigateRight = _a.navigateRight, addCanvas = _a.addCanvas, removeCanvas = _a.removeCanvas, buttonHover = _a.buttonHover;
                    var pointer = this.getPrimaryPointer(event);
                    // If button is being hovered
                    for (var _i = 0, _b = [navigateLeft, navigateRight, addCanvas, removeCanvas]; _i < _b.length; _i++) {
                        var button = _b[_i];
                        var bounds = button.measureBoundaries();
                        if (bounds.contains(pointer)) {
                            // Indicate with blue button hover
                            buttonHover.mapToRect(bounds);
                            surface.requestRender();
                            return;
                        }
                    }
                    // No button is being hovered
                    if (!buttonHover.matrix.equalsScalar(0)) {
                        // Remove blue button hover
                        buttonHover.matrix.setScalar(0);
                        surface.requestRender();
                    }
                };
                NavigationTool.prototype.onStart = function (event) {
                    this.onMove(event);
                };
                NavigationTool.prototype.onEnd = function (event) {
                    var surface = event.target;
                    var _a = surface.renderer, navigateLeft = _a.navigateLeft, navigateRight = _a.navigateRight, addCanvas = _a.addCanvas, removeCanvas = _a.removeCanvas, buttonHover = _a.buttonHover;
                    var pointer = this.getPrimaryPointer(event);
                    if (navigateLeft.measureBoundaries().contains(pointer)) {
                        surface.importCanvasOnLeft();
                    }
                    else if (navigateRight.measureBoundaries().contains(pointer)) {
                        surface.importCanvasOnRight();
                    }
                    else if (addCanvas.measureBoundaries().contains(pointer)) {
                        surface.addCanvas();
                    }
                    else if (removeCanvas.measureBoundaries().contains(pointer)) {
                        surface.removeCanvas();
                    }
                    buttonHover.matrix.setScalar(0);
                    surface.requestRender();
                };
                return NavigationTool;
            }(mouseOrTouch_9.MouseOrTouchTool));
            exports_53("NavigationTool", NavigationTool);
        }
    };
});
System.register("ts/main", ["ts/tool/shapeAspect", "ts/tool/colorSampler", "ts/rendering/surface", "ts/settings/color", "ts/settings/other", "ts/settings/shape", "ts/settings/tool", "ts/tool/line", "gl2d/tool/wheelZoom", "ts/tool/select", "ts/tool/shape", "ts/tool/shapeLine", "ts/tool/shapeSpray", "ts/tool/shapeStroke", "ts/tool/stroke", "ts/tool/navigation", "gl2d/tool/pan", "gl2d/tool/pinchZoom", "jquery", "tether", "bootstrap"], function (exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    function setTool(tool) {
        if (currentTool !== tool) {
            if (currentTool === selectTool) {
                selectTool.onDetach(surface);
            }
            currentTool = tool;
        }
    }
    function setDrawColor(color) {
        var drawColor = surface.drawColor, renderer = surface.renderer;
        var target = renderer.selection.target;
        // Modify draw color
        drawColor.setFromColor(color);
        // Modify color of selected drawable (if any)
        if (target) {
            surface.changeColor(target, color);
            surface.requestRender();
        }
    }
    function undo() {
        if (surface.undoLastAction()) {
            selectTool.onDetach(surface);
        }
    }
    function redo() {
        if (surface.redoLastUndo()) {
            selectTool.onDetach(surface);
        }
    }
    /**
    * Checks each frame if any canvas needs to be re-rendered.
    */
    function checkRender() {
        // Resize surface if necessary
        surface.resize();
        // Notify surface of animation frame
        surface.onAnimationFrame();
        // Keep calling this function every frame
        requestAnimationFrame(checkRender);
    }
    var shapeAspect_1, colorSampler_1, surface_2, color_8, other_1, shape_12, tool_1, line_2, wheelZoom_1, select_1, shape_13, shapeLine_1, shapeSpray_1, shapeStroke_1, stroke_2, navigation_1, pan_1, pinchZoom_1, $, tether, surface, currentTool, colorPicker, selectTool, wheelZoomTool, pinchZoomTool, navigationTool, tools, toolSettings, key;
    return {
        setters: [
            function (shapeAspect_1_1) {
                shapeAspect_1 = shapeAspect_1_1;
            },
            function (colorSampler_1_1) {
                colorSampler_1 = colorSampler_1_1;
            },
            function (surface_2_1) {
                surface_2 = surface_2_1;
            },
            function (color_8_1) {
                color_8 = color_8_1;
            },
            function (other_1_1) {
                other_1 = other_1_1;
            },
            function (shape_12_1) {
                shape_12 = shape_12_1;
            },
            function (tool_1_1) {
                tool_1 = tool_1_1;
            },
            function (line_2_1) {
                line_2 = line_2_1;
            },
            function (wheelZoom_1_1) {
                wheelZoom_1 = wheelZoom_1_1;
            },
            function (select_1_1) {
                select_1 = select_1_1;
            },
            function (shape_13_1) {
                shape_13 = shape_13_1;
            },
            function (shapeLine_1_1) {
                shapeLine_1 = shapeLine_1_1;
            },
            function (shapeSpray_1_1) {
                shapeSpray_1 = shapeSpray_1_1;
            },
            function (shapeStroke_1_1) {
                shapeStroke_1 = shapeStroke_1_1;
            },
            function (stroke_2_1) {
                stroke_2 = stroke_2_1;
            },
            function (navigation_1_1) {
                navigation_1 = navigation_1_1;
            },
            function (pan_1_1) {
                pan_1 = pan_1_1;
            },
            function (pinchZoom_1_1) {
                pinchZoom_1 = pinchZoom_1_1;
            },
            function ($_4) {
                $ = $_4;
            },
            function (tether_1) {
                tether = tether_1;
            },
            function (_2) {
            }
        ],
        execute: function () {
            window.jQuery = $;
            window.Tether = tether;
            surface = surface_2.Surface.create();
            colorPicker = color_8.ColorSettings.create(setDrawColor);
            shape_12.ShapeSettings.create(function (type) {
                surface.mesh = surface.getMesh(type);
            });
            selectTool = new select_1.SelectTool();
            wheelZoomTool = new wheelZoom_1.WheelZoomTool(1.5, 5);
            pinchZoomTool = new pinchZoom_1.PinchZoomTool();
            navigationTool = new navigation_1.NavigationTool();
            tools = {
                shape: new shape_13.ShapeTool(),
                shapeAspect: new shapeAspect_1.ShapeAspectTool(),
                line: new line_2.LineTool(),
                shapeSpray: new shapeSpray_1.ShapeSprayTool(),
                shapeLine: new shapeLine_1.ShapeLineTool(),
                shapeStroke: new shapeStroke_1.ShapeStrokeTool(),
                stroke: new stroke_2.StrokeTool(),
                colorSampler: new colorSampler_1.ColorSampler(function (color) { return colorPicker.pickColorF(color); }),
                pan: new pan_1.PanTool(),
                select: selectTool,
            };
            toolSettings = tool_1.ToolSettings.create(function (type) {
                setTool(tools[type]);
            });
            other_1.OtherSettings.create(function (thickness) {
                surface.lineWidth = thickness / 1000;
            }, function (zoomSpeed) {
                wheelZoomTool.scaleFactor = 1 + zoomSpeed / 100;
            });
            $("#undo").click(undo);
            $("#redo").click(redo);
            $(document)
                .on("keydown", function (e) {
                key = String.fromCharCode(e.which);
            })
                .on("keyup", function (e) {
                if (key) {
                    if (e.metaKey || e.ctrlKey) {
                        // Ctrl + key
                        switch (key) {
                            case "Z":
                                undo();
                                break;
                            case "Y":
                                redo();
                                break;
                        }
                    }
                    else {
                        switch (key) {
                            case "R":
                                colorPicker.pickRandom();
                                break;
                            case "S":
                                toolSettings.pickToolType("select");
                                break;
                            case "P":
                                toolSettings.pickToolType("pan");
                                break;
                        }
                    }
                    key = null;
                }
                if (e.which === 46 /* Delete */) {
                    var renderer = surface.renderer;
                    var selection = renderer.selection.target;
                    if (selection) {
                        surface.removeDrawable(selection);
                        selectTool.onDetach(surface);
                        surface.requestRender();
                    }
                }
            });
            surface.onWheelEvent(function (event) {
                wheelZoomTool.onSurfaceEvent(event);
                // TODO: interrupt other tools?
            });
            surface.onMouseEvent(function (event) {
                switch (event.src.button) {
                    case 0:
                        // Ctrl not held
                        navigationTool.onSurfaceEvent(event);
                        currentTool.onSurfaceEvent(event);
                        break;
                    case 1:
                        return tools.pan.onSurfaceEvent(event);
                    // TODO: interrupt other tools
                    case 2:
                        return;
                }
            });
            surface.onTouchEvent(function (event) {
                if (event.pointers.length < 2) {
                    navigationTool.onSurfaceEvent(event);
                    currentTool.onSurfaceEvent(event);
                }
                else {
                    pinchZoomTool.onSurfaceEvent(event);
                    // TODO: interrupt other tools
                }
            });
            // Start the loop
            checkRender();
        }
    };
});
