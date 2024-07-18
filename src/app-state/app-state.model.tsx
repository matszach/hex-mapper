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
  '#000000', '#e4a672', '#b86f50', '#743f39', '#3f2832', '#9e2835', '#e53b44', '#fb922b', 
  '#ffe762', '#63c64d', '#327345', '#193d3f', '#4f6781', '#1fbfd2', '#2ce8f4', '#0484d1',
  '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'
]

const AVAILABLE_ICONS = [
  'castle'
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
    type: BrushType.FILL,
    key: AVAILABLE_ICONS[0],
    color: DEFAULT_PALETTE[0]
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