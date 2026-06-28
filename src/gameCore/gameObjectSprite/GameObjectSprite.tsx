import { useMemo, useState, type JSX } from "react";
import { useTextureStore } from "../../store/useTextureStore";
import { getTintFilter, POLYGONAL_HIT_AREA, TEXTURE_SCALE, type GameObjectType } from "../../configs/map-constants";
import { gridToScreen } from "../../lib/isometric";
import { logElementPosition } from "../../lib/logging";

export type GameObjectSpriteProps = {
    x: number;
    y: number;
    type: GameObjectType;
}

export const GameObjectSprite = ({
    x, y, type
}: GameObjectSpriteProps): JSX.Element => {
    const {textures} = useTextureStore();
    const [isoX, isoY] = gridToScreen(x, y);
    const [hover, setHover] = useState(false);
    const filter = useMemo(() => getTintFilter(), []);


    return (
        <pixiSprite
            x={isoX}
            y={isoY}
            texture={textures[type]}
            hitArea={POLYGONAL_HIT_AREA}
            scale={TEXTURE_SCALE}
            eventMode="static"
            anchor={0}
            onClick={() => {
              logElementPosition(x, y, 'game object');
              // addGameObject(createGameObject('flower', x, y))
              }
            }
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            filters={hover ? [filter] : []}
        />
    );
};