'use strict';

import Path from 'path';
import Gulp from 'gulp';

import filter from 'gulp-filter';
import del from 'del';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import rev from 'gulp-rev';
import htmlmin from 'gulp-htmlmin';
import useref from 'gulp-useref';
import revReplace from 'gulp-rev-replace';
import conf from './conf';

Gulp.task('html', ['inject'], () => {
  const htmlFilter = filter('*.html', { restore: true });
  const jsFilter   = filter('**/*.js', { restore: true });
  let assets;

  return Gulp.src(Path.join(conf.paths.tmp, '/serve/*.html'))
             .pipe(assets = useref.assets())
             .pipe(rev())

             .pipe(jsFilter)
             .pipe(sourcemaps.init())
             .pipe(uglify()) .on('error', conf.errorHandler('Uglify'))
             .pipe(sourcemaps.write('maps'))
             .pipe(jsFilter.restore)

             .pipe(assets.restore())
             .pipe(useref())
             .pipe(revReplace())

             .pipe(htmlFilter)
             .pipe(htmlmin({
               removeEmptyAttributes    : true,
               removeAttributeQuotes    : true,
               collapseBooleanAttributes: true,
               collapseWhitespace       : true,
             }))
             .pipe(htmlFilter.restore)

             .pipe(Gulp.dest(Path.join(conf.paths.dist, '/')));
});

Gulp.task('other', () => {
  const fileFilter = filter((file) => {
    return file.stat.isFile();
  });

  return Gulp.src([
    Path.join(conf.paths.src, '/**/*'),
    Path.join(`!${conf.paths.src}`, '/**/*.{html,css,js,scss}'),
  ])
    .pipe(fileFilter)
    .pipe(Gulp.dest(Path.join(conf.paths.dist, '/')));
});

Gulp.task('clean', () => {
  return del([Path.join(conf.paths.dist, '/'), Path.join(conf.paths.tmp, '/')]);
});

Gulp.task('build', ['html', 'other']);
