import { createContext } from "react"
import { Hexmap } from "./hexmap.model"
import { generateEmptyGrid } from "../utils/grid.utils"
import { Brush, BrushType } from "./brush.model"
import { Vector2d } from "konva/lib/types"
import { KonvaEventObject } from "konva/lib/Node"
import { DEFAULT_PALETTE } from "../const/config"

export interface AppState {
  map: Hexmap,
  updateMap: (newMap: Hexmap) => void
  newMap: (x: number, y: number) => void
  history: Hexmap[]
  saveHistory: () => void
  undoHistory: () => void
  brush: Brush,
  updateBrush: (newBrush: Partial<Brush>) => void
  zoom: Vector2d
  handleZoom: (e: KonvaEventObject<WheelEvent>) => void
  palette: string[]
  updatePalette: (newPalette: string[]) => void
  // TEMP
  printRef: any
  setPrintRef: (ref: any) => void
}

export const defaultAppState: AppState = {
  map: { 
    fields: generateEmptyGrid(50, 30)
  },
  updateMap: () => {},
  newMap: () => {},
  history: [],
  saveHistory: () => {},
  undoHistory: () => {},
  brush: {
    size: 1,
    type: BrushType.FILL,
    key: 'castle',
    color: DEFAULT_PALETTE[0]
  },
  updateBrush: () => {},
  zoom: { x: 1, y: 1 },
  handleZoom: () => {},
  palette: [
    ...DEFAULT_PALETTE
  ],
  updatePalette: () => {},
  printRef: null,
  setPrintRef: () => {}
}

export const AppContext = createContext<AppState>(defaultAppState)