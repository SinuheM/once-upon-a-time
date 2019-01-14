const { src, dest, watch, series, parallel } = require('gulp');
const gulp_sass = require('gulp-sass'),
	  gulp_pug  = require('gulp-pug'),
	  useref = require('gulp-useref'),
	  terser = require('gulp-terser'),
	  gulpif = require('gulp-if'),
	  browserSync = require('browser-sync').create();

var handleError = function (e) {
	console.error(e.stack)
	this.emit('end')
}

function browserSyncInit(done){
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
	})	
};

function reload(done) {
	browserSync.reload();
	done();
}

function sass(){
	return src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
	//.pipe(sass())
	.pipe(gulp_sass({outputStyle: 'compressed'}).on('error', gulp_sass.logError))
	.pipe(dest('dist/css'))
	.pipe(browserSync.reload({
		stream: true
	}))	
}

function fonts(){
  return src('app/fonts/**/*')
  .pipe(dest('dist/fonts'))
};

function assets(){
	return src('app/assets/**/*')
	.pipe(dest('dist/assets'))
};

function js(){
	return src('app/js/**/*')
	.pipe(dest('dist/js'));
};

function jsDeploy(){
	return src('dist/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', terser({
			compress: {drop_console: true}}
		)))
		.pipe(dest('dist'));
}

function pug(){
  return src('app/*.pug')
	  .pipe(gulp_pug({pretty: true})) // pipe to pug plugin
	  .on('error', handleError)
	  .pipe(dest('dist')) // tell gulp our output folder
};

async function watching(){
	browserSyncInit();
	await watch('app/**/*.pug', series(pug, reload));
	await watch('app/scss/**/*.scss', series(sass));
	await watch('app/**/*.js', series(js, reload));	
	await watch('app/assets/**/*', series(assets));
	await watch('app/fonts/**/*', series(fonts));
};

function build(done){
	console.log("Hello gulp");
	series(pug, sass, js, jsDeploy, assets, fonts)(done);
	console.log("Bye gulp");
};


exports.watch = watching;
exports.build = build;
exports.brow = browserSyncInit;
exports.jsDeploy = jsDeploy;
// gulp.task('watch', ['pug', 'sass', 'js', 'assets'], function (){
// 	browserSync.init({
// 		server: {
// 			baseDir: 'dist'
// 		},
// 	})
// 	gulp.watch('app/scss/**/*.scss', ['sass']);
// 	gulp.watch('app/**/*.pug', ['pug']);
// 	gulp.watch('app/**/*.js', ['js']);
// 	//gulp.watch('dist/*.html', browserSync.reload);  
//   	gulp.watch('dist/**/*.js', browserSync.reload); 
// 	gulp.watch('dist/**/*.css', browserSync.stream());
// 	gulp.watch('dist/**/*.html').on('change', browserSync.reload);
//   //gulp.watch('app/css/*.css', browserSync.stream());
//   // Other watchers
// });