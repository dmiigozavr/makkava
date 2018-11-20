var gulp         = require('gulp'),
	 del          = require('del'),
	 sass         = require('gulp-sass'),
	 browserSync  = require('browser-sync'),
	 cssnano      = require('gulp-cssnano'),
	 imagemin     = require('gulp-imagemin'),
	 pngquant     = require('imagemin-pngquant'),
	 cache        = require('gulp-cache'),
	 prefixer     = require('gulp-autoprefixer'),
	 rigger       = require('gulp-rigger'),
	 sourcemaps   = require('gulp-sourcemaps'),
	 plumber      = require('gulp-plumber'),
	 reload       = browserSync.reload;



gulp.task('getLibs', function() {
	
	var jsLibs = gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/slick-carousel/slick/slick.min.js',
		//'node_modules/nouislider/distribute/nouislider.min.js',
		//'node_modules/wnumb/wNumb.js',
		'node_modules/jquery-form-styler/dist/jquery.formstyler.min.js',
		//'node_modules/jquery.nicescroll/dist/jquery.nicescroll.min.js',
		//'node_modules/lightbox2/dist/js/lightbox.min.js',
		//'node_modules/lightcase/src/js/lightcase.js',
		'node_modules/jquery-validation/dist/jquery.validate.min.js',
		'node_modules/raty-js/lib/jquery.raty.js'
	])
	.pipe(gulp.dest('dist/js'));
	
	var cssLibs = gulp.src([
		'node_modules/bootstrap/dist/css/bootstrap.min.css',
		'node_modules/slick-carousel/slick/slick.css',
		//'node_modules/nouislider/distribute/nouislider.min.css',
		'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
		'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',
		//'node_modules/lightbox2/dist/css/lightbox.min.css',
		//'node_modules/lightcase/src/css/lightcase.css'
	])
	.pipe(gulp.dest('dist/css'));
	
	var imgS = gulp.src([
		//'node_modules/lightbox2/dist/images/*.*'
	])
	.pipe(gulp.dest('dist/img/images'));
	
	var fontS = gulp.src([
		//'node_modules/lightcase/src/fonts/*.*'
	])
	.pipe(gulp.dest('dist/fonts'));
	
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		port: 3300,
		ui: {
			port: 4400
		},
		notify: false
	});
});


gulp.task('html:build', function () {
	gulp.src('src/*.html')
	.pipe(rigger())
	.pipe(gulp.dest('dist'))
	.pipe(reload({stream: true}));
});


gulp.task('css:build', function () {
	gulp.src('src/css/main.scss')
	.pipe(sourcemaps.init())
	.pipe(plumber())
	.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
	.pipe(prefixer(['last 10 versions', '> 2%', 'ie 11']))
	.pipe(cssnano())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/css'))
	.pipe(reload({stream: true}));
});


gulp.task('js:build', function () {
	gulp.src('src/js/*.js')
	.pipe(gulp.dest('dist/js'))
	.pipe(reload({stream: true}));
});


gulp.task('image:build', function () {
	gulp.src('src/img/**/*.*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'))
	.pipe(reload({stream: true}));
});


gulp.task('fonts:build', function () {
	gulp.src('src/fonts/*.*')
	.pipe(gulp.dest('dist/fonts'))
});


gulp.task('build', [
	'html:build',
	'css:build',
	'js:build',
	'fonts:build',
	'image:build'
]);


gulp.task('clean', function() {
	return del.sync('dist');
});


gulp.task('clear', function () {
	return cache.clearAll();
});


gulp.task('watch', function () {
	gulp.watch('src/**/*.html', ['html:build']);
	gulp.watch('src/css/**/*.scss', ['css:build']);
	gulp.watch('src/js/**/*.js', ['js:build']);
	gulp.watch('src/img/**/*.*', ['image:build']);
	gulp.watch('src/fonts/**/*.*', ['fonts:build']);
});


gulp.task('default', [
	'clean',
	'getLibs',
	'build',
	'browser-sync',
	'watch'
]);





