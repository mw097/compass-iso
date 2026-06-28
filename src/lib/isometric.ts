import alea from "alea";
import { createNoise2D, type NoiseFunction2D } from "simplex-noise";
import type { TerrainBlock } from "../types/types";
import {
  OBJECT_REGISTRY,
  type GameObjectDefinition,
  type GameObjectType,
  type TerrainType,
    TERRAIN_TEXTURE_W,
  TERRAIN_TEXTURE_H,
} from "../configs/map-constants";

export function gridToScreen(x: number, y: number): [number, number] {
  return [
    (x - y) * TERRAIN_TEXTURE_W,
    (x + y) * TERRAIN_TEXTURE_H,
  ];
}

export function generateGrid<T extends TerrainBlock = TerrainBlock>(
  rows: number,
  cols: number,
  blockProvider: ({
    x,
    y,
    terrainType,
    elevation,
    passable,
    buildable,
  }: T) => T
): T[] {
  const grid: T[] = [];
  const noiseFn = getGridNoise("seed");

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const terrainType = getTerrainType(noiseFn(i / 50, j / 50));

      grid.push(
        blockProvider({
          x: i,
          y: j,
          terrainType,
          elevation: 0,
          passable: true,
          buildable: true,
        } as T)
      );
    }
  }

  return grid;
}

export function getGridNoise(seed: string): NoiseFunction2D {
  return createNoise2D(alea(seed));
}

export function getTerrainType(noiseValue: number): TerrainType {
  if (noiseValue > 0.3) return "grass";
  if (noiseValue > -0.2) return "field";
  return "water";
}

export const getPositionalIdKey = (x: number, y: number): string =>
  `${x},${y}`;

export const getDefinition = (
  type: GameObjectType
): GameObjectDefinition => OBJECT_REGISTRY[type];