var gulp = require('gulp');

// requires gulp-sass plugin
var sass = require('gulp-sass');

// browser synv
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

// surge deploy
var surge = require('gulp-surge')

gulp.task('deploy', [], function () {
  return surge({
    project: './app',         // Path to your static build directory
    domain: 'jakedoran.io'  // Your domain or Surge subdomain
  })
})

// compile sass to css
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


// gulp watch
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // reloads browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

