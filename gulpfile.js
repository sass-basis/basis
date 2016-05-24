'use strict';

/**
 * Import node modules
 */
var gulp         = require( 'gulp' );
var sass         = require( 'gulp-sass' );
var rename       = require( 'gulp-rename' );
var postcss      = require( 'gulp-postcss' );
var autoprefixer = require( 'autoprefixer' );
var cssnano      = require( 'cssnano' );

var path = {
  src: {
    scss: 'src/scss/**/*.scss'
  },
  dist: {
    css: 'dist/css'
  }
};

/**
 * Sass to CSS
 */
gulp.task('sass', function() {
  return gulp.src(path.src.scss)
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    ]))
    .pipe(gulp.dest(path.dist.css))
    .pipe(postcss([cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.dist.css));
});

/**
 * Auto Compile Sass.
 */
gulp.task('watch', function() {
  gulp.watch([path.src.scss], ['sass']);
});

/**
 * Build
 */
gulp.task('build', ['sass']);

/**
 * Release
 */
gulp.task('release', ['build'], function() {
  return gulp.src(
      [
        './**',
        '!node_modules',
        '!node_modules/**'
      ])
      .pipe( gulp.dest('release'));
} );

/**
 * Sass test
 */
gulp.task('test', function() {
  return gulp.src('tests/tests.scss')
    .pipe(sass());
});

gulp.task( 'default', ['build', 'watch'] );
