import { Rectangle } from "pixi.js";

export const MAP_WIDTH = 50;
export const MAP_HEIGHT = 50;
export const TILE_W = 36  // 72 * 0.5 (from ISOMETRIC_WEIGHTS)
export const TILE_H = 18  // 72 * 0.25 (from ISOMETRIC_WEIGHTS)
export const mapPixelWidth  = (MAP_WIDTH + MAP_HEIGHT) * TILE_W
export const mapPixelHeight = (MAP_WIDTH + MAP_HEIGHT) * TILE_H

export const HIT_AREA = new Rectangle(
  -window.innerWidth,
  -window.innerHeight,
  window.innerWidth * 3,
  window.innerHeight * 3
);
