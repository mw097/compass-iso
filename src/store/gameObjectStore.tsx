import { create } from "zustand";
import type { GameObject, SpatialIndex } from "../types/types";
import type { GameObjectType } from "../configs/map-constants";
import { getPositionalIdKey } from "../lib/isometric";
// import { createGameObject } from "../lib/gameObject";

export type GameObjectState = {
  gameObjects: Record<string, GameObject>;
  spatialIndex: SpatialIndex;
  // createGameObject: (type: GameObjectType, x: number, y: number) => void,
  addGameObject: (gameObject: GameObject) => void;
  removeGameObject: (id: string) => void;
  updateObject: (id: string, data: Partial<GameObject>) => void;
  getObject: (id: string) => GameObject | undefined;
  getObjectsAt: (x: number, y: number) => void;
};

export const useGameObjectStore = create<GameObjectState>()((set, get) => ({
  gameObjects: {} as Record<GameObjectType, GameObject>,
  spatialIndex: new Map<string, string[]>(),
  addGameObject: (gameObject) => set((state) => {
    const objects = {...state.gameObjects, [gameObject.id]: gameObject};
    const index = new Map(state.spatialIndex);

    for (let dw = 0; dw < gameObject.width; dw++ ) {
      for (let dh = 0; dh < gameObject.height; dh++) {
        const key = getPositionalIdKey(gameObject.x + dw, gameObject.y + dh);
        const ids = index.get(key) ?? [];
        index.set(key, [...ids, gameObject.id]);
      }
    }

    return {gameObjects: objects, spatialIndex: index};
  }),
  // createGameObject: (type, x, y) => {
  //   const gameObject = createGameObject(type, x, y);

  //   get().addGameObject(gameObject);
  // },
  removeGameObject: (id) => set((state) => {
    const object = state.gameObjects[id];
    if (!object) return state;

    const objects = { ...state.gameObjects };
    delete objects[id];

    const index = new Map(state.spatialIndex);

    for (let dw = 0; dw < object.width; dw++ ) {
      for (let dh = 0; dh < object.height; dh++) {
        const key = getPositionalIdKey(object.x + dw, object.y + dh);

        const ids = index.get(key);
        if (!ids) continue;

        const filteredIds = ids.filter((objId) => objId !== id);

        if (filteredIds.length === 0) {
          index.delete(key);
        } else {
          index.set(key, filteredIds);
        }
      }
    }

    return {gameObjects: objects, spatialIndex: index};
  }),
  updateObject: () => set(state => state), // TODO
  getObject: (id) => { return get().gameObjects[id]},
  getObjectsAt: (x, y) => {
    const state = get();
    const ids = state.spatialIndex.get(getPositionalIdKey(x,y));
    const filteredIds = ids?.map((id: string) => state.gameObjects[id]).filter(id => !!id);
    return filteredIds;
  },
}));
