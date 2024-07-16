import { createContext } from "react"
import { Hexmap } from "./hexmap.model"
import { generateEmptyGrid } from "../utils/grid.utils"
import { Brush, BrushType } from "./brush.model"

export interface AppState {
  map: Hexmap,
  updateMap: (newMap: Hexmap) => void
  history: Hexmap[]
  pushHistory: (newMap: Hexmap) => void
  undoHistory: () => void
  brush: Brush,
  updateBrush: (newBrush: Partial<Brush>) => void
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
}

export const AppContext = createContext<AppState>(defaultAppState)