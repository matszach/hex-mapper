import { createContext } from "react"

export interface GlobalState {
  fieldSize: number
}

export const defaultGlobalState: GlobalState = {
  fieldSize: 40
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