import { useState } from "react";
import { defaultGlobalState, GlobalContext, GlobalState } from "./global-state.model";

export default function GlobalStateProvider({ children }: { children?: React.ReactNode }) {
  const [state, setState] = useState<GlobalState>(defaultGlobalState)
  const update = (newState: Partial<GlobalState>) => {
    setState({ ...state, ...newState })
  }
  return (
    <GlobalContext.Provider value={{ state, update }}>
      {children}
    </GlobalContext.Provider>
  )
}