import { createContext } from "react"

export interface GlobalState {

}

export const defaultGlobalState: GlobalState = {
  
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