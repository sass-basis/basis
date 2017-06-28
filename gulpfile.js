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
var aigis        = require('gulp-aigis');
var browserSync  = require('browser-sync');
var runSequence  = require('run-sequence');

var dir = {
  src: {
    css  : 'src/css',
    js   : 'src/js',
    font : 'src/font',
    aigis: 'src/aigis'
  },
  dist: {
    css  : 'dist/css',
    js   : 'dist/js',
    font : 'dist/font',
    aigis: 'dist/aigis'
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
      return gulp.src([dir.dist.js + '/basis.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dir.dist.js));
    });
});

/**
 * Build font
 */
gulp.task('font', function() {
  return gulp.src(dir.src.font + '/*')
    .pipe(gulp.dest(dir.dist.font));
});

/**
 * Styleguide
 */
gulp.task('aigis:update', function() {
  return _aigis();
});
gulp.task('aigis:build', ['build'], function() {
  return _aigis();
});
function _aigis() {
  return gulp.src(dir.src.aigis + '/aigis_config.yml')
    .pipe(aigis())
    .on('end', function() {
      runSequence('aigis:css', 'aigis:js');
    });
}

/**
 * Sass to CSS
 */
gulp.task('aigis:css', function() {
  return gulp.src(
      [
        dir.src.aigis + '/assets/css/*.scss',
      ],
      {base: dir.src.aigis + '/assets/css'}
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
    .pipe(gulp.dest(dir.dist.aigis + '/aigis_assets/css'))
    .pipe(postcss([cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dir.dist.aigis + '/aigis_assets/css'));
});

/**
 * Build javascript
 */
gulp.task('aigis:js', function() {
  gulp.src(dir.src.aigis + '/assets/js/*.js')
    .pipe(plumber())
    .pipe(rollup({
      allowRealFiles: true,
      entry: dir.src.aigis + '/assets/js/app.js',
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
    .pipe(gulp.dest(dir.dist.aigis + '/aigis_assets/js'))
    .on('end', function() {
      return gulp.src([dir.dist.aigis + '/aigis_assets/js/app.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dir.dist.aigis + '/aigis_assets/js'));
    });
});

/**
 * Auto Build
 */
gulp.task('watch', function() {
  gulp.watch([dir.src.css + '/**/*.scss'], function() {
    runSequence('css', 'aigis:update');
  });

  gulp.watch([dir.src.js + '/**/*.js'], function() {
    runSequence('js', 'aigis:update');
  });

  gulp.watch([dir.src.aigis + '/**/*.ejs'], function() {
    runSequence('aigis:update');
  });

  gulp.watch([dir.src.aigis + '/assets/css/**/*.scss'], function() {
    runSequence('aigis:css');
  });

  gulp.watch([dir.src.aigis + '/assets/js/**/*.js'], function() {
    runSequence('aigis:js');
  });
});

/**
 * Build
 */
gulp.task('build', ['css', 'js', 'font']);

/**
 * Browsersync
 */
gulp.task('server', ['aigis:build'], function() {
  browserSync.init( {
    server: {
      baseDir: dir.dist.aigis + '/'
    },
    files: [
      dir.dist.aigis + '/index.html',
      dir.dist.aigis + '/aigis_assets/css/style.min.css'
    ]
  });
});

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
gulp.task('test', function() {
  return gulp.src('./tests/tests.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./tests'));
});

gulp.task('default', ['watch', 'server']);
