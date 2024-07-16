import { createContext } from "react"
import { Hexmap } from "./hexmap.model"
import { generateEmptyGrid } from "../utils/grid.utils"
import { Brush, BrushType } from "./brush.model"
import { Vector2d } from "konva/lib/types"
import { KonvaEventObject } from "konva/lib/Node"

export interface AppState {
  map: Hexmap,
  updateMap: (newMap: Hexmap) => void
  history: Hexmap[]
  pushHistory: (newMap: Hexmap) => void
  undoHistory: () => void
  brush: Brush,
  updateBrush: (newBrush: Partial<Brush>) => void
  zoom: Vector2d,
  handleZoom: (e: KonvaEventObject<WheelEvent>) => void
}

export const defaultAppState: AppState = {
  map: { 
    fields: generateEmptyGrid(50, 30)
  },
  updateMap: () => {},
  history: [],
  pushHistory: () => {},
  undoHistory: () => {},
  brush: {
    size: 1,
    type: BrushType.COLOR,
    value: "#000000",
    hoveredHex: null
  },
  updateBrush: () => {},
  zoom: { x: 1, y: 1 },
  handleZoom: () => {}
}

export const AppContext = createContext<AppState>(defaultAppState)