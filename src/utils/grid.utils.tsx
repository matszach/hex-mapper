import { HexmapField } from "../global-state/hexmap.model";

export function generateEmptyGrid(xSize: number, ySize: number): HexmapField[][] {
  const fields: HexmapField[][] = [] as HexmapField[][]
  for (let x = 0; x < xSize; x++) {
    fields[x] = []
    for (let y = 0; y < ySize; y++) {
      fields[x][y] = { x, y }
    }
  }
  return fields
} 