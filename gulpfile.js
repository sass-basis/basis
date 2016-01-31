'use strict';

/**
 *
 * Import node modules
 *
 */
var gulp         = require( 'gulp' );
var sass         = require( 'gulp-sass' );
var cssmin       = require( 'gulp-cssnano' );
var rename       = require( 'gulp-rename' );
var browser_sync = require( 'browser-sync' );
var postcss      = require( 'gulp-postcss' );
var autoprefixer = require( 'autoprefixer' );
var atImport     = require( 'postcss-import' );

var processors = [
	autoprefixer( {
		browsers: ['last 2 versions'],
		cascade: false
	}),
	atImport()
];

/**
 *
 * Sass to CSS
 *
 */
gulp.task( 'sass', function() {
	return gulp.src( 'src/scss/**/*.scss' )
		.pipe( sass( {
			outputStyle: 'expanded'
		} ) )
		.pipe( postcss( processors ) )
		.pipe( gulp.dest( 'dist/css/' ) )
		.pipe( cssmin() )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( gulp.dest( 'dist/css/' ) );
} );

gulp.task( 'sass:build', ['sass'] );

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
			baseDir: "./"
		},
		files: [
			'**/*.html',
			'dist/css/**/*.css'
		]
	} );
} );

/**
 *
 * Auto Compile Sass.
 *
 */
gulp.task( 'watch', function() {
	gulp.watch( ['src/**/*.scss'], ['sass:build'] );
} );

gulp.task( 'build', ['sass:build'], function() {
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
