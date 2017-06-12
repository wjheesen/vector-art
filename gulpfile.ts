import gulp = require("gulp");
import browserify = require('browserify'); 
import source = require('vinyl-source-stream'); // Makes browserify output compatible with gulp
import shadify = require('gulp-shadify');
import rename = require('gulp-rename');
let tsify = require('tsify');

gulp.task("update:bundle", function(){
     return browserify()
        .add("./src/ts/main.ts")
        .plugin(tsify)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./build/debug/"));
})

gulp.task("update:shaders", function(){
    return gulp.src("./src/shader/*.glslx")
        .pipe(shadify())
        .pipe(rename({extname: ".ts"}))
        .pipe(gulp.dest("./src/ts/shader/"));
})
