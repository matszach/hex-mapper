export interface HexmapField {
  x: number
  y: number
  icon?: string
  pattern?: string
  fill?: string
}

export interface Hexmap {
  timestamp?: number,
  fields: HexmapField[][]
}