import { useGameObjectStore } from "../../store/gameObjectStore";
import { GameObjectSprite } from "../gameObjectSprite/GameObjectSprite";

export type GameObjectLayerProps = {
  xOffset: number;
  yOffset: number;
};

export const GameObjectLayer = ({xOffset, yOffset}: GameObjectLayerProps) => {
    const gameObjects = useGameObjectStore(s => s.gameObjects);
    const gameObjectsFlat = Object.values(gameObjects);

    return (
        <pixiContainer x={xOffset} y={yOffset}>
            {gameObjectsFlat.map(gameObject => {
                return (
                    <GameObjectSprite
                        key={gameObject.id}
                        x={gameObject.x}
                        y={gameObject.y}
                        type={gameObject.type}
                    />
                );
            })}
        </pixiContainer>
    );
};