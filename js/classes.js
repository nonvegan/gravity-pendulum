class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  distance(vector) {
    return Math.sqrt(Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2));
  }
}

class Pendulum {
  constructor(pos, ang, g, l, m) {
    this.pos = pos;
    this.ang = ang;
    this.angV = 0;
    this.angA = 0;
    this.g = g;
    this.l = l;
    this.m = m;
    this.isLocked = false;
  }

  draw(/** @type {CanvasRenderingContext2D} */ ctx) {
    ctx.beginPath();
    ctx.ellipse(
      this.pos.x + Math.sin(this.ang) * (this.l + this.m),
      this.pos.y + Math.cos(this.ang) * (this.l + this.m),
      this.m,
      this.m,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(
      this.pos.x + Math.sin(this.ang) * (this.l + this.m),
      this.pos.y + Math.cos(this.ang) * (this.l + this.m)
    );
    ctx.stroke();
  }

  update() {
    if (!this.isLocked) {
      this.angA = (Math.sin(this.ang) * -this.g) / this.l;
      this.angV += this.angA;
      //air resistance  this.angV *= 0.999;
      this.ang += this.angV;
    }
  }
  lock() {
    this.isLocked = true;
  }
  unlock() {
    this.isLocked = false;
  }
}

export { Vector, Pendulum };
