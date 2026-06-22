import type { Texture } from "pixi.js";
import { type JSX } from "react";
import { screenToIsometric } from "../../lib/isometric";
import { Block } from "../block/Block";
import { useWorldStore } from "../../store/worldStore";

interface WorldMapProps {
  textures: Texture[]
}

const WorldMap = ({textures}: WorldMapProps): JSX.Element => {

  const grid = useWorldStore(s => s.worldGrid);

  return (
    <pixiContainer>
      {textures.length ? grid.map(({x, y, type}) => {
        const [isometricX, isometricY] = screenToIsometric(x,y);

        const selectedTexture = type === 'grass' ? textures[0] : type === 'field' ? textures[1] : textures[2];

        return (
          <Block
            key={`${isometricX},${isometricY}`}
            texture={selectedTexture}
            x={isometricX}
            y={isometricY}
            gridX={x}
            gridY={y}
            type={type}
          />
        )
      }) : null}
    </pixiContainer>
  );
};

export {WorldMap, type WorldMapProps};
