var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browsersync = require('browser-sync').create(),
	fs = require('fs'),
	path = require('path'), 
	imagemin = require('gulp-imagemin'),
	spritesmith = require('gulp.spritesmith'),
	buffer = require('vinyl-buffer'),
	php2html = require("gulp-php2html"),
	autoprefixer = require('gulp-autoprefixer');

//경로 설정 
var dir  = {
	png_template: 'sprite.support_1x.mustache',
	source: 'src/',
	scss: 'scss/',
	lib: 'lib/',
	img: 'img/',
	sprite: 'sprite/',
};

var getFolders = function(dir) {
	return fs.readdirSync(dir).filter(function(file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
};

function broserLive(done) {
	browsersync.init({
		server: {
			files: ['*.php , *.html'],
			baseDir: "./src"
		},
	});
	done();
}

function browserSyncReload(done) {
	browsersync.reload();
	done();
}

// sass - css 컴파일
function scss(done) {
	gulp.src('src/scss/**/*.scss' , {sourcemaps: true})
		.pipe(sass({
			outputStyle: 'expanded', // nested, expanded, compact, compressed
			indentType: 'tab',
			indentWidth : 1,
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(gulp.dest('src/css',{ sourcemaps: './' }));
	done();
}

function sprite(done) {
	var folders = getFolders(dir.source + dir.img + dir.sprite);
	folders.map(function(folder) {
		var spriteData = gulp.src(dir.sprite + folder + '/*.png', {cwd: dir.source + dir.img}).pipe(spritesmith({
			imgPath: '../' + dir.img + 'sp_' + folder + '.png',
			imgName: 'sp_' + folder + '.png',
			cssName: '_sp_' + folder + '.scss',
			padding: 10,
			algorithm: 'binary-tree', //top-down, left-right, diagonal, alt-diagonal, binary-tree
			cssTemplate: dir.source + dir.scss + dir.lib + dir.png_template,
			cssVarMap: function(sprite) {
				sprite.name = folder + '-' + sprite.name;
				sprite.origin = 'sp_' + folder;
			},
			cssSpritesheetName: 'sp_' + folder
		}));

		spriteData.img
			.pipe(buffer())
			// .pipe(tiny())
			.pipe(gulp.dest(dir.source + dir.img));
		spriteData.css.pipe(gulp.dest(dir.source + dir.scss + dir.lib));
	});
	done();
}

function image(done) {
	gulp.src(['src/img/*.png', '!src/img/sp_*.png'])
		.pipe(imagemin({
			optimizationLevel: 1,
			quality: '50', // When used more then 70 the image wasn't saved
			speed: 1, // The lowest speed of optimization with the highest quality
			floyd: 1 // Controls level of dithering (0 = none, 1 = full).
		}))
		.pipe(gulp.dest('src/img/dist'));
	done();
}

// Watch files
function watchFiles() {
	gulp.watch("src/scss/**/*", scss);
	gulp.watch(
		[
			"src/img/**/*.png",
			"src/css/*.css",
			"src/js/*.js",
			"src/**/*.php",
			"src/**/*.html",
		],
		browserSyncReload,
	)
}

function php(done){
	gulp.src("./src/*.php")
		.pipe(php2html())
		.pipe(gulp.dest("./dist"));
	done();
}
// task 변수 지정
const watch = gulp.parallel(watchFiles,broserLive);

// task 용어 지정
exports.php = php;
exports.sprite = sprite;
exports.img = image;
exports.sass = scss;
exports.bs = watch;