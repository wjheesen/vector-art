import gulp = require("gulp");
import browserify = require('browserify'); 
import source = require('vinyl-source-stream'); // Makes browserify output compatible with gulp
let tsify = require('tsify');

gulp.task("update:main", function(){
     return browserify()
        .add("./src/main.ts")
        .plugin(tsify, { target: 'ES5' })
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("./src/"));
})



