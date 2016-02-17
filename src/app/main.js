import Raycasting from './raycasting';

const raycasting = new Raycasting();

if (raycasting.hasSupport()) {
  raycasting.start();
} else {
  console.log('not working');
}
