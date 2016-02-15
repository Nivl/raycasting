'use strict';

import Path from 'path';
import Gulp from 'gulp';
import BrowserSync from 'browser-sync';
import Utils from 'gulp-util';

import webpack from 'webpack-stream';
import conf from './conf';


function webpackWrapper(watch, test, callback) {
  const webpackOptions = {
    watch,
    module: {
      loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] }],
    },
    output: { filename: 'main.js' },
  };

  if (watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  const webpackChangeHandler = (err, stats) => {
    if (err) {
      conf.errorHandler('Webpack')(err);
    }

    Utils.log(stats.toString({
      colors : Utils.colors.supportsColor,
      chunks : false,
      hash   : false,
      version: false,
    }));
    BrowserSync.reload();

    if (watch) {
      watch = false;
      callback();
    }
  };

  const sources = [Path.join(conf.paths.src, '/app/main.js')];

  return Gulp.src(sources)
    .pipe(webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(Gulp.dest(Path.join(conf.paths.tmp, '/serve/app')));
}

Gulp.task('scripts', () => {
  return webpackWrapper(false, false);
});

Gulp.task('scripts:watch', ['scripts'], (callback) => {
  return webpackWrapper(true, false, callback);
});

Gulp.task('scripts:test', () => {
  return webpackWrapper(false, true);
});

Gulp.task('scripts:test-watch', ['scripts'], (callback) => {
  return webpackWrapper(true, true, callback);
});
