import { create } from "zustand";
import { mapPixelHeight } from "../configs/map-constants";

type CameraState = {
  x: number;
  y: number;
  zoom: number;
  pan: (dx: number, dy: number) => void,
  setZoom: (zoom: number) => void,
}

const TILE_SCALED_H = 18 * 4  // 72px — wysokość sprita po scale=4


export const useCameraStore = create<CameraState>()((set) => ({
  x: window.innerWidth / 2,
  y: window.innerHeight / 2 - mapPixelHeight / 2 + TILE_SCALED_H,
  zoom: 1,
  pan: (dx, dy) => set((s) => ({
    x: s.x + dx / s.zoom,
    y: s.y + dy / s.zoom,
  })),
  setZoom: (zoom) => set({zoom: Math.min(3, Math.max(0.5, zoom))}),
}));
