import { type JSX } from "react";
import { screenToIsometric } from "../../lib/isometric";
import { Block } from "../block/Block";
import { useWorldStore } from "../../store/worldStore";
import { useTextureStore } from "../../store/useTextureStore";


export const MapGrid = (): JSX.Element => {
  const grid = useWorldStore(s => s.worldGrid);
  const textures = useTextureStore((s) => s.textures)

  return (
    <pixiContainer>
      {Object.keys(textures).length ? grid.map(({x, y, type, plant}) => {
        const [isometricX, isometricY] = screenToIsometric(x,y);

        return (
          <Block
            key={`${isometricX},${isometricY}`}
            textures={textures}
            x={isometricX}
            y={isometricY}
            gridX={x}
            gridY={y}
            type={type}
            plant={plant}
          />
        )
      }) : null}
    </pixiContainer>
  );
};
