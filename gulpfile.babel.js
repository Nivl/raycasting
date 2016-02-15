import Gulp from 'gulp';
import Wrench from 'wrench';

Wrench.readdirSyncRecursive('./gulp').filter((file) => {
  return (/\.(js|coffee)$/i).test(file);
}).map((file) => {
  require(`./gulp/${file}`);
});

Gulp.task('default', ['clean'], () => {
  Gulp.start('build');
});
