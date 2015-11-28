
var gulp = require('gulp'),
    babelify = require('babelify'),
    watch = require('gulp-watch'),
    watchify = require('watchify'),
    sourcemaps = require('gulp-sourcemaps');
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    del = require('del');

gulp.task('clean-temp', function(){
  return del(['dist']);
});

gulp.task('assets', ['clean-temp'], function() {
  // Copy over the required dependencies
  gulp.src('./node_modules/phaser/dist/phaser.js')
    .pipe(gulp.dest('./dist/lib'));

  // Copy over the game assets
  gulp.src('./assets/*')
      .pipe(watch('./assets/*'))
      .pipe(gulp.dest('./dist/assets'));
});

gulp.task('html', ['clean-temp'], function() {
  return gulp.src('./app/index.html')
      .pipe(watch('./app/index.html'))
      .pipe(gulp.dest('./dist'));
});

gulp.task('src', ['clean-temp'], function(){

  var bundler = watchify(
    browserify('./app/index.js', { debug: true })
      .transform(babelify, {presets: ['es2015']})
  ).on('update', function() {
    console.log('-> bundling...');
    rebundle();
  });

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist'));
  }

  rebundle();
});

gulp.task('default', ['clean-temp', 'assets', 'html', 'src']);
