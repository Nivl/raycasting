import WMap from './map/w-map.js';
import WMapTypes from './map/w-map-types';
import Camera from './camera.js';

export default class Raycasting {
  constructor() {
    const canvas = document.getElementById('glcanvas');
    this.ctx = null;
    this.map = null;
    this.camera = null;
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
      this.camera = new Camera(this.map.findFirst(WMapTypes.CAMERA), this.screen);
      this.draw();
    } else {
      throw new Error('map is missing');
    }
  }

  hasSupport() {
    return this.ctx !== null;
  }

  draw() {
    for (let i = 0; i < this.screen.w; i++) {
      const vector = this.camera.geViewVector(i);

      let k = -1;
      for (let x = 0; x < this.map.w; x++) {
        const newK = (x - this.camera.pos[0]) / vector.x;
        const y = this.camera.pos[1] + k * vector.y;

        if (newK > 0) {
          if (this.map.findAt(x, ~~y) === WMapTypes.WALL) {
            if (k < 0 || newK < k) {
              k = newK;
            }
          }
        }
      }

      for (let y = 0; y < this.map.h; y++) {
        const newK = (y - this.camera.pos[1]) / vector.y;
        const x = this.camera.pos[0] + k * vector.x;

        if (newK > 0) {
          if (this.map.findAt(~~x, y) === WMapTypes.WALL) {
            if (k < 0 || newK < k) {
              k = newK;
            }
          }
        }
      }

      if (k > -1) {
        const wallheight = this.screen.h / (2 * k);
        this.ctx.fillStyle = 'rgb(200,0,0)';
        this.ctx.fillRect(i, (this.screen.halfH - wallheight), 1, wallheight * 2);
      }
    }
  }
}
