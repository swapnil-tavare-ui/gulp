var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var clean = require('gulp-clean');
var runSequence = require('gulp4-run-sequence');

gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'))
})


gulp.task('clean', function () {
    return gulp.src(['dist/*'], {
            read: false
        })
        .pipe(clean());
});


//to run all the task in one command
gulp.task('build', function (callback) {
    runSequence(
        'clean',
        ['useref', 'img'],
        callback
    );
});