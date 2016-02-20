import WMapTypes from './map/w-map-types';

export default class Camera {
  constructor(pos, screen, map) {
    this.screen = screen;
    this.pos = pos;
    this.map = map;

    this.d = 0.5;
    this.p = 1;

    this.viewAngleX = 0;
  }

  /**
   * Return the point of view's position
   * @param  {[type]} pixelX Current pixel of the screen we are drawing (x)
   * @return {Array}         [description]
   */
  getPointOfView(pixelX) {
    let x = this.d;
    let y = (this.p * (this.screen.w / 2 - pixelX)) / this.screen.w;

    const sinAngle = Math.sin(this.viewAngleX);
    const cosAngle = Math.cos(this.viewAngleX);

    // We apply the angle and we translate from (0;0) to the actual user coordinates
    x = ((x * cosAngle) - (y * sinAngle)) + this.pos.x;
    y = ((x * sinAngle) + (y * cosAngle)) + this.pos.y;

    return { x, y };
  }

  /**
   * Return the vector of the view for a pixel
   * @param  {[type]} pixelX Current pixel of the screen we are drawing (x)
   * @return {Array}         [description]
   */
  geViewVector(pixelX) {
    const pov = this.getPointOfView(pixelX);

    return {
      x: pov.x - this.pos.x,
      y: pov.y - this.pos.y,
    };
  }

  turnRight() {
    this.viewAngleX -= 0.05;
    console.log(this.viewAngleX);
  }

  turnLeft() {
    this.viewAngleX += 0.05;
    console.log(this.viewAngleX);
  }

  moveForward() {
    const vector = this.geViewVector(this.screen.halfW);
    const newX = this.pos.x + (vector.x * 0.5);
    const newY = this.pos.y + (vector.y * 0.5);

    if (this.map.findAt(newX, newY) !== WMapTypes.WALL) {
      this.pos.x = newX;
      this.pos.y = newY;
    }

    console.log(this.pos.x, this.pos.y);
  }

  moveFBackward() {
    const vector = this.geViewVector(this.screen.halfW);
    const newX = this.pos.x - (vector.x * 0.5);
    const newY = this.pos.y - (vector.y * 0.5);

    if (this.map.findAt(newX, newY) !== WMapTypes.WALL) {
      this.pos.x = newX;
      this.pos.y = newY;
    }

    console.log(this.pos.x, this.pos.y);
  }
}
