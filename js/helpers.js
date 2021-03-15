import { Vector } from "./classes.js";

function restrain(val, min, max) {
  if (val > max) return max;
  if (val < min) return min;
  return val;
}

function getMousePosElem(click, xOffset, yOffset) {

  return new Vector(
    click.clientX - click.target.getBoundingClientRect().x - 4 + ((typeof xOffset !== 'undefined') ?  xOffset : 0),
    click.clientY - click.target.getBoundingClientRect().y - 4 + ((typeof yOffset !== 'undefined') ?  yOffset : 0)
  );
}

export {restrain, getMousePosElem };
