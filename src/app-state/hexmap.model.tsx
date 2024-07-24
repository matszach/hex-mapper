import { Vector2d } from "konva/lib/types"

export interface HexmapField extends Vector2d {
  icon?: HexmapIcon
  pattern?: HexmapPattern
  fill?: string
}

export interface HexmapIcon {
  key: string
  color: string
}

export interface HexmapPattern {
  color: string,
  nofLines: number,
  type: HexmapPatternType,
  dash: [number, number] | undefined
  alternatingDash: boolean
  strokeWidth: number
  angle: number,
  scale: number,
}      

export enum HexmapPatternType {
  HATCH,
  CROSSHATCH,
  ZIGZAG
}

export interface Hexmap {
  timestamp?: number,
  fields: HexmapField[][]
  // texts, lines
}