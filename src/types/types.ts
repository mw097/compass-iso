import type { GameObjectType, TerrainType } from "../configs/map-constants";

export type TerrainBlock = {
  x: number;
  y: number;
  terrainType: TerrainType;
  elevation: number;
  passable: boolean;
  buildable: boolean;
};

export type GameObject = {
  id: string;
  x: number;
  y: number;
  type: GameObjectType;
  width: number;
  height: number;
}

export type SpatialIndex = Map<string, string[]>;
