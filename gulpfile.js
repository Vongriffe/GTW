var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var jslint = require('gulp-jslint');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
// var webpack = require('gulp-webpack');



var Files = {
    html: './index.html',
    css_dest: './css',
    scss_all: './sass/**/*.scss',
    scss_main: './sass/*.scss',
    image_max: './image/*',
    image_min:'./dist/images'
}

// gulp.task('es5', function(cb) {
//     return webpack(require('./webpack.config.js'), function(err, stats) {
//         if (err) throw err;
//         console.log(stats.toString());
//         cb();
//         browserSync.reload();
//     })
// })

gulp.task('image', function(){

  return gulp.src(Files.image_min)

      .pipe(imagemin({interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: true}] }))
            .pipe(gulp.dest(Files.image_min))
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

gulp.task('default', ['sass'], function(){

    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(Files.scss_all, ['sass']);
    gulp.watch(Files.html, browserSync.reload);
    gulp.watch(Files.js, ['es5']);
});
