var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var minifyCSS   = require('gulp-minify-css');
var reload      = browserSync.reload;
var imagemin    = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var rename      = require('gulp-rename');
var responsive  = require('gulp-responsive-images');

gulp.task('minicss',function(){
  gulp.src('style/main.css')
  .pipe(minifyCSS())
  .pipe(rename(function(path){path.basename += "-min";}))
  .pipe(gulp.dest('style/'))
})

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./style/*.css").on('change',reload);
});

gulp.task('imagemin', function(){
 // find the image sources
  gulp.src('img/*.*')
 //minify image
  .pipe(imagemin({
    progressive:true
  }))
  //save image to different folder
  .pipe(gulp.dest('img/'))
});


//image resize, but not good at modify multiple with rename
gulp.task('imgresize', function(){
  gulp.src('imgsrc/*.*')
  //small+rename
    .pipe(imageResize({ width: 640}))
    .pipe(rename(function(path){path.basename += "-small";}))
    .pipe(gulp.dest('img/'))
});

gulp.task('responsive', function(){
  gulp.src('imgsrc/*.*')
    .pipe(responsive({
      'tree_icon.*':[
        {
          width:320,
          suffix: '-sm'
        }
        ,{
        width: 640,
        suffix: '-md'
      },{
        width: 1200,
        suffix: '-lg'
      }]
    }))
    .pipe(gulp.dest('img/'));
})
