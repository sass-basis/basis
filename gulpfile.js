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
var styleguide   = require('sc5-styleguide');

var dir = {
  src: {
    css : 'src/css',
    js  : 'src/js',
    font: 'src/font'
  },
  dist: {
    css       : 'dist/css',
    js        : 'dist/js',
    font      : 'dist/font',
    styleguide: 'dist/styleguide'
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
      outputStyle: 'expanded',
      includePaths: require('node-normalize-scss').includePaths
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
        .pipe(gulp.dest(dir.dist.js))
        .pipe(gulp.dest(dir.dist.styleguide + '/assets/js'));
    });
});

/**
 * Build font
 */
gulp.task('font', function() {
  return gulp.src(dir.src.font + '/*')
    .pipe(gulp.dest(dir.dist.font))
    .pipe(gulp.dest(dir.dist.styleguide + '/dist/font'));
});

/**
 * Auto Build
 */
gulp.task('watch', function() {
  gulp.watch([dir.src.css + '/**/*.scss'], ['css']);
  gulp.watch([dir.src.js + '/**/*.js'], ['js']);
  gulp.watch([dir.dist.css + '/basis.css'], ['styleguide']);
});

/**
 * Build
 */
gulp.task('build', ['css', 'js', 'font']);

/**
 * Creates the zip file
 */
gulp.task('zip', function(){
  return gulp.src(
      [
        '**',
        '.editorconfig',
        '.gitignore',
        '!node_modules',
        '!node_modules/**',
        '!basis.zip'
      ]
      , {base: './'}
    )
    .pipe(zip('basis.zip'))
    .pipe(gulp.dest('./'));
});

/**
 * Sass tests
 */
gulp.task('sass-test', function() {
  return gulp.src('./tests/tests.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./tests'));
});

/**
 * Styleguide
 */
gulp.task('styleguide:generate', function() {
  return gulp.src(dir.dist.css + '/basis.css')
    .pipe(styleguide.generate({
        title: 'Basis Styleguide',
        server: true,
        rootPath: dir.dist.styleguide,
        overviewPath: 'README.md',
        parsers: 'postcss',
        extraHead: [
          '<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="crossorigin="anonymous"></script>',
          '<script src="/assets/js/basis.min.js"></script>'
        ],
        disableEncapsulation: true,
        showMarkupSection: true,
        sideNav: true
      }))
    .pipe(gulp.dest(dir.dist.styleguide));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src(dir.dist.css + '/basis.css')
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(dir.dist.styleguide));
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

gulp.task('default', ['build', 'watch', 'styleguide']);
