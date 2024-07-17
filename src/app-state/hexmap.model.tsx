export interface HexmapField {
  x: number
  y: number
  icon?: { 
    key: string
    color: string
  }
  pattern?: {
    key: string
    color: string
  }
  fill?: string
}

export interface Hexmap {
  timestamp?: number,
  fields: HexmapField[][]
  // texts, lines
}