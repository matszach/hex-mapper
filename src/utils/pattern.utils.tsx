import { HexmapPattern, HexmapPatternType } from "../app-state/hexmap.model"
import { FIELD_SIZE } from "../const/sizes"
import { getRotateFn } from "./calc.utils"

// TODO periodic cashe clear ?
export class PatternHelper {

  private static cashe: Map<string, number[][]> = new Map()

  private static build(x: number, y: number, { nofLines, angle = 0, type, scale }: HexmapPattern): number[][] {
    const rotateFn = getRotateFn(x, y, angle)
    let lines: number[][] = []
    const inSize: number = FIELD_SIZE * scale
    const step = 2 * inSize / (nofLines + 1)
    const lineAbs = (nofLines - 1)/2
    const stepAngle = step / Math.sqrt(3)
    if (type === HexmapPatternType.HATCH) {
      for (let i = 0; i < nofLines; i++) {
        const offsetY = (i + 1) * step - inSize
        // TODO may want to it to hex based on rotation
        const offsetX = Math.abs(lineAbs - i) * stepAngle
        lines.push([
          ...rotateFn(x - inSize + offsetX, y + offsetY),
          ...rotateFn(x + inSize - offsetX, y + offsetY)
        ])
      }
    } else if (type === HexmapPatternType.CROSSHATCH) {
      const rotateFnCross = getRotateFn(x, y, angle + Math.PI / 3)
      for (let i = 0; i < nofLines; i++) {
        const offsetY = (i + 1) * step - inSize
        const offsetX = Math.abs(lineAbs - i) * stepAngle
        lines.push([
          ...rotateFn(x - inSize + offsetX, y + offsetY),
          ...rotateFn(x + inSize - offsetX, y + offsetY)
        ])
        lines.push([
          ...rotateFnCross(x - inSize + offsetX, y + offsetY),
          ...rotateFnCross(x + inSize - offsetX, y + offsetY)
        ])
      }
    } else if (type === HexmapPatternType.ZIGZAG) {
      const line = []
      for (let i = 0; i < nofLines; i++) {
        const offsetY = (i + 1) * step - inSize
        const offsetX = Math.abs(lineAbs - i) * stepAngle
        if (i % 2 === 0) {
          line.push(...rotateFn(x - inSize + offsetX, y + offsetY))
        } else {
          line.push(...rotateFn(x + inSize - offsetX, y + offsetY))
        }
      }
      lines.push(line)
    }
    return lines
  }

  static get(x: number, y: number, pattern: HexmapPattern): number[][] {
    const { nofLines, angle = 0, type, scale } = pattern
    const key = `${x}-${y}-${nofLines}-${angle}-${type}-${scale}`
    if (!this.cashe.has(key)) {
      this.cashe.set(key, this.build(x, y, pattern))
    }
    return this.cashe.get(key)!
  }
}