
let gulp = require('gulp'),
  // 文件修改浏览器同步
  browserSync = require('browser-sync'),
  // 让 browserSync 支持 include
  reload = browserSync.reload,


  app = './',

  appCss = app + 'css/**/*.css',
  appJs = app + 'js/**/*.js',
  appHtml = app + '*.html';

// 文件实时监控浏，览器自动刷新
gulp.task('serve', function () {
  browserSync({
    server: {
      proxy: '192.168.1.91',
      baseDir: app,
      // 将bower的路径改为相对于项目的路径
      routes: {
        "/bower_components": "bower_components"
      }
    }
  });

  gulp.watch(appCss).on('change', changes);
  gulp.watch(appJs).on('change', changes);
  gulp.watch(appHtml).on('change', changes);
});

function changes(event) {
  reload();
  console.log('file ' + event.path + ' was ' + event.type + ', running tasks...');
}
