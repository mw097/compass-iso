import { ColorMatrixFilter, Polygon, Rectangle } from "pixi.js";


export const MAP_WIDTH = 50;
export const MAP_HEIGHT = 50;

export const TEXTURE_SCALE = 4;

// Sprite: 16x18 px
// Scale: 64x72 px
// Iso: 64/2 = 32, 72/4 = 18
export const TERRAIN_TEXTURE_W = 32;
export const TERRAIN_TEXTURE_H = 18;

export const mapPixelWidth =
  (MAP_WIDTH + MAP_HEIGHT) * TERRAIN_TEXTURE_W;

export const mapPixelHeight =
  (MAP_WIDTH + MAP_HEIGHT) * TERRAIN_TEXTURE_H;

export const HIT_AREA = new Rectangle(
  -window.innerWidth,
  -window.innerHeight,
  window.innerWidth * 3,
  window.innerHeight * 3
);

export const POLYGONAL_HIT_AREA =
  new Polygon([
    8, 0,
    16, 4.5,
    8, 9,
    0, 4.5,
  ]);

export const getTintFilter = () => {
  const filter = new ColorMatrixFilter();
  filter.brightness(1.3, false);
  return filter;
}

export const TERRAIN_REGISTRY = {
  field: {
    label: "Field",
    textureKey: "field",
  },
  grass: {
    label: "Grass",
    textureKey: "grass",
  },
  water: {
    label: "Water",
    textureKey: "water",
  },
} as const;

export type TerrainType = keyof typeof TERRAIN_REGISTRY;
export type TerrainTypeDefinition =
  (typeof TERRAIN_REGISTRY)[TerrainType];

export const OBJECT_REGISTRY = {
  flower: {
    label: "Flower",
    textureKey: "flower",
    width: 1,
    height: 1,
    buildableOn: ["grass", "field"],
    stackable: false,
  },
  tree: {
    label: "Tree",
    textureKey: "tree",
    width: 1,
    height: 2,
    buildableOn: ["grass"],
    stackable: false,
  },
  house: {
    label: "House",
    textureKey: "house",
    width: 3,
    height: 3,
    buildableOn: ["grass", "field"],
    stackable: false,
  },
} as const;

export type GameObjectType = keyof typeof OBJECT_REGISTRY;
export type GameObjectDefinition =
  (typeof OBJECT_REGISTRY)[GameObjectType];