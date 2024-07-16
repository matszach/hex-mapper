import { HexmapField } from "./hexmap.model"

export interface Brush {
  size: number,
  type: BrushType,
  value: string // color hex, pattern icon/key
  hoveredHex: HexmapField | null
}

export enum BrushType {
  COLOR,
  PATTERN,
  ICON
}