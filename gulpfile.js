/*
 * @Description: 
 * @Author: GaoHongwei
 * @Date: 2020-04-11 10:23:29
 * @LastEditTime: 2020-04-12 15:48:56
 * @LastEditors: GaoHongwei
 */
var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var cleanCss = require('gulp-clean-css')
var clean = require('gulp-clean')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var connect = require('gulp-connect')
var imageMin = require('gulp-imagemin');
var gutil = require('gulp-util');
var babel = require('gulp-babel');

gulp.task('copy-pages', function (done) {
  gulp.src('src/pages/**/*')
    .pipe(
      gulp.dest('dist/pages')
    )
    .pipe(connect.reload())
  done()
})

gulp.task('copy-index', function (done) {
  gulp.src('src/*')
    .pipe(
      gulp.dest('dist')
    )
    .pipe(connect.reload())
  done()
})

gulp.task('copy-assets', function (done) {
  gulp.src('src/assets/**/*')
    .pipe(
      gulp.dest('dist/assets')
    )
    .pipe(connect.reload())
  done()
})

gulp.task('scss', function (done) {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
      ],
      grid: true
    }))
    .pipe(rename((path) => {
      path.extname = '.css'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCss())
    .pipe(rename((path) => {
      path.extname = '.min.css'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
  done()
})

gulp.task('js', function (done) {
  gulp.src('src/js/**/*.js')
    .pipe(babel())
    .pipe(rename((path) => {
      path.extname = '.js'
    }))
    .pipe(
      gulp.dest('dist/js')
    )
    .pipe(uglify())
    .on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(rename((path) => {
      path.extname = '.min.js'
    }))
    .pipe(
      gulp.dest('dist/js')
    )
    .pipe(connect.reload())
  done()
})

gulp.task('image', function (done) {
  gulp.src('src/assets/images/**/*')
    .pipe(imageMin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dist/assets/images'))
  done()
})

gulp.task('watch', function (done) {
  gulp.watch('src/*', gulp.series('copy-index'))
  gulp.watch('src/pages/**/*', gulp.series('copy-pages'))
  gulp.watch('src/assets/**/*', gulp.series('copy-assets'))
  gulp.watch('src/scss/**/*.scss', gulp.series('scss'))
  gulp.watch('src/js/**/*.js', gulp.series('js'))
  gulp.watch('src/assets/images/**/*', gulp.series('image'))
  done()
})

gulp.task('server', function (done) {
  connect.server({
    root: 'dist',
    livereload: true
  })
  done()
})

// 清空dist
gulp.task('clean', function (done) {
  return gulp.src('dist/',{allowEmpty: true})
    .pipe(clean())
});

gulp.task('build', gulp.series('clean',gulp.parallel('copy-index', 'copy-pages', 'copy-assets', 'scss', 'js', 'image')), function (done) {
  console.log('ok')
  done()
})

gulp.task('default', gulp.series('build', 'watch', 'server'), function (done) {
  done()
});