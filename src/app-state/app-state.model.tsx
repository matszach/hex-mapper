import { createContext } from "react"
import { Hexmap } from "./hexmap.model"
import { generateEmptyGrid } from "../utils/grid.utils"

export interface AppState {
  map: Hexmap,
  updateMap: (newMap: Hexmap) => void
  history: Hexmap[]
  pushHistory: (newMap: Hexmap) => void
  undoHistory: () => void
}

export const defaultAppState: AppState = {
  map: { 
    fields: generateEmptyGrid(50, 30)
  },
  updateMap: () => {},
  history: [],
  pushHistory: () => {},
  undoHistory: () => {},
}

export const AppContext = createContext<AppState>(defaultAppState)