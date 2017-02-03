'use strict';

/**
 * Import node modules
 */
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var rename       = require('gulp-rename');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano      = require('cssnano');
var zip          = require('gulp-zip');
var uglify       = require('gulp-uglify');
var rollup       = require('gulp-rollup');
var nodeResolve  = require('rollup-plugin-node-resolve');
var commonjs     = require('rollup-plugin-commonjs');
var babel        = require('rollup-plugin-babel');
var plumber      = require('gulp-plumber');

var dir = {
  src: {
    css: 'src/css',
    js : 'src/js'
  },
  dist: {
    css: 'dist/css',
    js : 'dist/js'
  }
};

/**
 * Sass to CSS
 */
gulp.task('css', function() {
  return gulp.src(
      [
        dir.src.css + '/basis.scss',
        dir.src.css + '/plugin/basis-ie9/basis-ie9.scss'
      ],
      {base: dir.src.css}
    )
    .pipe(plumber())
    .pipe(sass({
      'resolve url nocheck': true
    }))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    ]))
    .pipe(gulp.dest(dir.dist.css))
    .pipe(postcss([cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dir.dist.css));
});

/**
 * Build javascript
 */
gulp.task('js', function() {
  gulp.src(dir.src.js + '/**/*.js')
    .pipe(plumber())
    .pipe(rollup({
      allowRealFiles: true,
      entry: dir.src.js + '/basis.js',
      format: 'iife',
      external: ['jquery'],
      globals: {
        jquery: "jQuery"
      },
      plugins: [
        nodeResolve({ jsnext: true }),
        commonjs(),
        babel({
          presets: ['es2015-rollup'],
          babelrc: false
        })
      ]
    }))
    .pipe(gulp.dest(dir.dist.js))
    .on('end', function() {
      gulp.src([dir.dist.js + '/basis.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dir.dist.js));
    });
});

/**
 * Auto Build
 */
gulp.task('watch', function() {
  gulp.watch([dir.src.css + '/**/*.styl'], ['css']);
  gulp.watch([dir.src.js + '/**/*.js'], ['js']);
});

/**
 * Build
 */
gulp.task('build', ['css', 'js']);

/**
 * Creates the zip file
 */
gulp.task('zip', function(){
  return gulp.src(
      [
        '**/*',
        '!node_modules',
        '!node_modules/**',
        '!.git',
        '!.gitignore',
        '!.travis.yml',
        '!basis.zip',
        '!**/.DS_Store'
      ]
      , {base: './'}
    )
    .pipe(zip('basis.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['build', 'watch']);
