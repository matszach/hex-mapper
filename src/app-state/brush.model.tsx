import { HexmapField, HexmapPattern } from "./hexmap.model"

export interface Brush {
  size: number,
  type: BrushType,
  color: string,
  colorVariety: number,
  erasing: boolean, // TO BE IMPLEMENTED
  iconKey: string,
  patternData: Omit<HexmapPattern, 'color'>,
  hoveredHex?: HexmapField
}

export enum BrushType {
  FILL,
  PATTERN,
  ICON,
  LINE,
  TEXT
}