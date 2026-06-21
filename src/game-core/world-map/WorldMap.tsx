import type { Texture } from "pixi.js";
import { useMemo, type JSX } from "react";
import { generateGrid, screenToIsometric } from "../../lib/isometric";
import { Block } from "../block/Block";

interface WorldMapProps {
  textures: Texture[]
}

const WorldMap = ({textures}: WorldMapProps): JSX.Element => {

  const grid = useMemo(() => generateGrid(16,16, (x,y) => ({x, y})), []);

  return (
    <pixiContainer>
      {textures.length ? grid.map(({x, y}) => {
        const [isometricX, isometricY] = screenToIsometric({x,y});

        return (
          <Block
            key={`${isometricX},${isometricY}`}
            texture={textures[0]}
            x={isometricX}
            y={isometricY}
          />
        )
      }) : null}
    </pixiContainer>
  );
};

export {WorldMap, type WorldMapProps};
