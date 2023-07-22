import { Touche } from "./types";

export function copyTouch(touch: Touch): Touche {
  return {
    identifier: touch.identifier,
    pageX: touch.pageX,
    pageY: touch.pageY,
  };
}
