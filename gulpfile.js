var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var babel  = require('gulp-babel');

gulp.task('default', ['sass', 'scripts']);

gulp.task('sass', function(){
    return gulp.src('./public/src/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('scripts', function() {
    var jsFiles = ['./public/src/js/components/*.js', './public/src/js/handlers/*.js', './public/src/js/app.js'];
    var jsDest = "./public/assets/js/";
    return gulp.src(jsFiles)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('main.min.js'))
        .pipe(babel({presets: ['es2015']}))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest(jsDest));
});

gulp.task('sass:watch', function () {
    gulp.watch('./public/src/sass/**/*.scss', ['sass']);
});

gulp.task('scripts:watch', function() {
    gulp.watch('./public/src/js/**/*.js', ['scripts'])
});

gulp.task('watch', ['sass:watch', 'scripts:watch']);

