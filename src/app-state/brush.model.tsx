import { HexmapField, HexmapPattern } from "./hexmap.model"

export interface Brush {
  size: number,
  type: BrushType,
  color: string,
  erasing?: boolean, // maybe not needed and just the relevan field being empty is enough
  iconKey?: string,
  patternData?: Omit<HexmapPattern, 'color'>,
  hoveredHex?: HexmapField
}

export enum BrushType {
  FILL,
  PATTERN,
  ICON,
  LINE,
  TEXT
}