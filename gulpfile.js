'use strict';

/**
 * Import node modules
 */
var gulp         = require( 'gulp' );
var sass         = require( 'gulp-sass' );
var rename       = require( 'gulp-rename' );
var browser_sync = require( 'browser-sync' );
var postcss      = require( 'gulp-postcss' );
var autoprefixer = require( 'autoprefixer' );
var cssnano      = require( 'cssnano' );

var path = {
  src: {
    scss: 'src/scss/**/*.scss',
    doc: 'doc/**'
  },
  dist: {
    css: 'dist/css',
    doc: 'doc'
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
} );

gulp.task('sass:build', ['sass']);

/**
 * Browsersync.
 * Auto reload setting.
 */
gulp.task('browsersync', function() {
  browser_sync.init({
    server: {
      baseDir: path.dist.doc
    },
    files: [
      path.src.doc
    ]
  });
});

/**
 * Auto Compile Sass.
 */
gulp.task('watch', function() {
  gulp.watch([path.src.scss], ['build']);
});

gulp.task('build', ['sass:build'], function() {
  return gulp.src(
      [
        'dist/**',
        'vendor/**'
      ],
      { base: './' }
    )
    .pipe(gulp.dest(path.dist.doc));
});

/**
 * Deploy GitHub Pages
 */
gulp.task('deploy_gh_pages', ['build'], function() {
  return gulp.src(path.src.doc)
      .pipe(gulp.dest('gh-pages'));
} );

/**
 * Release
 */
gulp.task('release', ['build'], function() {
  return gulp.src(
      [
        './**',
        '!node_modules',
        '!node_modules/**',
        '!gh-pages',
        '!gh-pages/**'
      ])
      .pipe( gulp.dest('release'));
} );

gulp.task( 'default', ['build', 'browsersync', 'watch'] );
