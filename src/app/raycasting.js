export default class Raycasting {
  constructor() {
    const canvas = document.getElementById('glcanvas');
    this.gl = this.initWebGL(canvas);

    if (this.gl) {
      // Set clear color to black, fully opaque
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // Enable depth testing
      this.gl.enable(this.gl.DEPTH_TEST);
      // Near things obscure far things
      this.gl.depthFunc(this.gl.LEQUAL);
      // Clear the color as well as the depth buffer.
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
  }

  initWebGL(canvas) {
    let gl = null;

    try {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    } catch (e) {}

    return gl;
  }

  hasWebGL() {
    return !!this.gl;
  }
}
