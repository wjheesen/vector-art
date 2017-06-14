import gulp = require("gulp");
import browserify = require('browserify'); 
import source = require('vinyl-source-stream'); // Makes browserify output compatible with gulp
import shadify = require('gulp-shadify');
import rename = require('gulp-rename');
import meshify = require('./gulp/meshify');
import svgify = require('./gulp/svgify');
let tsify = require('tsify');
let jsonMinify = require('gulp-json-minify');

let src = "./src";
let build = "./build"
let res = src + "/res";

gulp.task("update:js", function(){
     return browserify()
        .add(`${src}/ts/main.ts`)
        .plugin(tsify)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(`${build}/debug`));
})

gulp.task("update:shaders", function(){
    return gulp.src(`${res}/src/shader/*.glslx`)
        .pipe(shadify())
        .pipe(rename({extname: ".ts"}))
        .pipe(gulp.dest(`${res}/build/shader`))
})

gulp.task("update:meshes", function(){
     return gulp.src(`${res}/src/mesh/*.json`)
        .pipe(jsonMinify())
        .pipe(meshify())
        .pipe(gulp.dest(`${res}/build/mesh`))
})

gulp.task("update:svgs", function(){
    return gulp.src(`${res}/src/mesh/*.json`)
        .pipe(jsonMinify())
        .pipe(svgify())
        .pipe(rename({extname: ".svg"}))
        .pipe(gulp.dest(`${res}/build/svg/shape`))
})
