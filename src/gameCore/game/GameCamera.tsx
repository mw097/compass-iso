import { MapGrid } from "../mapGrid/MapGrid";
import { FederatedPointerEvent, type FederatedWheelEvent } from "pixi.js";
import { useCameraStore } from "../../store/cameraStore";
import { HIT_AREA, TERRAIN_TEXTURE_W } from "../../configs/map-constants";
import { useRef, type JSX } from "react";
import { GameObjectLayer } from "../gameObjectLayer/GameObjectLayer";


export const GameCamera = (): JSX.Element => {
  const {x, y, zoom, pan, setZoom} = useCameraStore();
  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })

  return (
    <pixiContainer
      x={x}
      y={y}
      scale={zoom}
      eventMode="static"
      onWheel={(e: FederatedWheelEvent) => setZoom(zoom - e.deltaY * 0.001)}
      hitArea={HIT_AREA}
      onPointerDown={(e: FederatedPointerEvent) => {
        dragging.current = true;
        last.current = {x: e.globalX, y: e.globalY}
      }}
      onPointerMove={(e: FederatedPointerEvent) => {
        if (!dragging.current) return
        pan(e.clientX - last.current.x, e.globalY - last.current.y)
        last.current = { x: e.globalX, y: e.globalY }
      }}
      onPointerUp={() => { dragging.current = false }}
      onPointerLeave={() => { dragging.current = false }}
    >
      <MapGrid />
      <GameObjectLayer xOffset={0} yOffset={-TERRAIN_TEXTURE_W - 6}/>
    </pixiContainer>
  );
};
