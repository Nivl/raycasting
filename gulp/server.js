'use strict';

import Path from 'path';
import Gulp from 'gulp';
import BrowserSync from 'browser-sync';
import Util from 'util';

import browserSyncSpa from 'browser-sync-spa';
import conf from './conf';

// import proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser = 'default') {
  let routes = null;
  const src = conf.paths.src;

  if (baseDir === src || (Util.isArray(baseDir) && baseDir.indexOf(src) > -1)) {
    routes = {
      '/bower_components': 'bower_components',
    };
  }

  const server = {
    baseDir,
    routes,
  };

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
   */
  // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', changeOrigin: true});

  BrowserSync.instance = BrowserSync.init({
    startPath: '/',
    server,
    browser,
  });
}

BrowserSync.use(browserSyncSpa({}));

Gulp.task('serve', ['watch'], () => {
  browserSyncInit([Path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

Gulp.task('serve:dist', ['build'], () => {
  browserSyncInit(conf.paths.dist);
});

Gulp.task('serve:e2e', ['inject'], () => {
  browserSyncInit([`${conf.paths.tmp}/serve`, conf.paths.src], []);
});

Gulp.task('serve:e2e-dist', ['build'], () => {
  browserSyncInit(conf.paths.dist, []);
});
