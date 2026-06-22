import { Assets, Container, Graphics, Sprite, Texture, AnimatedSprite, Text, Spritesheet } from 'pixi.js';
import './App.module.scss';
import {Application, extend} from '@pixi/react';
import { useEffect, useState } from 'react';
// import { Plant } from './shared/plant/Plant';
import {WorldMap} from './game-core/world-map/WorldMap';
import { ToolBar } from './ui/tool-bar/ToolBar';


extend({
  Container,
  Graphics,
  Sprite,
  AnimatedSprite,
  Text,
});

export default function App() {
  const [textures, setTextures] = useState<Texture[]>([]);

  useEffect(() => {
    Assets.load<Spritesheet>('/test_sprites/Spritesheets/tinyBlocks.json')
      .then((spritesheet) => {
        const frames = Object.values(spritesheet.textures) as Texture[];
        setTextures(frames);
      });
  }, []);

  return (
    <Application resizeTo={window}>
      {/* {textures?.length ? <Plant textures={textures} growthState={2}/> : null} */}
      {textures?.length ? <WorldMap textures={textures}/> : null}
      {textures?.length ? <ToolBar/> : null}
    </Application>
  )
}
