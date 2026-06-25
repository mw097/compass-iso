import type { AnimatedSprite, Texture } from "pixi.js";
import { useEffect, useRef, type JSX } from "react";

interface PlantProps {
  x: number;
  y: number;
  texture: Texture
}

const Plant = ({x, y, texture}: PlantProps): JSX.Element => {
  const ref = useRef<AnimatedSprite>(null);

  useEffect(() => {
    if (ref.current) {
      // ref.current.play();
    }
  }, []);

  return (
    <pixiSprite
        texture={texture}
        anchor={{ x: 0.5, y: 1 }}
        scale={4}
        x={x}
        y={y - 36}
        eventMode="none"
    />
  );
}

export {Plant, type PlantProps};
