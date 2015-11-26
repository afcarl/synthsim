var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('default', function() {
  gulp.src('./node_modules/phaser/dist/phaser.js')
    .pipe(gulp.dest('./dist/lib'));
  gulp.src('./assets/*')
      .pipe(watch('./assets/*'))
      .pipe(gulp.dest('./dist/assets'));
  gulp.src('./app/*')
      .pipe(watch('./app/*'))
      .pipe(gulp.dest('./dist'));
});
