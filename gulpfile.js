var jshint = require('gulp-jshint');
var gulp   = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var settings = require('env-settings');
var less = require('gulp-less');
var jade = require('gulp-jade');

var DEST_FOLDER = 'dist/';

console.log(__dirname);

gulp.task('browserify', function() {
  // Single entry point to browserify
  gulp.src('./app/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : false
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(DEST_FOLDER + 'js'))
});

gulp.task('browserify-build', function() {
  // Single entry point to browserify
  gulp.src('./app/app.js')
    .pipe(browserify({
      insertGlobals : false,
      debug : false
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(DEST_FOLDER + 'js'))
});

gulp.task('lint', function() {
  return gulp.src([
      './app/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('views', function() {
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest(DEST_FOLDER));
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: settings.port,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./app/**/*.js')
    .pipe(connect.reload());
});

gulp.task('gulp-less', function () {
  gulp.src(['./**/*.less', '!./node_modules/**'])
    .pipe(less())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(DEST_FOLDER + 'css'));
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html'], ['views'/*, 'html'*/]);
  gulp.watch(['./app/**/*.js'], ['lint', 'browserify'/*, 'js'*/]);
  gulp.watch(['./app/**/*.less'], ['gulp-less']);
  gulp.watch(['./app/**/*.jade'], ['templates']);
});

gulp.task('templates', function() {
  gulp.src('./app/**/*.jade')
    .pipe(jade({
      locals: {}
    }))
    .pipe(gulp.dest(DEST_FOLDER))
});

gulp.task('default', ['lint', 'browserify', 'views', 'connect', 'watch', 'gulp-less', 'templates'], function() {
  console.log('Gulp started...');
});

gulp.task('build', ['browserify-build', 'views', 'gulp-less', 'templates'], function() {
  console.log('Gulp finished build...');
})
