import type { AnimatedSprite, Texture } from "pixi.js";
import { useEffect, useRef, type JSX } from "react";

export type PlantSpriteProps = {
  x: number;
  y: number;
  texture: Texture
}

export const PlantSprite = ({x, y, texture}: PlantSpriteProps): JSX.Element => {
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
