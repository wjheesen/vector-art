// Typings for the ANGLE_instanced_array extension, with documentation extracted from https://developer.mozilla.org/en-US/docs/Web/API/ANGLE_instanced_arrays

/**
 * The ANGLE_instanced_arrays extension is part of the WebGL API and allows to draw the same object, or groups of similar objects multiple times, if they share the same vertex data, primitive count and type.
 * WebGL extensions are available using the WebGLRenderingContext.getExtension() method. 
 * Example: var ext = gl.getExtension('ANGLE_instanced_arrays');
 */
export declare class ANGLEInstancedArrays {
    
    /**
     * Returns a GLint describing the frequency divisor used for instanced rendering when used in the gl.getVertexAttrib() as the pname parameter.
     */
    readonly VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE: GLint;

    /**
     * Behaves identically to gl.drawArrays() except that multiple instances of the range of elements are executed, and the instance advances for each iteration.
     * @param mode A GLenum specifying the type primitive to render. Possible values are:
     * gl.POINTS: Draws a single dot.
     * gl.LINE_STRIP: Draws a straight line to the next vertex.
     * gl.LINE_LOOP: Draws a straight line to the next vertex, and connects the last vertex back to the first.
     * gl.LINES: Draws a line between a pair of vertices.
     * gl.TRIANGLE_STRIP
     * gl.TRIANGLE_FAN
     * gl.TRIANGLES: Draws a triangle for a group of three vertices.
     * @param first A GLint specifying the starting index in the array of vector points.
     * @param count A GLsizei specifying the number of indices to be rendered.
     * @param primcount A GLsizei specifying the number of instances of the range of elements to execute.
     */
    drawArraysInstancedANGLE(mode: GLenum, first: GLint, count: GLsizei, primcount: GLsizei): void;

    /**
     * Behaves identically to gl.drawElements() except that multiple instances of the set of elements are executed and the instance advances between each set.
     * @param mode A GLenum specifying the type primitive to render. Possible values are:
     * gl.POINTS: Draws a single dot.
     * gl.LINE_STRIP: Draws a straight line to the next vertex.
     * gl.LINE_LOOP: Draws a straight line to the next vertex, and connects the last vertex back to the first.
     * gl.LINES: Draws a line between a pair of vertices.
     * gl.TRIANGLE_STRIP
     * gl.TRIANGLE_FAN
     * gl.TRIANGLES: Draws a triangle for a group of three vertices.
     * @param count A GLsizei specifying the number of elements to be rendered
     * @param type A GLenum specifying the type of the values in the element array buffer. Possible values are:
     * gl.UNSIGNED_BYTE
     * gl.UNSIGNED_SHORT
     * When using the OES_element_index_uint extension:
     * gl.UNSIGNED_INT
     * @param offset A GLintptr specifying an offset in the element array buffer. Must be a valid multiple of the size of the given type.
     * @param primcount A GLsizei specifying the number of instances of the set of elements to execute.
     */
    drawElementsInstancedANGLE(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr, primcount: GLsizei): void;

    /**
     * Modifies the rate at which generic vertex attributes advance when rendering multiple instances of primitives with drawArraysInstancedANGLE() and drawElementsInstancedANGLE().
     * @param index A GLuint specifying the index of the generic vertex attributes.
     * @param divisor A GLuint specifying the number of instances that will pass between updates of the generic attribute.
     */
    vertexAttribDivisorANGLE(index: GLuint, divisor: GLuint): void;
}