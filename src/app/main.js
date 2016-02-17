import Raycasting from './raycasting';

const raycasting = new Raycasting();

if (raycasting.hasSupport()) {
  raycasting.loadMap([
    [1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 1],
    [1, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ]);
  raycasting.start();
} else {
  console.log('not working');
}