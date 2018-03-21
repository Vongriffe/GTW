const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const jslint = require('gulp-jslint');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');


var Files = {
    html: 'index.html',
    html_main: './my-index.html',
    css_dest: './dist/css',
    scss_all: './src/**/**/*.scss',
    scss_main: './src/**/*.scss',
    js_all: './src/**/**/*.js',
    js_main: './src/js/app.js',
    js_dest: './dist',
    image_max: './src/images/*',
    image_min:'./dist/images'
}

gulp.task('js', function() {

  gulp.src(Files.js_main)
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest(Files.js_dest));
});

gulp.task('sass', function(){

    return gulp.src(Files.scss_main)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(Files.css_dest))
        .pipe(browserSync.stream())
});

gulp.task('image', function(){

  return gulp.src(Files.image_min)

      .pipe(imagemin({interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: true}] }))
            .pipe(gulp.dest(Files.image_min))
});

gulp.task('default', ['sass','js'], function(){

    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(Files.scss_all, ['sass']);
    gulp.watch(Files.html, browserSync.reload);
    gulp.watch(Files.js_all, ['js']);
});
