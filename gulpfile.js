var gulp = require('gulp');

var imagemin = require('gulp-imagemin');
var del = require('del');

var paths = {
  images: '*/img/**/*'
}

gulp.task('clean', function () {
  return del(['public']);
});


gulp.task('css', ['clean'], function () {

});


gulp.task('images', ['clean'], function () {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('public'));
});


gulp.task('default', ['images']);