'use strict';

/**
 *
 * Import node modules
 *
 */
var gulp         = require( 'gulp' );
var sass         = require( 'gulp-sass' );
var rename       = require( 'gulp-rename' );
var browser_sync = require( 'browser-sync' );
var postcss      = require( 'gulp-postcss' );
var autoprefixer = require( 'autoprefixer' );
var cssnano      = require( 'cssnano' );
var moduleImporter = require('sass-module-importer');


var processors = [
	autoprefixer( {
		browsers: ['last 2 versions'],
		cascade: false
	})
];

/**
 *
 * Copy the normalize.css
 *
 */
gulp.task( 'normalize', function() {
	return gulp.src( 'bin/normalize.scss' )
		.pipe( sass( {
			importer: moduleImporter(),
			outputStyle: 'expanded'
		} ) )
		.pipe( rename( '_normalize.scss' ) )
		.pipe( gulp.dest( 'src/scss/foundation/' ) )
} );

/**
 *
 * Sass to CSS
 *
 */
gulp.task( 'sass', ['normalize'], function() {
	return gulp.src( 'src/scss/**/*.scss' )
		.pipe( sass( {
			importer: moduleImporter(),
			outputStyle: 'expanded'
		} ) )
		.pipe( postcss( processors ) )
		.pipe( gulp.dest( 'dist/css/' ) )
		.pipe( postcss( [cssnano()] ) )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( gulp.dest( 'dist/css/' ) );
} );

/**
 *
 * Browsersync.
 *
 * Auto reload setting.
 *
 */
gulp.task( 'browsersync', function() {
	browser_sync.init( {
		server: {
			baseDir: "./doc"
		},
		files: [
			'doc/**'
		]
	} );
} );

/**
 *
 * Auto Compile Sass.
 *
 */
gulp.task( 'watch', function() {
	gulp.watch( ['src/**/*.scss'], ['build'] );
} );

gulp.task( 'build', ['sass'], function() {
	return gulp.src(
			[
				'dist/**'
			],
			{ base: 'dist' }
		)
		.pipe( gulp.dest( 'doc/dist' ) );
} );

/**
 *
 * Deploy GitHub Pages
 *
 */
gulp.task( 'release', ['build'], function() {
	return gulp.src( 'doc/**' )
			.pipe( gulp.dest( 'release' ) );
} );

gulp.task( 'default', ['build', 'browsersync', 'watch'] );
