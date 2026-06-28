import { useEffect } from 'react'
import { Assets, Texture } from 'pixi.js'
import { useTextureStore } from '../store/useTextureStore'

export function useLoadTextures(atlasPath: string) {
  const { setTextures, setLoading, setError } = useTextureStore();

  useEffect(() => {
    setLoading(true);

    const load = async () => {
      try {
        const spritesheet = await Assets.load(atlasPath);
        await spritesheet.parse()
        setTextures(spritesheet.textures as Record<string, Texture>)
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    load();
  }, [atlasPath])
}
