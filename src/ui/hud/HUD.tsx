import type { JSX } from "react";
import { useUiStore } from "../../store/uiStore";

export const HUD = (): JSX.Element => {
  const {selectTool, selectedTool, tools} = useUiStore();

  return (
    <pixiContainer anchor={0} position={{x:10,y:10}}>
      <pixiText
        text={`Selected tool: ${selectedTool}`}
        style={{fill: 'white', fontSize: 30}}
        position={{x: 10, y: 0}}
      />
      {
        tools.length ? tools.map((tool, idx) => {

          return (
            <pixiText
              key={tool}
              text={tool}
              style={{fill: 'white', fontSize: 30}}
              eventMode="static"
              onClick={() => selectTool(tool)}
              position={{x: 10, y: (idx + 1) * 35}}
              />
          );
        })
        : null
      }
    </pixiContainer>
  );
}
