import { Container, Graphics, Sprite, AnimatedSprite, Text } from 'pixi.js';
import './App.module.scss';
import {Application, extend} from '@pixi/react';
import { useTextureStore } from './store/useTextureStore';
import { useLoadTextures } from './hooks/useLoadTextures';
import { GameCamera } from './gameCore/game/GameCamera';
import { HUD } from './ui/hud/HUD';
import { DevTools } from './utils/DevTools/DevTools';


extend({
  Container,
  Graphics,
  Sprite,
  AnimatedSprite,
  Text,
});

export default function App() {
  useLoadTextures(`${import.meta.env.BASE_URL}test_sprites/Spritesheets/tinyBlocks.json`);
  const { loading: loadingTextures, error: errorTextures } = useTextureStore();

  if (loadingTextures) return <div>Loading...</div>
  if (errorTextures) return <div>[APP] Error: {errorTextures.message}</div>

  return (
    <Application resizeTo={window}>
      <DevTools />
      <GameCamera />
      <HUD/>
    </Application>
  )
}
