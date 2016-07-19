var gulp = require('gulp'),
	del = require('del'),
	minifycss = require('gulp-minify-css'),
	rev = require('gulp-rev'),
	ngannotate = require('gulp-ng-annotate'),
	uglify = require('gulp-uglify'),
	usemin = require('gulp-usemin'),
	minifyHtml = require('gulp-minify-html'),
	less = require('gulp-less'),
	cssmin = require('gulp-cssmin'),
	htmlmin = require('gulp-htmlmin');
    
gulp.task('clean', function() {
    return del(['dest/*'], { force: true } );
});

gulp.task('less', function(){
    return gulp.src('./app/styles.less')
        .pipe(less())
		.pipe(cssmin())
        .pipe(gulp.dest('./dest'));
});

gulp.task('js', function () {
  gulp.src(['./app/app.js'])
  	.pipe(ngannotate())
    .pipe(uglify())
    .pipe(gulp.dest('./dest'));
});

gulp.task('html', function() {
  return gulp.src('./app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dest'))
});

gulp.task('default', ['clean'], function() {
    gulp.start('less', 'js');
});