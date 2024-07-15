import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { clamp } from "../utils/calc.utils";

export function useZoom({ initial = 1, rate = 1.2, max = 5, min = 0.25 } = {}): [{ x: number, y: number }, (e: KonvaEventObject<WheelEvent>) => void] {
  const [zoomState, setZoomState] = useState(initial);
  const setZoom = (e: KonvaEventObject<WheelEvent>) => {
    const state = e.evt.deltaY > 0 ? zoomState / rate : zoomState * rate
    setZoomState(clamp(state, min, max));
  }
  return [{ x: zoomState, y: zoomState }, setZoom]
}