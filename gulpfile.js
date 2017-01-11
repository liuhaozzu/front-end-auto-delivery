/**
 * @Author: liuhaozzu
 * @Date: 20170111
 */
'use strict';
/**
 * 1,less编译， 压缩 合并:一般通过预处理css导包实现
 * 2,js 合并，压缩，混淆
 * 3,image 复制
 * 4,html 压缩
 */
//先载入gulp包
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');

gulp.task('style',function () {
	//处理less
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

gulp.task('script',function () {
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

//图片复制
gulp.task('image',function () {
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream:true
        }));
});
//html处理
var htmlmin=require('gulp-htmlmin');
gulp.task('html',function () {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace:true,
			removeComments:true
		}))
		.pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

var browserSync=require('browser-sync');
gulp.task('serve',function () {
	browserSync({
        server:{
            baseDir:['dist']
        }
    }, function (err, bs) {
        console.log(bs.options.getIn(['urls','local']));
    });
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
})