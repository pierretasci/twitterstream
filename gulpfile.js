// GULP
var gulp 					= require('gulp');
var gutil 				= require('gulp-util');

// UTIL
var source 				= require('vinyl-source-stream');
var buffer 				= require('vinyl-buffer');
var del 					= require('del');
var browserSync 	= require('browser-sync');
var plumber				= require('gulp-plumber');

// JS
var browserify 		= require('browserify');
var uglify 				= require('gulp-uglify');
var eslint 				= require('gulp-eslint');
var babelify			= require('babelify');

// CSS
var sass 					= require('gulp-sass');
var concat 				= require('gulp-concat');
var autoprefixer 	= require('gulp-autoprefixer');
var sourcemaps 		= require('gulp-sourcemaps');
var csslint 			= require('gulp-csslint');
var postcss      	= require('gulp-postcss');
var autoprefixer 	= require('autoprefixer-core');

var PATHS = {
	JS: "app/**/*.js",
	CSS: "app/**/*.css",
	SASS: "app/**/*.scss",
	HTML: "app/**/*.html",
	BUILD: "build",
	BUILD_CSS: "build/**/*.css",
	APP: "app/app.js",
	DEST_APP: "app.js",
	DEST: "dist/"
};

gulp.task('sass-compile', function() {
	return gulp.src(PATHS.SASS)
		.pipe(plumber())
		.pipe(sass({errLogToConsole: true}))
		.on('error', gutil.log)
		.pipe(gulp.dest(PATHS.BUILD));
});

gulp.task('css-compile', function() {
	return gulp.src(PATHS.CSS)
		.pipe(gulp.dest(PATHS.BUILD))
});

gulp.task('css-build', ['sass-compile', 'css-compile'], function() {
	return gulp.src(PATHS.BUILD_CSS)
		.pipe(sourcemaps.init())
		.pipe(postcss([autoprefixer({
			browser: ['last 2 versions']
		})]))
		.pipe(concat('all.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(PATHS.DEST));
});

gulp.task('clean', function() {
	del([PATHS.BUILD_CSS]);
	del(["dist/**.*.css"]);
	return del(["dist/**.*.js"]);
});

gulp.task('html', function() {
	return gulp.src(PATHS.HTML)
		.pipe(gulp.dest(PATHS.DEST));
})

gulp.task('server', function() {
  return browserSync({
    server: {
     baseDir: './dist/' 
    }
  });
})

gulp.task('lint', function() {
	return gulp.src(PATHS.JS)
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('js-compile', function() {
	return browserify({
			entries: [PATHS.APP],
			paths: ['./node_modules', './app'],
			debug: true
		})
		.transform(babelify)
		.bundle()
		.on('transform', function(tr, file) {
			tr.on('error', browserifyError);
		})
		.on('error', browserifyError)
		.pipe(source(PATHS.DEST_APP))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
    .on('error', gutil.log)
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(PATHS.DEST));
});

gulp.task('js-min', function() {
	return browserify(PATHS.APP)
  .transform(reactify)
  .bundle()
  .pipe(source(PATHS.DEST_APP))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest(PATHS.DEST));
});

gulp.task('serve', ['clean', 'html', 'lint', 'js-compile', 'css-build', 'server'], function() {
  return gulp.watch([
    PATHS.JS, PATHS.SASS, PATHS.CSS, PATHS.HTML
  ], [
   'lint', 'js-compile', 'css-build', 'html', browserSync.reload
  ]);
})

gulp.task('default', ['serve']);

// === HELPERS ===

function browserifyError(err) {
	gutil.log(gutil.colors.red('Error'), err.message);
	this.emit('end');
}