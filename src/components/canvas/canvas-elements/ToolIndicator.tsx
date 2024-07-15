import { DrawHandler } from "../../../drawing-tools/draw-handler";
import { useMousemove } from "../../../hooks/use-mousemove";
import { Line } from "react-konva";
import { FIELD_SIZE, X_OFFSET, X_RATIO, Y_RATIO } from "../../../const/sizes";
import { useTimer } from "../../../hooks/use-timer";
import { getComputedHoneycombCoords } from "../../../utils/honeycomb.util";

export default function ToolIndicator() {
  const time = useTimer(100)
  const { hoveredHex: hex, brushSize } = useMousemove(() => DrawHandler.getInstance())
  if (!hex) {
    return <></>
  }
  const { x, y } = hex
  const baseX = x * (FIELD_SIZE * X_RATIO + X_OFFSET)
  const baseY = y * FIELD_SIZE * Y_RATIO  + (x % 2 === 0 ? FIELD_SIZE * Y_RATIO / 2 : 0)
  const points = getComputedHoneycombCoords(brushSize).reduce((acc, [px, py]) => ([...acc, px * FIELD_SIZE + baseX, py * FIELD_SIZE + baseY]), [] as number[])
  return (
    <>
      <Line
        points={points}
        stroke={'blue'}
        strokeWidth={5}
        dash={[10, 5]}
        dashOffset={time}
        closed={true}
      >
      </Line>
    </>
  )
}
