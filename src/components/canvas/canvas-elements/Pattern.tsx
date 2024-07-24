import { HexmapPattern } from "../../../app-state/hexmap.model"
import { Line } from "react-konva"
import { PatternHelper } from "../../../utils/pattern.utils"

export interface PatternProps {
  x: number
  y: number
  pattern?: HexmapPattern
}

export default function Pattern({ x, y, pattern }: PatternProps) {

  if (!pattern) {
    return null
  }

  const lines = PatternHelper.get(x, y, pattern)

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
