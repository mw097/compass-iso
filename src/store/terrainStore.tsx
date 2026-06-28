/**
 * @description WorldStorage contains logic for terrain only.
 */

import { create } from "zustand";
import { generateGrid} from "../lib/isometric";
import { MAP_HEIGHT, MAP_WIDTH, type TerrainType } from "../configs/map-constants";
import type { TerrainBlock } from "../types/types";

const initialState = {
  worldGrid: generateGrid<TerrainBlock>(MAP_HEIGHT, MAP_WIDTH, ({x, y, terrainType, elevation, passable, buildable}) => ({x, y, terrainType, elevation, passable, buildable})),
}

export type TerrainState = typeof initialState & {
  setBlock: (x: number, y: number, type: TerrainType) => void,
  reset: () => void
}

export const useTerrainStore = create<TerrainState>()((set) => ({
  ...initialState,
  setBlock: (x, y, terrainType) => set((state) => {
    const idx = x * MAP_WIDTH + y;
    const next = [...state.worldGrid];
    next[idx] = {...next[idx], terrainType};

    return {worldGrid: next};
  }),
  reset: () => set(initialState)
}));
