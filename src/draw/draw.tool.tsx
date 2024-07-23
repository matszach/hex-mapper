import Konva from "konva";
import { Hexmap, HexmapField } from "../app-state/hexmap.model";
import { toHex, toRgb } from "../utils/color.util";
import { clamp, randomBetween } from "../utils/calc.utils";
import { Brush } from "../app-state/brush.model";

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
  for (let ix = 0; ix < size; ix++) {
    const cut = Math.abs(ix - Math.floor(size/2))
    let shift = Math.floor(cut/2)
    if (hex.x % 2 === 0 && (Math.floor(size/2) % 2) !== (ix % 2)) {
      shift += 1
    }
    for (let iy = 0; iy < size - cut; iy++) {
      const x = hex.x + ix - Math.floor(size / 2)
      const y = hex.y + iy - Math.floor(size / 2) + shift
      fields.push({ x, y })
    }
  }
  return fields
}

export function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}

function randomizeAround(current: number, min: number, max: number, variety: number): number {
  const offset = (max - min) * variety
  const change = randomBetween(-offset, offset)
  return clamp(current + change, min, max)
}

export function getColor({ color, colorVariety }: Brush): string {
  if (colorVariety) {
    const trueVariety = colorVariety / 100
    const [r, g, b] = toRgb(color)
    const nr = randomizeAround(r, 0, 255, trueVariety)
    const ng = randomizeAround(g, 0, 255, trueVariety)
    const nb = randomizeAround(b, 0, 255, trueVariety)
    return toHex(nr, ng, nb)
  }
  return color
}