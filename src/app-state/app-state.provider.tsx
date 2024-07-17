import { useState } from "react";
import { AppContext, AppState, defaultAppState } from "./app-state.model";
import { Hexmap } from "./hexmap.model";
import { MAX_HISTORY_SIZE, ZOOM } from "../const/config";
import { Brush } from "./brush.model";
import { Vector2d } from "konva/lib/types";
import { KonvaEventObject } from "konva/lib/Node";
import { clamp } from "../utils/calc.utils";
import { clone } from "../draw/draw.tool";

export default function AppStateProvider({ children }: { children?: React.ReactNode }) {

  // Map
  const [map, setMap] = useState<Hexmap>(defaultAppState.map)

  const updateMap = (newMap: Hexmap) => {
    setMap({ ...newMap })
  }

  // History
  const [history, setHistory] = useState<Hexmap[]>([defaultAppState.map])

  const saveHistory = () => {
    const copy = clone(map)
    copy.timestamp = Date.now()
    const limit = MAX_HISTORY_SIZE - 1
    const toKeep = history.length > limit ? history.slice(-limit) : history
    setHistory([...toKeep, copy])
  }

  const undoHistory = () => {
    // TODO here's bug that sometimes unding rolls back to original state
    const prev = history.pop()
    if (prev) {
      updateMap({ ...prev })
      setHistory([...history])
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

  // Palette
  const [palette, setPalette] = useState<string[]>(defaultAppState.palette)

  const updatePalette = (newPalette: string[]) => {
    setPalette([...newPalette])
  }

  // State 
  const appState: AppState = {
    map, updateMap,
    history, saveHistory, undoHistory,
    brush, updateBrush,
    zoom, handleZoom,
    palette, updatePalette
  }

  return (
    <AppContext.Provider value={appState}>
      {children}
    </AppContext.Provider>
  )
}