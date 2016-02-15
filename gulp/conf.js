import Gutil from 'gulp-util';

exports.paths = {
  src : 'src',
  dist: 'dist',
  tmp : '.tmp',
};

exports.wiredep = {
  directory: 'bower_components',
};

exports.errorHandler = (title) => {
  'use strict';

  return (err) => {
    Gutil.log(Gutil.colors.red(`[${title}]`), err.toString());
    this.emit('end');
  };
};
