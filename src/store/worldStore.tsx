import { create } from "zustand";
import { generateGrid } from "../lib/isometric";
import { MAP_HEIGHT, MAP_WIDTH } from "../configs/map-config";

const initialState = {
  worldGrid: generateGrid(MAP_HEIGHT, MAP_WIDTH, (x, y, type) => ({x, y,type})),
}

export type BearState = typeof initialState & {
  setBlock: (x: number, y: number, type: string) => void
  reset: () => void
}

export const useWorldStore = create<BearState>()((set) => ({
  ...initialState,
  setBlock: (x,y,type) => set((state) => {
    const idx = x * MAP_WIDTH + y;
    const next = [...state.worldGrid];
    next[idx] = {...next[idx], type};

    return {worldGrid: next};
  }),
  reset: () => set(initialState)
}));