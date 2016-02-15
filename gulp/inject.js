'use strict';

import Path from 'path';
import Gulp from 'gulp';
import BrowserSync from 'browser-sync';
import _ from 'lodash';
import Wiredep from 'wiredep';

import conf from './conf';

Gulp.task('inject-reload', ['inject'], () => {
  BrowserSync.reload();
});

Gulp.task('inject', ['scripts'], () => {
  return Gulp.src(Path.join(conf.paths.src, '/*.html'))
    .pipe(Wiredep.stream(_.extend({}, conf.wiredep)))
    .pipe(Gulp.dest(Path.join(conf.paths.tmp, '/serve')));
});
