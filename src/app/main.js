import Raycasting from './raycasting';
import '../index.scss';

const raycasting = new Raycasting();

if (raycasting.hasSupport()) {
  raycasting.loadMap([
    [1, 1, 1, 1, 1, 1],
    [1, 0, 1, 2, 0, 1],
    [1, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ]);
  raycasting.start();
} else {
  console.log('not working');
}
