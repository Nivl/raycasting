export default class Events {
  constructor(raytracer, camera) {
    this.camera = camera;
    this.raytracer = raytracer;

    document.body.onkeydown = (e) => {
      this.keyDown(e);
    };
  }

  keyDown(e) {
    if (e.keyCode === 38) {
      this.moveForward();
    } else if (e.keyCode === 40) {
      this.moveBackward();
    } else if (e.keyCode === 39) {
      this.turnRight();
    } else if (e.keyCode === 37) {
      this.turnLeft();
    } else if (e.keyCode === 32) {
      this.jump();
    }
  }

  moveForward() {
    console.info('moveForward not available');
  }

  moveBackward() {
    console.info('moveBackward not available');
  }

  turnRight() {
    if (this.raytracer.isDrawing === false) {
      this.camera.turnRight();
      this.raytracer.draw();
    }
  }

  turnLeft() {
    if (this.raytracer.isDrawing === false) {
      this.camera.turnLeft();
      this.raytracer.draw();
    }
  }

  jump() {
    console.info('jump not available');
  }
}
