import { Vector } from "./classes.js";

function mapValue(n, start1, stop1, start2, stop2, withinBounds) {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
}

function restrain(val, min, max) {
  if (val > max) return max;
  if (val < min) return min;
  return val;
}

function getMs(fps) {
  return 1000 / fps;
}

function getMousePosElem(click, xOffset, yOffset) {

  return new Vector(
    click.clientX - click.target.getBoundingClientRect().x - 4 + ((typeof xOffset !== 'undefined') ?  xOffset : 0),
    click.clientY - click.target.getBoundingClientRect().y - 4 + ((typeof yOffset !== 'undefined') ?  yOffset : 0)
  );
}

export { mapValue, restrain, getMs, getMousePosElem };
