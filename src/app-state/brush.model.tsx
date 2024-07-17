import { HexmapField } from "./hexmap.model"

export interface Brush {
  size: number,
  type: BrushType,
  color: string,
  key?: string,
  hoveredHex?: HexmapField
}

export enum BrushType {
  FILL,
  PATTERN,
  ICON,
  LINE,
  TEXT
}