/**
 * Import node modules
 */
import gulp         from 'gulp';
import sass         from 'gulp-sass';
import rename       from 'gulp-rename';
import postcss      from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano      from 'cssnano';
import g_zip        from 'gulp-zip';
import uglify       from 'gulp-uglify';
import rollup       from 'gulp-rollup';
import nodeResolve  from 'rollup-plugin-node-resolve';
import commonjs     from 'rollup-plugin-commonjs';
import babel        from 'rollup-plugin-babel';
import plumber      from 'gulp-plumber';
import aigis        from 'gulp-aigis';
import browserSync  from 'browser-sync';

const dir = {
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
export function css() {
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
    .pipe(postcss([
      cssnano({
        'zindex': false
      })
    ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dir.dist.css));
}

/**
 * Build javascript
 */
export function js() {
  gulp.src(dir.src.js + '/**/*.js')
    .pipe(plumber())
    .pipe(rollup({
      allowRealFiles: true,
      input: dir.src.js + '/basis.js',
      external: ['jquery'],
      output: {
        globals: {
          jquery: "jQuery"
        },
        format: 'iife'
      },
      plugins: [
        nodeResolve({ jsnext: true }),
        commonjs(),
        babel({
          presets: [
            [
              "env", {
                "modules": false,
                "targets": {
                  "browsers": ['last 2 versions']
                }
              }
            ]
          ],
          plugins: ['external-helpers'],
          babelrc: false
        })
      ]
    }))
    .pipe(gulp.dest(dir.dist.js))
    .on('end', () => {
      return gulp.src([dir.dist.js + '/basis.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dir.dist.js));
    });
}

/**
 * Build font
 */
export function font() {
  return gulp.src(dir.src.font + '/*')
    .pipe(gulp.dest(dir.dist.font));
}

/**
 * Build
 */
export const build = gulp.parallel(css, js, font);

/**
 * Styleguide
 */
gulp.task('aigis:update', gulp.series(() => {
  return gulp.src(dir.src.aigis + '/aigis_config.yml').pipe(aigis());
}, 'aigis:css', 'aigis:js'));

gulp.task('aigis:build', gulp.series('build', 'aigis:update'));

/**
 * Sass to CSS
 */
gulp.task('aigis:css', () => {
  return gulp.src(dir.src.aigis + '/assets/css/*.scss', {
      base: dir.src.aigis + '/assets/css'
    })
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
    .pipe(postcss([
      cssnano({
        'zindex': false
      })
    ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dir.dist.aigis + '/aigis_assets/css'));
});

/**
 * Build javascript
 */
gulp.task('aigis:js', () => {
  gulp.src(dir.src.aigis + '/assets/js/*.js')
    .pipe(plumber())
    .pipe(rollup({
      allowRealFiles: true,
      input: dir.src.aigis + '/assets/js/app.js',
      external: ['jquery'],
      output: {
        globals: {
          jquery: "jQuery"
        },
        format: 'iife'
      },
      plugins: [
        nodeResolve({ jsnext: true }),
        commonjs(),
        babel({
          presets: [
            [
              "env", {
                "modules": false,
                "targets": {
                  "browsers": ['last 2 versions']
                }
              }
            ]
          ],
          plugins: ['external-helpers'],
          babelrc: false
        })
      ]
    }))
    .pipe(gulp.dest(dir.dist.aigis + '/aigis_assets/js'))
    .on('end', () => {
      return gulp.src([dir.dist.aigis + '/aigis_assets/js/app.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dir.dist.aigis + '/aigis_assets/js'));
    });
});

/**
 * Auto Build
 */
export function watch() {
  gulp.watch([dir.src.css + '/**/*.scss'], gulp.series(css, 'aigis:update'));

  gulp.watch([dir.src.js + '/**/*.js'], gulp.series(js, 'aigis:update'));

  gulp.watch([dir.src.aigis + '/**/*.ejs'], gulp.task('aigis:update'));

  gulp.watch([dir.src.aigis + '/assets/css/**/*.scss'], gulp.task('aigis:css'));

  gulp.watch([dir.src.aigis + '/assets/js/**/*.js'], gulp.task('aigis:js'));
}

/**
 * Browsersync
 */
export const server = gulp.series('aigis:build', () => {
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
export function zip() {
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
    .pipe(g_zip('basis.zip'))
    .pipe(gulp.dest('./'));
}

/**
 * Sass tests
 */
export function test() {
  return gulp.src('./tests/tests.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./tests'));
}

export default gulp.parallel(watch, server);
