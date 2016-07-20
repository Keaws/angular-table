var gulp = require('gulp'),
	del = require('del'),
	ngannotate = require('gulp-ng-annotate'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	cssmin = require('gulp-cssmin'),
	htmlmin = require('gulp-htmlmin'),
    connect = require('gulp-connect'),
    jsonminify = require('gulp-jsonminify');
    
gulp.task('clean', function() {
    return del(['dest/*'], { force: true } );
});

gulp.task('less', function(){
    return gulp.src('./app/styles.less')
        .pipe(less())
		.pipe(cssmin())
        .pipe(gulp.dest('./dest'))
        .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src(['./app/app.js', './node_modules/angular/angular.min.js'])
  	.pipe(ngannotate())
    .pipe(uglify())
    .pipe(gulp.dest('./dest'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src('./app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dest'))
    .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css ')
        .pipe(cssmin())
        .pipe(gulp.dest('./dest'));
});

gulp.task('json', function () {
    return gulp.src(['./app/data.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('./dest'))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    port: 8888,
    root: 'dest',
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
    gulp.watch(['./app/app.js'], ['js']);
    gulp.watch(['./app/styles.less'], ['less']);
    gulp.watch(['./app/data.json'], ['json']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('less', 'js', 'html', 'css', 'json', 'connect', 'watch');
});