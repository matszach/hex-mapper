import { Line } from "react-konva";
import { FIELD_SIZE, X_OFFSET, X_RATIO, Y_RATIO } from "../../../const/sizes";
import { useTimer } from "../../../hooks/use-timer";
import { getComputedHoneycombCoords } from "../../../utils/honeycomb.util";
import { useContext } from "react";
import { AppContext } from "../../../app-state/app-state.model";
import { clamp } from "../../../utils/calc.utils";

export default function ToolIndicator() {
  const time = useTimer(50)
  // move brush size, zoom etc to global state ?
  const { brush, zoom } = useContext(AppContext)
  if (!brush.hoveredHex) {
    return <></>
  }
  const { x, y } = brush.hoveredHex
  const baseX = x * (FIELD_SIZE * X_RATIO + X_OFFSET)
  const baseY = y * FIELD_SIZE * Y_RATIO  + (x % 2 === 0 ? FIELD_SIZE * Y_RATIO / 2 : 0)
  const points = getComputedHoneycombCoords(brush.size)
    .reduce((acc, [px, py]) => ([...acc, px * FIELD_SIZE + baseX, py * FIELD_SIZE + baseY]), [] as number[])
  return (
    <>
      <Line
        listening={false}
        points={points}
        stroke={'blue'}
        strokeWidth={clamp(5 / zoom.x, 5, 15)}
        dash={[20, 15]}
        dashOffset={time}
        closed={true}
      >
      </Line>
    </>
  )
}
