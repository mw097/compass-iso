import { type JSX } from "react";
import { getPositionalIdKey } from "../../lib/isometric";
import { useTerrainStore } from "../../store/terrainStore";
import { useTextureStore } from "../../store/useTextureStore";
import { TerrainSprite } from "../terrainSprite/TerrainSprite";


export const MapGrid = (): JSX.Element => {
  const grid = useTerrainStore(s => s.worldGrid);
  const textures = useTextureStore((s) => s.textures)

  return (
    <pixiContainer>
      {grid.map(({x, y, terrainType}) => {
        return (
          <TerrainSprite
            key={getPositionalIdKey(x,y)}
            textures={textures}
            x={x}
            y={y}
            terrainType={terrainType}
          />
        )
      })}
    </pixiContainer>
  );
};
