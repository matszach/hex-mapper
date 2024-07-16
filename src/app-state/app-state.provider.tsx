import { useState } from "react";
import {  AppContext, AppState, defaultAppState } from "./app-state.model";
import { Hexmap } from "./hexmap.model";
import { MAX_HISTORY_SIZE } from "../const/config";

export default function GlobalStateProvider({ children }: { children?: React.ReactNode }) {

  // Map
  const [map, setMap] = useState<Hexmap>(defaultAppState.map)

  const updateMap = (newMap: Hexmap) => {
    setMap({ ...newMap })
  }

  // History
  const [history, setHistory] = useState<Hexmap[]>([])

  const pushHistory = (newMap: Hexmap) => {
    const limit = MAX_HISTORY_SIZE - 1
    const toKeep = history.length > limit ? history.slice(-limit) : history
    setHistory([...toKeep, newMap])
  }

  const undoHistory = () => {
    if (history.length > 0) {
      setMap(history[history.length - 1])
      setHistory(history.slice(0, -1))
    }
  }

  const appState: AppState = {
    map, updateMap,
    history, pushHistory, undoHistory,
  }

  return (
    <AppContext.Provider value={appState}>
      {children}
    </AppContext.Provider>
  )
}