var gulp         = require( 'gulp' );
var watch        = require( 'gulp-watch' );
var sass         = require( 'gulp-sass' );
var cssmin       = require( 'gulp-minify-css' );
var rename       = require( 'gulp-rename' );
var browser_sync = require( 'browser-sync' );
var autoprefixer = require( 'gulp-autoprefixer' );

gulp.task( 'sass', function() {
	return gulp.src( './assets/src/scss/*.scss' )
		.pipe( sass() )
		.pipe( autoprefixer( {
			browsers: ['last 2 versions'],
			cascade: false
		} ) )
		.pipe( gulp.dest( './assets/dest/css/' ) )
		.on( 'end', function() {
			gulp.src( ['./assets/dest/css/*.css', '!./assets/dest/css/*.min.css'] )
				.pipe( cssmin( {
					keepSpecialComments: 0
				} ) )
				.pipe( rename( { suffix: '.min' } ) )
				.pipe( gulp.dest( './assets/dest/css/' ) );
		} );
} );

gulp.task( 'browsersync', function() {
	browser_sync.init( {
		server: {
			baseDir: "./"
		}
	} );
} );

gulp.task( 'watch', ['sass', 'browsersync'], function() {
	gulp.watch( ['assets/*.scss', 'assets/**/*.scss'], ['sass'] );
	gulp.watch( ['**/*.html', 'assets/dest/css/*.css'], function() {
		browser_sync.reload();
	} );
} );
