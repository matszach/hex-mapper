import { FIELD_SIZE } from "../../../const/sizes"
import { HexmapPattern, HexmapPatternType } from "../../../app-state/hexmap.model"
import { Line } from "react-konva"
import { getRotateFn } from "../../../utils/calc.utils"

export interface PatternProps {
  x: number
  y: number
  pattern?: HexmapPattern
}

// TODO (?), kinda slow
export default function Pattern({ x, y, pattern }: PatternProps) {
  if (!pattern) {
    return null
  }
  const lines = buildLines(x, y, pattern)
  return (
    <>
      {lines.map((points, i) => (
        <Line
          key={`line-${x}-${y}-${i}`}
          points={points}
          stroke={pattern.color}
          strokeWidth={pattern.strokeWidth}
          dash={pattern.dash}
          // dashOffset={???}
        />
      ))}
    </>
  )
}

function buildLines(x: number, y: number, { nofLines, angle = 0, type, scale }: HexmapPattern): number[][] {
  const rotateFn = getRotateFn(x, y, angle)
  let lines: number[][] = []
  const inSize: number = FIELD_SIZE * scale
  const step = 2 * inSize / (nofLines + 1)
  const lineAbs = (nofLines - 1)/2
  const stepAngle = step / Math.sqrt(3)
  if (type === HexmapPatternType.HATCH) {
    for (let i = 0; i < nofLines; i++) {
      const offsetY = (i + 1) * step - inSize
      const offsetX = Math.abs(lineAbs - i) * stepAngle
      lines.push([
        ...rotateFn(x - inSize + offsetX, y + offsetY),
        ...rotateFn(x + inSize - offsetX, y + offsetY)
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