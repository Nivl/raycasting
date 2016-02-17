import WMap from './map/w-map.js';

export default class Raycasting {
  constructor() {
    const canvas = document.getElementById('glcanvas');
    this.ctx = null;
    this.map = null;
    this.screen = {
      w    : canvas.width,
      h    : canvas.height,
      halfW: canvas.width / 2,
      halfH: canvas.height / 2,
    };

    if (canvas.getContext) {
      this.ctx = canvas.getContext('2d');

      // Set default color
      this.ctx.fillStyle = '#87CEFA';
      this.ctx.fillRect(0, 0, this.screen.w, this.screen.h);
      this.ctx.fillStyle = '#C5E3BF';
      this.ctx.fillRect(0, this.screen.halfH, this.screen.w, this.screen.h);
    }
  }

  loadMap(map) {
    this.map = new WMap(map);
  }

  start() {
    if (this.map) {
      this.draw();
    } else {
      throw new Error('map is missing');
    }
  }

  hasSupport() {
    return this.ctx !== null;
  }

  draw() {

  }
}
