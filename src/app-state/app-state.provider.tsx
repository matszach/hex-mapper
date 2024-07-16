import { useState } from "react";
import { AppContext, AppState, defaultAppState } from "./app-state.model";
import { Hexmap } from "./hexmap.model";
import { MAX_HISTORY_SIZE, ZOOM } from "../const/config";
import { Brush } from "./brush.model";
import { Vector2d } from "konva/lib/types";
import { KonvaEventObject } from "konva/lib/Node";
import { clamp } from "../utils/calc.utils";

export default function GlobalStateProvider({ children }: { children?: React.ReactNode }) {

  // Map
  const [map, setMap] = useState<Hexmap>(defaultAppState.map)

  const updateMap = (newMap: Hexmap) => {
    setMap({ ...newMap })
  }

  // History
  const [history, setHistory] = useState<Hexmap[]>([])

  const pushHistory = (newMap: Hexmap) => {
    const limit = MAX_HISTORY_SIZE - 1
    const toKeep = history.length > limit ? history.slice(-limit) : history
    setHistory([...toKeep, newMap])
  }

  const undoHistory = () => {
    if (history.length > 0) {
      setMap(history[history.length - 1])
      setHistory(history.slice(0, -1))
    }
  }
  
  // Brush
  const [brush, setBrush] = useState<Brush>(defaultAppState.brush)

  const updateBrush = (newBrush: Partial<Brush>) => {
    setBrush({ ...brush, ...newBrush })
  }

  // Zoom
  const [zoom, setZoom] = useState<Vector2d>(defaultAppState.zoom)
  const handleZoom = (e: KonvaEventObject<WheelEvent>) => {
    let z = e.evt.deltaY > 0 ? zoom.x / ZOOM.RATE : zoom.x * ZOOM.RATE
    z = clamp(z, ZOOM.MIN, ZOOM.MAX)
    setZoom({ x: z, y: z })
  }

  const appState: AppState = {
    map, updateMap,
    history, pushHistory, undoHistory,
    brush, updateBrush,
    zoom, handleZoom
  }

  return (
    <AppContext.Provider value={appState}>
      {children}
    </AppContext.Provider>
  )
}