var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('concatCss', function () {
    //add all the CSS files which you want to concat into one CSS file, as per your folder structure in the order you want
    return gulp.src([
            'css/slick.css',
            'css/animate.css',
            'css/style.css'
        ])
        //save the CSS file by whatever name you want (in this case I've saved it by all.css)
        .pipe(concat('all.css'))
        //this will minify your CSS
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        //add the destination folder name here where you want to save your file(in this case I've saved in dist folder)
        .pipe(gulp.dest('dist'))
        //added to reload browser on save
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('concatJs', function () {
    //add all the JS files which you want to concat into one JS file, as per your folder structure in the order you want
    return gulp.src([
            'js/jquery.min.js',
            'js/slick.js',
            'js/wow.min.js',
            'js/validation.js',
            'js/main.js'
        ])
        //save the JS file by whatever name you want (in this case I've saved it by all.css)
        .pipe(concat('all.js'))
        //this will minify your JS
        .pipe(uglify())
        //add the destination folder name here where you want to save your file(in this case I've saved in dist folder)
        .pipe(gulp.dest('dist'))
        //added to reload browser on save
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('watch', function () {
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: "./"
        }
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        // proxy: "yourlocal.dev"
    });
    gulp.watch('css/*.css', gulp.series('concatCss'));
    gulp.watch('js/*.js', gulp.series('concatJs'));

})