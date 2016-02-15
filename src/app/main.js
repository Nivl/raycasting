import Raycasting from './raycasting';

const raycasting = new Raycasting();

if (raycasting.hasWebGL()) {
  console.log('working');
} else {
  console.log('not working');
}
