import { create } from "zustand";
import { generateGrid, type Block} from "../lib/isometric";
import { MAP_HEIGHT, MAP_WIDTH } from "../configs/map-constants";

const initialState = {
  worldGrid: generateGrid<Block>(MAP_HEIGHT, MAP_WIDTH, (x, y, type) => ({x, y, type})),
}

export type WorldState = typeof initialState & {
  setBlock: (x: number, y: number, type: string) => void,
  setPlant: (x: number, y:number, plant: 'flower' | null) => void,
  reset: () => void
}

export const useWorldStore = create<WorldState>()((set) => ({
  ...initialState,
  setBlock: (x, y,type) => set((state) => {
    const idx = x * MAP_WIDTH + y;
    const next = [...state.worldGrid];
    next[idx] = {...next[idx], type};

    return {worldGrid: next};
  }),
  setPlant: (x, y, plant) => set((state) => {
    const idx = x * MAP_WIDTH + y;
    const next = [...state.worldGrid]
    next[idx] = { ...next[idx], plant: plant }
    return { worldGrid: next }
  }),
  reset: () => set(initialState)
}));