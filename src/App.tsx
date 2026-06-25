import { Container, Graphics, Sprite, AnimatedSprite, Text } from 'pixi.js';
import './App.module.scss';
import {Application, extend} from '@pixi/react';
import {WorldMap} from './game-core/world-map/WorldMap';
import { ToolBar } from './ui/tool-bar/ToolBar';
import { useTextureStore } from './store/useTextureStore';
import { useLoadTextures } from './hooks/useLoadTextures';


extend({
  Container,
  Graphics,
  Sprite,
  AnimatedSprite,
  Text,
});

export default function App() {
  useLoadTextures('/test_sprites/Spritesheets/tinyBlocks.json');
  const { loading: loadingTextures, error: errorTextures } = useTextureStore();

  if (loadingTextures) return <div>Loading...</div>
  if (errorTextures) return <div>[APP] Error: {errorTextures.message}</div>

  return (
    <Application resizeTo={window}>
      <WorldMap/>
      <ToolBar/>
    </Application>
  )
}
