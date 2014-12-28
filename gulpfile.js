var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('bootstrap:prepareLess', function bootstrapPrepareLess() {
  return gulp.src('customs/less/bootstrap.less')
      .pipe(gulp.dest('bower_components/bootstrap/less/'));
});

gulp.task('bootstrap:compileLess', ['bootstrap:prepareLess'], function bootstrapCompileLess() {
  return gulp.src('bower_components/bootstrap/less/bootstrap.less')
      .pipe(less())
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('assets/css/'));
});

gulp.task('bootstrap:compileJs', function bootstrapCompileLess() {
  return gulp.src(['bower_components/bootstrap/js/button.js',
                'bower_components/bootstrap/js/transition.js',
                'bower_components/bootstrap/js/collapse.js'])
      .pipe(concat('bootstrap.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('assets/js/'))
});