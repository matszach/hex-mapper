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
  dash?: [number, number]
  angle?: number
}                                 

export interface Hexmap {
  timestamp?: number,
  fields: HexmapField[][]
  // texts, lines
}