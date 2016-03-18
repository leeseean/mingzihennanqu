var gulp     = require('gulp');

var htmlmin  = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var watch    = require('gulp-watch');
var cache    = require('gulp-cache');
var del      = require('del');

var paths = {
  html: '*/*.html',
  css: '*/*.css',
  images: '*/img/**/*'
};

var dst_dir = 'public';

gulp.task('clean', function () {
  return del([dst_dir]);
});


gulp.task('html', ['clean'], function() {
  return gulp.src(paths.html)
    .pipe(htmlmin())
    .pipe(gulp.dest(dst_dir));
});


gulp.task('css', ['clean'], function () {
  return gulp.src(paths.css)
    .pipe(cleanCSS())
    .pipe(gulp.dest(dst_dir));
});


gulp.task('images', ['clean'], function () {
  return gulp.src(paths.images)
    .pipe(cache(imagemin({optimizationLevel: 5})))
    .pipe(gulp.dest(dst_dir));
});


gulp.task('default', [ 'html', 'css', 'images']);