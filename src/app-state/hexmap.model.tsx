export interface HexmapField {
  x: number
  y: number
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
  angle: number
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