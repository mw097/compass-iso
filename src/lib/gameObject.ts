import type { GameObjectType } from "../configs/map-constants";
import {v4 as uuidv4} from 'uuid';
import { getDefinition } from "./isometric";

export function createGameObject(type: GameObjectType, x: number, y: number) {
  const {width, height} = getDefinition(type);

  return {
    id: uuidv4(),
    type,
    x,
    y,
    width,
    height
  }
}
