

export default class Camera {
  constructor(pos, screen) {
    this.screen = screen;
    this.pos = pos;

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
    x = ((x * cosAngle) - (y * sinAngle)) + this.pos[0];
    y = ((x * sinAngle) + (y * cosAngle)) + this.pos[1];

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
      x: pov.x - this.pos[0],
      y: pov.y - this.pos[1],
    };
  }

  turnRight() {
    this.viewAngleX -= 0.05;
  }

  turnLeft() {
    this.viewAngleX += 0.05;
  }
}
