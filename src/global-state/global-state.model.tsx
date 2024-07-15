import { createContext } from "react"
import { Hexmap } from "./hexmap.model"
import { gridCoords } from "../utils/calc.utils"

export interface GlobalState {
  hexmap: Hexmap,
  hexmapHistory: Hexmap[]
}

export const defaultGlobalState: GlobalState = {
  hexmap: {
    fields: gridCoords(50, 30).map(([x, y]) => ({ x, y }))
  },
  hexmapHistory: []
}

export interface AppState {
  state: GlobalState,
  update: (newState: Partial<GlobalState>) => void
}

export const defaultAppState: AppState = {
  state: defaultGlobalState,
  update: () => {}
}

export const GlobalContext = createContext<AppState>(defaultAppState)