var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var concatCss = require('gulp-concat-css')
// base folder
var vendor = 'public/vendor/' 

// ... variables 
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
}


gulp.task('sass', function () {
  return gulp
    .src('assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('./public/css/'));
})

gulp.task('styles', function(){
  return gulp.src(['public/css/blog.css', vendor + 'Font-Awesome-master/css/font-awesome.min.css', vendor + 'animate/animate.css'])
    .pipe(concatCss("app.css"))
    .pipe(gulp.dest('./public/css/'));
})

gulp.task('default', ['sass', 'styles'])

gulp.task('watch', function(){
  gulp.watch('assets/sass/**/*.scss', ['sass'])
  gulp.watch('public/css/**/*.css', ['styles'])
})