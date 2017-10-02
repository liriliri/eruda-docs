var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    htmlReplace = require('gulp-html-replace'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename');

gulp.task('clean', function () 
{
    return gulp.src('dist').pipe(clean());
});    

gulp.task('html', function () 
{
    return gulp.src('*.html')
               .pipe(htmlReplace({
                   style: '<link rel="stylesheet" href="style.min.css">',
                   jsEruda: '<script src="eruda.min.js"></script>',
                   jsEustia: '<script src="eustia.min.js"></script>'
               })) 
               .pipe(htmlmin({
                   collapseWhitespace: true,
                   minifyJS: true
               }))
               .pipe(gulp.dest('dist'));
});

gulp.task('css', function () 
{
    return gulp.src('*.css')
               .pipe(cssmin())
               .pipe(rename({suffix: '.min'}))
               .pipe(gulp.dest('dist'));
});

gulp.task('js', function () 
{
    return gulp.src('eustia.js')
               .pipe(uglify())
               .pipe(rename({suffix: '.min'}))
               .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () 
{
    var src = [
        'node_modules/eruda/eruda.min.js',
        'node_modules/eruda-fps/eruda-fps.min.js',
        'favicon.ico',
        'test.json',
        'im*/*.png'
    ];

    return gulp.src(src)
               .pipe(gulp.dest('dist'));
});

gulp.task('default', function (cb)
{
    runSequence('clean', ['html', 'css', 'js', 'copy'], cb);
});