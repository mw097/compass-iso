import type { Texture } from "pixi.js";
import { useState, type JSX } from "react";
import { useWorldStore } from "../../store/worldStore";
import { Plant } from "../plant/Plant";

interface BlockProps {
  x: number,
  y: number,
  gridX: number,
  gridY: number,
  type: string,
  textures: Record<string, Texture>,
  plant?: 'flower' | null,
}

const Block = ({x,y,gridX, gridY, textures, type, plant}: BlockProps): JSX.Element => {
  const [elevation, setElevation] = useState(0);
  const {setPlant} = useWorldStore();

  return (
    <>
    <pixiSprite
      texture={textures[type]}
      x={x}
      y={y + elevation}
      anchor={{ x: 0.5, y: 1 }}  // ← środek dolnej krawędzi
      scale={4}
      eventMode="static"
      // onClick={() => setBlock(gridX, gridY, 'field')}
      onClick={() => setPlant(gridX, gridY, 'flower')}
      onMouseEnter={() => setElevation(-15)}
      onMouseLeave={() => setElevation(0)}
    />
    {plant ?
      <Plant
        texture={textures['grass']}
        x={x}
        y={y + elevation}
      />
      : null }
    </>);
}

export {Block, type BlockProps};
