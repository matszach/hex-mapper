import { createContext } from "react"
import { Hexmap } from "./hexmap.model"
import { generateEmptyGrid } from "../utils/grid.utils"

export interface GlobalState {
  hexmap: Hexmap,
  history: Hexmap[]
}

export const defaultGlobalState: GlobalState = {
  hexmap: {
    fields: generateEmptyGrid(50, 30)
  },
  history: []
}

export interface AppState {
  state: GlobalState,
  update: (newState: Partial<GlobalState>) => void
}

export const defaultAppState: AppState = {
  state: defaultGlobalState,
  update: () => {}
}

export const AppContext = createContext<AppState>(defaultAppState)