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
  // TODO change this so taht there's hexmap state, tools state, etc - each with own update fn
  // draw handler could get the relevant state and update fn set in a component
  state: GlobalState,
  update: (newState: Partial<GlobalState>) => void
}

export const defaultAppState: AppState = {
  state: defaultGlobalState,
  update: () => {}
}

export const GlobalContext = createContext<AppState>(defaultAppState)