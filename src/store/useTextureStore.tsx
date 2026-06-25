import { type Texture } from "pixi.js";
import { create } from "zustand";

type TextureState = {
  textures: Record<string, Texture>
  loading: boolean
  error: Error | null
  setTextures: (textures: Record<string, Texture>) => void
  setLoading: (loading: boolean) => void
  setError: (error: Error) => void
}

export const useTextureStore = create<TextureState>()((set) => ({
  textures: {},
  loading: false,
  error: null,
  setTextures: (textures) => set({ textures }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
