import {create} from 'zustand';
import type { GameObjectType } from '../configs/map-constants';

export interface UiState {
  gameObjects: GameObjectType[],
  selectedGameObject: GameObjectType | null;
  selectGameObjects: (selectedGameObject: GameObjectType) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  gameObjects: ['flower', 'house', 'tree'],
  selectedGameObject: null,
  selectGameObjects: (selectedGameObject) => set(() => ({selectedGameObject})),
}));
