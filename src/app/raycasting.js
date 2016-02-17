export default class Raycasting {
  constructor() {
    const canvas = document.getElementById('glcanvas');
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = null;

    if (canvas.getContext) {
      this.ctx = canvas.getContext('2d');

      // Set default color
      this.ctx.fillStyle = '#87CEFA';
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  loadMap() {
    // todo
  }

  start() {

  }

  hasSupport() {
    return this.ctx !== null;
  }
}
