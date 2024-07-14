import { Line } from "react-konva";
import { batchMap } from "../../../utils/calc.utils";

export interface HexProps { 
  x?: number, 
  y?: number, 
  radius?: number, 
  stroke?: string, 
  strokeWidth?: number, 
  fill?: string,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
  onMouseDown?: () => void,
  onMouseUp?: () => void,
  zIndex?: number
}

const HEX_COORDS = [
  1, 0,
  0.5, Math.sqrt(3) / 2,
  -0.5, Math.sqrt(3) / 2,
  -1, 0,
  -0.5, -Math.sqrt(3) / 2,
  0.5, -Math.sqrt(3) / 2
]

export default function Hex(
  { x = 0, y = 0, radius = 10, stroke = 'black', strokeWidth = 1, fill = 'white', ...props  }: HexProps
) {
  const points = batchMap(HEX_COORDS, 2, ([px, py]) => [px * radius + x, py * radius + y])
  return <Line
    points={points}
    stroke={stroke}
    strokeWidth={strokeWidth}
    fill={fill}
    closed={true}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    zIndex={props.zIndex}
  ></Line>
}