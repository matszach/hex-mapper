import { Line } from "react-konva"
import { FIELD_SIZE } from "../../../const/sizes"
import { HexmapPattern } from "../../../app-state/hexmap.model"

export interface PatternProps {
  x: number
  y: number
  pattern?: HexmapPattern
}

export default function Pattern({ x, y, pattern }: PatternProps) {
  if (!pattern) {
    pattern = {
      color: "black",
      nofLines: 11,
      angle: 0,
      dash: [10, 10],
    }
  }
  return (
    <>
      {/* <Line 
        points={[x - FIELD_SIZE - 5, y -10, x + FIELD_SIZE + 10, y -10]}
        stroke={pattern.color}
        strokeWidth={1}
      /> */}
    </>
  )
}