var gulp       = require('gulp');

// 文件清理
var clean = require('gulp-clean');
var del = require('del');

// 将svg文件转换成一个symbols的svg文件
var svgSymbols = require('gulp-svg-symbols');

/**
 * 删除文件
 */
gulp.task('clean:mobile', function (cb) {
    del([
        // 这里我们使用一个通配模式来匹配 `svg-symbols` 文件夹中的所有东西
        './src/assets/svg-symbols/*',
    ], cb);
});

/**
 * 将多个svg文件转换成一个symbols的svg文件
 */
gulp.task('svgSymbols', function () {
    return gulp.src('./src/assets/svg/*.svg')
        .pipe(svgSymbols({
              svgAttrs:{
                  style: 'display:none;',
              }
        }))
        .pipe(gulp.dest('./src/assets/svg-symbols'));
});

gulp.task('default',['clean:mobile','svgSymbols']);