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
  '#000000', '#222034', '#45283c', '#663931', '#8f563b', '#df7126', '#d9a066', '#eec39a',
  '#fbf236', '#99e550', '#6abe30', '#37946e', '#4b692f', '#524b24', '#323c39', '#3f3f74',
  '#306082', '#5b6ee1', '#639bff', '#5fcde4', '#cbdbfc', '#ffffff', '#9badb7', '#847e87',
  '#696a6a', '#595652', '#76428a', '#ac3232', '#d95763', '#d77bba', '#8f974a', '#8a6f30',
  '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff',
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