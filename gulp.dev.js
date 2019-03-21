var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});
 
gulp.task('default', ['allFile','server', 'watch', 'sass']);

gulp.task('allFile', function() {
  gulp.src(['app/**/*', '!app/sass/**/*']) 
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
})

gulp.task('watch', function() {
  gulp.watch(['app/**/*', '!app/sass/**/*'], ['allFile']);
  gulp.watch('app/sass/**/*.scss', ['sass']);

})
gulp.task('server', function() {
  connect.server({
    root: 'dist', //设置根目录
    livereload: true, // 是否热更新
    port: 7777
  });
})