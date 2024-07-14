import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";

export function useZoom({ initial = 1, onZoomChange = () => {}, rate = 1.2 } = {}): [{ x: number, y: number }, (e: KonvaEventObject<WheelEvent>) => void] {
  const [zoomState, setZoomState] = useState(initial);
  const setZoom = (e: KonvaEventObject<WheelEvent>) => {
    const state = e.evt.deltaY > 0 ? zoomState / rate : zoomState * rate
    setZoomState(state);
  }
  return [{ x: zoomState, y: zoomState }, setZoom]
}