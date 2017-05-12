import gulp = require("gulp");
import browserify = require('browserify'); 
import source = require('vinyl-source-stream'); // Makes browserify output compatible with gulp
let tsify = require('tsify');

gulp.task("update:bundle", function(){
     return browserify()
        .add("./src/bundle.ts")
        .plugin(tsify, { target: 'ES5' })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./build/debug/"));
})



