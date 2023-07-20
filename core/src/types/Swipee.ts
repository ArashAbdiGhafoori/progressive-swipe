import type { Touche } from "./Touche";

export interface Swipee {
  x: number;
  y: number;
  direction: ("top" | "bottom" | "left" | "right")[];
  angle: number;
  start: Touche;
}
