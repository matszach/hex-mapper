import { useState } from "react"
import Hex from "./Hex"
import { FIELD_SIZE, X_OFFSET, X_RATIO, Y_RATIO } from "../../../const/sizes"

export interface HexFieldProps {
  pos: [number, number]
  fill?: string
  pattern?: string
  icon?: string,
  onMouseDown?: () => void                  
}

export default function HexField(props: HexFieldProps) {
  const [isHovered, setHovered] = useState(false)
  const [xPos, yPos] = props.pos
  return (
    <Hex
      x={xPos * (FIELD_SIZE * X_RATIO + X_OFFSET)}
      y={yPos * FIELD_SIZE * Y_RATIO  + (xPos % 2 === 0 ? FIELD_SIZE * Y_RATIO / 2 : 0)}
      fill={props.fill}
      radius={40}
      stroke={isHovered ? "blue" : "black"}
      strokeWidth={isHovered ? 3 : 1}
      zIndex={isHovered ? 1000 : 0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={props.onMouseDown}
    ></Hex>
  )
}