import type { JSX } from "react";
import { useUiStore } from "../../store/uiStore";

export const HUD = (): JSX.Element => {
  const {selectGameObjects, selectedGameObject, gameObjects} = useUiStore();

  return (
    <pixiContainer anchor={0} position={{x:10,y:10}}>
      <pixiText
        text={`Selected tool: ${selectedGameObject}`}
        style={{fill: 'white', fontSize: 30}}
        position={{x: 10, y: 0}}
      />
      {
        gameObjects.length ? gameObjects.map((gameObject, idx) => {

          return (
            <pixiText
              key={gameObject}
              text={gameObject}
              style={{fill: 'white', fontSize: 30}}
              eventMode="static"
              onClick={() => selectGameObjects(gameObject)}
              position={{x: 10, y: (idx + 1) * 35}}
              />
          );
        })
        : null
      }
    </pixiContainer>
  );
}
