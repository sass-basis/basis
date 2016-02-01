const gulp         = require( 'gulp' );
const watch        = require( 'gulp-watch' );
const sass         = require( 'gulp-sass' );
const cssmin       = require( 'gulp-minify-css' );
const rename       = require( 'gulp-rename' );
const browser_sync = require( 'browser-sync' );
const autoprefixer = require( 'gulp-autoprefixer' );

gulp.task( 'sass', function() {
	return gulp.src( './assets/src/scss/*.scss' )
		.pipe( sass( {
			outputStyle: 'expanded'
		} ) )
		.pipe( autoprefixer( {
			browsers: ['last 2 versions'],
			cascade: false
		} ) )
		.pipe( gulp.dest( './assets/dist/css/' ) );
} );

gulp.task( 'sass:build', ['sass'], function() {
	return gulp.src( ['./assets/dist/css/*.css', '!./assets/dist/css/*.min.css'] )
		.pipe( cssmin() )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( gulp.dest( './assets/dist/css/' ) );
} );

gulp.task( 'browsersync', function() {
	browser_sync.init( {
		server: {
			baseDir: "./"
		}
	} );
} );

gulp.task( 'watch', function() {
	gulp.watch( ['assets/**/*.scss'], ['sass:build'] );
	gulp.watch( ['**/*.html', 'assets/dist/css/*.css'], function() {
		browser_sync.reload();
	} );
} );

gulp.task( 'build', ['sass:build'] );

gulp.task( 'release', ['build'], function() {
	return gulp.src(
			[
				'./**/*.html',
				'./assets/dist/**',
				"!./release/**",
				"!./node_modules/**/*.*"
			],
			{ base: './' }
		)
		.pipe( gulp.dest( 'release' ) );
} );

gulp.task( 'default', ['build', 'browsersync', 'watch'] );
