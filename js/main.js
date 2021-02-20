import { mapValue, restrain, getMs, getMousePosElem } from "./helpers.js";
import { Vector, Pendulum } from "./classes.js";

const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */ const ctx = canvas.getContext("2d");
const optionsDiv = document.getElementById("optionsDiv");
const gravityLabel = document.getElementById("gravityLabel");
const gravityRange = document.getElementById("gravityRange");
const resetButton = document.getElementById("resetButton");

const width = window.screen.height / 1.8;
const height = window.screen.height / 1.8;
const rodLength = 120;
const bobMass = 30;
let gravity = getGravitationalValue();
let pendulum = new Pendulum(new Vector(0, 0), 0, gravity, rodLength, bobMass);

function setup() {
  canvas.width = width;
  canvas.height = height;
  ctx.translate(width / 2, height / 2);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--fuchsia");
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--fuchsia");
  ctx.lineWidth = 5;
  gravityRange.addEventListener("input", () => {
    gravity = parseFloat(gravityRange.value) / 1000;
    pendulum.g = gravity;
  });
  resetButton.addEventListener("click", () => {
    gravityRange.value = 500;
    gravity = getGravitationalValue();
    resetPendulum();
  });
  canvas.addEventListener("mousemove", (e) => {
    if (
      getMousePosElem(e, -width / 2, -height / 2).distance(
        new Vector(
          pendulum.pos.x + Math.sin(pendulum.ang) * (pendulum.l + pendulum.m),
          pendulum.pos.y + Math.cos(pendulum.ang) * (pendulum.l + pendulum.m)
        )
      ) < pendulum.m
    ) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  });

  canvas.addEventListener("mousedown", (e) => {
    const mouseMoveHandler = (e) => {
      const mousePos = getMousePosElem(e, -width / 2, -height / 2);
      resetPendulum();
      pendulum.lock();
      pendulum.l = restrain(mousePos.distance(new Vector(0, 0)), 0, width / 2.5);
      pendulum.ang = Math.atan(-mousePos.y / mousePos.x);
      if (mousePos.x < 0) pendulum.ang -= Math.PI / 2;
      else pendulum.ang += Math.PI / 2;
    };
    const mouseUpHandler = (e) => {
      pendulum.unlock();
      canvas.removeEventListener("mousemove", mouseMoveHandler);
    };
    if (
      getMousePosElem(e, -width / 2, -height / 2).distance(
        new Vector(
          pendulum.pos.x + Math.sin(pendulum.ang) * (pendulum.l + pendulum.m),
          pendulum.pos.y + Math.cos(pendulum.ang) * (pendulum.l + pendulum.m)
        )
      ) < pendulum.m
    ) {
      canvas.addEventListener("mousemove", mouseMoveHandler);
      canvas.addEventListener("mouseup", mouseUpHandler);
    } else {
      canvas.removeEventListener("mousemove", mouseMoveHandler);
      canvas.removeEventListener("mouseup", mouseUpHandler);
    }
  });
}

function resetPendulum() {
  pendulum = new Pendulum(new Vector(0, 0), 0, gravity, rodLength, bobMass);
}

function getGravitationalValue() {
  return parseFloat(gravityRange.value) / 1000;
}
function clear() {
  ctx.clearRect(-width / 2, -height / 2, width, height);
}

function draw() {
  pendulum.draw(ctx);
}

function update() {
  pendulum.update();
}

setup();
setInterval(() => {
  clear();
  draw();
  update();
}, getMs(60));