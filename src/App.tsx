import { Container, Graphics, Sprite, AnimatedSprite, Text } from 'pixi.js';
import './App.module.scss';
import {Application, extend} from '@pixi/react';
import { useTextureStore } from './store/useTextureStore';
import { useLoadTextures } from './hooks/useLoadTextures';
import { GameCamera } from './game-core/game/GameCamera';
import { HUD } from './ui/hud/HUD';


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
      <GameCamera />
      <HUD/>
    </Application>
  )
}
