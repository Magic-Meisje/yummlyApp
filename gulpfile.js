var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var browsersync = require('browser-sync');
var reload = browsersync.reload;


//everything in gulp is a task!

//styles task!
gulp.task('styles', function() { //styles is the name WE give it
	return gulp.src('styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(autoprefixer('last 2 versions', 'ie8'))
		.pipe(gulp.dest('styles/'))
		.pipe(reload({stream:true}));
});

//jshint task!!!! YAY!
gulp.task('jshint', function() {
	return gulp.src('scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('bs', function() {
	browsersync.init({
		server: {
			baseDir: './'
		}
	});
});

//watch task!!
gulp.task('watch', function() {
	gulp.watch('styles/*.scss', ['styles']);
	gulp.watch('scripts/*.js', ['jshint']);
	gulp.watch('*.html', reload);
});

gulp.task('default', ['bs', 'styles', 'jshint', 'watch']);