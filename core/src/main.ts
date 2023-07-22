import type { Swipee, Touche } from "./types";
import { copyTouch } from "./functions";

const touches = new Map<number, Touche>();

export function TouchStart(evt: TouchEvent) {
  for (let i = 0; i < evt.touches.length; i++) {
    const touch = evt.touches[i];
    touches.set(touch.identifier, copyTouch(touch));
  }
}

export function TouchMove(evt: TouchEvent): Swipee | undefined {
  for (let i = 0; i < evt.touches.length; i++) {
    const touch = evt.touches[i];
    const start = touches.get(touch.identifier);
    if (touch && start) {
      return calcTouchDiffrences(touch, start);
    }
  }
}

export function TouchEnd(evt: TouchEvent): Swipee | undefined {
  for (let i = 0; i < evt.touches.length; i++) {
    const touch = evt.touches[i];
    const start = touches.get(touch.identifier);
    if (touch && start) {
      const calced = calcTouchDiffrences(touch, start);
      touches.delete(touch.identifier);
      return calced;
    }
  }
}

export function TouchCancel(evt: TouchEvent) {
  for (let i = 0; i < evt.touches.length; i++) {
    const touch = evt.touches[i];
    if (touch) touches.delete(touch.identifier);
  }
}

export function calcTouchDiffrences(touch: Touch, start: Touche): Swipee {
  const x1 = touch.pageX;
  const y1 = touch.pageY;
  const x2 = start.pageX;
  const y2 = start.pageY;
  const x = x1 - x2;
  const y = y1 - y2;
  return {
    start: start,
    x,
    y,
    direction: [y < 0 ? "top" : "bottom", x < 0 ? "left" : "right"],
    angle: Math.atan2(y1 - y2, x1 - x2) * (-180 / Math.PI),
  };
}
