import { type Texture } from "pixi.js";
import { useMemo, useState, type JSX } from "react";
import { getTintFilter, POLYGONAL_HIT_AREA, TEXTURE_SCALE, type TerrainType } from "../../configs/map-constants";
import { useGameObjectStore } from "../../store/gameObjectStore";
import { createGameObject } from "../../lib/gameObject";
import { logElementPosition } from "../../lib/logging";
import { gridToScreen } from "../../lib/isometric";

export type TerrainSpriteProps = {
  x: number,
  y: number,
  terrainType: TerrainType,
  textures: Record<TerrainType, Texture>,
}

export const TerrainSprite = ({x,y, textures, terrainType}: TerrainSpriteProps): JSX.Element => {
  /**
   * Tint filter.
   */
  const filter = useMemo(() => getTintFilter(), []);
  const [hover, setHover] = useState(false);
  const {addGameObject} = useGameObjectStore();
  const [isoX, isoY] = gridToScreen(x,y);


  return (
    <>
    <pixiSprite
      texture={textures[terrainType]}
      x={isoX}
      y={isoY}
      anchor={0}
      hitArea={POLYGONAL_HIT_AREA}
      scale={TEXTURE_SCALE}
      eventMode="static"
      onClick={() => {
        logElementPosition(x, y, 'terrain');
        addGameObject(createGameObject('flower', x, y))}
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      filters={hover ? [filter] : []}
    />
    </>);
}
