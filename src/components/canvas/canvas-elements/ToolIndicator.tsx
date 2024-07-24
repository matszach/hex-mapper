import { Line } from "react-konva";
import { FIELD_SIZE, X_OFFSET, X_RATIO, Y_RATIO } from "../../../const/sizes";
import { useTimer } from "../../../hooks/use-timer";
import { getComputedHoneycombCoords } from "../../../utils/honeycomb.util";
import { useContext } from "react";
import { AppContext } from "../../../app-state/app-state.model";
import { clamp } from "../../../utils/calc.utils";
import { Vector2d } from "konva/lib/types";
import { Brush, BrushType } from "../../../app-state/brush.model";

export default function ToolIndicator({ mousePos }: { mousePos: Vector2d }) {
  const { brush, zoom } = useContext(AppContext)
  return (
    <>
      <HoneycombOutline brush={brush} zoom={zoom}/>
      {/* <Circle x={mousePos.x} y={mousePos.y} radius={10} fill={brush.color} opacity={0.5} /> */}
    </>
  )
}

function HoneycombOutline({ brush, zoom }: { brush: Brush, zoom: Vector2d }) {
  const time = useTimer(50)
  if (!brush.hoveredHex || ![BrushType.FILL, BrushType.ICON, BrushType.PATTERN].includes(brush.type)) {
    return <></>
  }
  const { x, y } = brush.hoveredHex
  const baseX = x * (FIELD_SIZE * X_RATIO + X_OFFSET)
  const baseY = y * FIELD_SIZE * Y_RATIO  + (x % 2 === 0 ? FIELD_SIZE * Y_RATIO / 2 : 0)
  const points = getComputedHoneycombCoords(brush.size)
    .reduce((acc, [px, py]) => ([...acc, px * FIELD_SIZE + baseX, py * FIELD_SIZE + baseY]), [] as number[])
  return <Line
    listening={false}
    points={points}
    stroke={brush.color}
    strokeWidth={clamp(5 / zoom.x, 5, 15)}
    dash={[20, 15]}
    dashOffset={time}
    closed={true}
  />
}