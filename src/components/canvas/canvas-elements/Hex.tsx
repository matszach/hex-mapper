import { Line } from "react-konva";
import { batchMap } from "../../../utils/calc.utils";
import Konva from "konva";
import { HEX_COORDS_1 } from "../../../const/shape-coords";

export interface HexProps { 
  x?: number, 
  y?: number, 
  radius?: number, 
  stroke?: string, 
  strokeWidth?: number, 
  fill?: string,
  onMouseEnter?: (e: Konva.KonvaEventObject<MouseEvent>) => void,
  onMouseLeave?: (e: Konva.KonvaEventObject<MouseEvent>) => void,
  onMouseDown?: (e: Konva.KonvaEventObject<MouseEvent>) => void,
  onMouseUp?: (e: Konva.KonvaEventObject<MouseEvent>) => void,
  zIndex?: number
}

export default function Hex(
  { x = 0, y = 0, radius = 10, stroke = 'black', strokeWidth = 1, fill = 'white', ...props  }: HexProps
) {
  const points = batchMap(HEX_COORDS_1, 2, ([px, py]) => [px * radius + x, py * radius + y])
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
    // zIndex={props.zIndex}
  ></Line>
}