import type { Texture } from "pixi.js";
import { useState, type JSX } from "react";
import { useWorldStore } from "../../store/worldStore";

interface BlockProps {
  x: number,
  y: number,
  gridX: number,
  gridY: number,
  type: string,
  texture: Texture
}

const Block = ({x,y,gridX, gridY, texture}: BlockProps): JSX.Element => {
  const [elevation, setElevation] = useState(0);
  const {setBlock} = useWorldStore();

  return (
    <pixiSprite
      texture={texture}
      x={x + window.innerWidth / 2} // center horizontally
      y={y + window.innerHeight / 4 + elevation} // align the y axis to one fourth of the screen
      anchor={{ x: 0, y: 0 }}
      scale={4}
      eventMode="static"
      onClick={() => setBlock(gridX, gridY, 'field')}
      onMouseEnter={() => setElevation(-15)}
      onMouseLeave={() => setElevation(0)}
    />);
}

export {Block, type BlockProps};
