import { FIELD_SIZE } from "../../../const/sizes"
import { HexmapPattern, HexmapPatternType } from "../../../app-state/hexmap.model"
import { Line } from "react-konva"

export interface PatternProps {
  x: number
  y: number
  pattern?: HexmapPattern
}

const mockDefaultPattern: HexmapPattern = {
  color: "black",
    nofLines: 5,
    angle: 0,
    type: HexmapPatternType.HATCH,
    dash: undefined
}

// TODO, kinda slow
export default function Pattern({ x, y, pattern = mockDefaultPattern }: PatternProps) {
  // if (y > 0) {
  //   return null
  // }
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
          strokeWidth={1}
          dash={pattern.dash}
          // dashOffset={???}
        />
      ))}
    </>
  )
}

function buildLines(x: number, y: number, { nofLines }: HexmapPattern): number[][] {
  const size: number = FIELD_SIZE * 0.9
  let lines: number[][] = []
  const stepY = 2 * size / (nofLines + 1)
  for (let i = 0; i < nofLines; i++) {
    const offsetY = (i + 1) * stepY - size
    const offsetX = Math.abs((nofLines - 1)/2 - i) * stepY / Math.sqrt(3)
    lines.push([x - size + offsetX, y + offsetY, x + size - offsetX, y + offsetY])
  }
  return lines
}