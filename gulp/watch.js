'use strict';

import Path from 'path';
import Gulp from 'gulp';
import BrowserSync from 'browser-sync';

import conf from './conf';

Gulp.task('watch', ['scripts:watch', 'inject'], () => {
  Gulp.watch([Path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject-reload']);

  Gulp.watch(Path.join(conf.paths.src, '/app/**/*.html'), (event) => {
    BrowserSync.reload(event.path);
  });
});
