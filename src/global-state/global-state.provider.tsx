import { useState } from "react";
import { defaultGlobalState, AppContext, GlobalState } from "./global-state.model";

export default function GlobalStateProvider({ children }: { children?: React.ReactNode }) {
  const [state, setState] = useState<GlobalState>(defaultGlobalState)
  const update = (newState: Partial<GlobalState>) => {
    setState({ ...state, ...newState })
    // could store previous 10 states, expose undo/redo methods - probably not on update but on mouseUp though
  }
  return (
    <AppContext.Provider value={{ state, update }}>
      {children}
    </AppContext.Provider>
  )
}