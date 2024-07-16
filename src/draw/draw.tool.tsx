import Konva from "konva";
import { Hexmap, HexmapField } from "../app-state/hexmap.model";

export function primaryDown(e: Konva.KonvaEventObject<MouseEvent>) {
  return e.evt.buttons === 1
}

export function safeHex(map: Hexmap, { x, y }: HexmapField, defaultHex: Partial<HexmapField> = {}): Partial<HexmapField> {
  if (!map.fields[x] || !map.fields[x][y]) {
    return defaultHex
  }
  return map.fields[x][y]
}

export function honeycombAround(hex: HexmapField, size: number): HexmapField[] {
  const fields: HexmapField[] = []
  // TODO needs to match the shape
  for (let ix = 0; ix < size; ix++) {
    for (let iy = 0; iy < size; iy++) {
      const x = hex.x + ix - Math.floor(size / 2)
      const y = hex.y + iy - Math.floor(size / 2)
      fields.push({ x, y })
    }
  }
  return fields
}
