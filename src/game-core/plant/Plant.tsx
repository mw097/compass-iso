import type { AnimatedSprite, AnimatedSpriteFrames, Texture, TextureSource } from "pixi.js";
import { useEffect, useRef, type JSX } from "react";

interface PlantProps {
  growthState: number;
  textures: AnimatedSpriteFrames
}

const Plant = ({growthState, textures}: PlantProps): JSX.Element => {
  const ref = useRef<AnimatedSprite>(null);
  const texture  = (growthState < textures.length ? textures[growthState] : textures[0]) as  Texture<TextureSource>;

  useEffect(() => {
    if (ref.current) {
      // ref.current.play();
    }
  }, []);

  return (
    <>
    <pixiSprite
        texture={texture}
        scale={2}
        x={100}
        y={100}
        anchor={1}/>
    </>
  );
}

export {Plant, type PlantProps};
