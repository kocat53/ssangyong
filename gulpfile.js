var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browsersync = require('browser-sync').create(),
	fs = require('fs'),
	path = require('path'), 
	imagemin = require('gulp-imagemin'),
	spritesmith = require('gulp.spritesmith'),
	buffer = require('vinyl-buffer'),
	decomment = require('gulp-decomment'),
	del = require('del'), // 삭제 용도
	plumber = require('gulp-plumber'), // 오류나는 부분 알려줌
	prettier = require('gulp-prettier'),
	pug = require('gulp-pug'),
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
			baseDir: "./dist"
		},
	});
	done();
}

function browserSyncReload(done) {
	browsersync.reload();
	done();
}

// pug 를 html로 변환
function com_pug(done) {
	gulp.src('./src/**/*.pug')
		.pipe(plumber())
		.pipe(pug({
			filename: 'include',
		}))
		.pipe(prettier({
			tabWidth: 4,
			parser: "html",
			useTabs: true,
			htmlWhitespaceSensitivity: "ignore",
		}))
		.pipe(gulp.dest('./dist'))
	done();
}

// 폴더 지우기
function delFolder(done) {
	return del('dist/template')
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
		.pipe(gulp.dest('dist/css',{ sourcemaps: './' }));
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
			.pipe(gulp.dest('dist/img'));
		spriteData.css.pipe(gulp.dest(dir.source + dir.scss + dir.lib));
	});
	done();
}

function js(done) {
	gulp.src('./src/js/*.js')
		.pipe(gulp.dest('./dist/js'))
	done();
}

function image(done) {
	gulp.src(['src/img/*.png'])
		.pipe(imagemin({
			optimizationLevel: 1,
			quality: '75',
			speed: 1,
			floyd: 1
		}))
		.pipe(gulp.dest('dist/img'));
	done();
}

// Watch files
function watchFiles() {
	gulp.watch("src/scss/**/*", scss);
	gulp.watch('src/**/*.pug', com_pug);
	gulp.watch("src/js/*.js", js);
	gulp.watch("src/img/*", image);
	gulp.watch('dist/template', delFolder);
	gulp.watch(
		[
			"dist/img/*",
			"dist/css/*.css",
			"dist/js/*.js",
			"dist/*.html",
		],
		browserSyncReload,
	)
}

// task 변수 지정
const watch = gulp.parallel(watchFiles,broserLive);

// task 용어 지정
exports.html = com_pug;
exports.sprite = sprite;
exports.img = image;
exports.sass = scss;
exports.bs = watch;