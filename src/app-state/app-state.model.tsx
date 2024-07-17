import { createContext } from "react"
import { Hexmap } from "./hexmap.model"
import { generateEmptyGrid } from "../utils/grid.utils"
import { Brush, BrushType } from "./brush.model"
import { Vector2d } from "konva/lib/types"
import { KonvaEventObject } from "konva/lib/Node"

export interface AppState {
  map: Hexmap,
  updateMap: (newMap: Hexmap) => void
  history: Hexmap[]
  saveHistory: () => void
  undoHistory: () => void
  brush: Brush,
  updateBrush: (newBrush: Partial<Brush>) => void
  zoom: Vector2d
  handleZoom: (e: KonvaEventObject<WheelEvent>) => void
  palette: string[]
  updatePalette: (newPalette: string[]) => void
}

const DEFAULT_PALETTE = [
  '#060608', '#141013', '#3b1725', '#73172d', '#b4202a', '#df3e23', '#fa6a0a', '#f9a31b',
  '#ffd541', '#fffc40', '#d6f264', '#9cdb43', '#59c135', '#14a02e', '#1a7a3e', '#24523b',
  '#122020', '#143464', '#285cc4', '#249fde', '#20d6c7', '#a6fcdb', '#ffffff', '#fef3c0',
  '#fad6b8', '#f5a097', '#e86a73', '#bc4a9b', '#793a80', '#403353', '#242234', '#221c1a',
  '#322b28', '#71413b', '#bb7547', '#dba463', '#f4d29c', '#dae0ea', '#b3b9d1', '#8b93af',
  '#6d758d', '#4a5462', '#333941', '#422433', '#5b3138', '#8e5252', '#ba756a', '#e9b5a3',
  '#e3e6ff', '#b9bffb', '#849be4', '#588dbe', '#477d85', '#23674e', '#328464', '#5daf8d',
  '#92dcba', '#cdf7e2', '#e4d2aa', '#c7b08b', '#a08662', '#796755', '#5a4e44', '#423934',
  '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'
]

export const defaultAppState: AppState = {
  map: { 
    fields: generateEmptyGrid(50, 30)
  },
  updateMap: () => {},
  history: [],
  saveHistory: () => {},
  undoHistory: () => {},
  brush: {
    size: 1,
    type: BrushType.COLOR,
    value: DEFAULT_PALETTE[0],
    hoveredHex: null
  },
  updateBrush: () => {},
  zoom: { x: 1, y: 1 },
  handleZoom: () => {},
  palette: [
    ...DEFAULT_PALETTE
  ],
  updatePalette: () => {}
}

export const AppContext = createContext<AppState>(defaultAppState)