import { useContext, useState } from "react"
import Hex, { HEX_COORDS, HEX_RATIO } from "./Hex"
import { GlobalContext } from "../../../global-state/global-state.model"

export interface HexFieldProps {
  pos: [number, number]
  fill?: string
  pattern?: string
  icon?: string                     
}

export default function HexField(
  { pos, fill, pattern, icon }: HexFieldProps
) {
  const { state, update } = useContext(GlobalContext)
  const [isHovered, setHovered] = useState(false)
  const [xPos, yPos] = pos
  return (
    <Hex
      x={xPos * (state.fieldSize * (1 + HEX_RATIO / 2) + 2)}
      y={yPos * state.fieldSize * 2 * HEX_RATIO  + (xPos % 2 === 0 ? state.fieldSize * HEX_RATIO * 2 / 2 : 0)}
      fill={fill}
      radius={state.fieldSize}
      stroke={isHovered ? "blue" : "black"}
      strokeWidth={isHovered ? 3 : 1}
      zIndex={isHovered ? 1000 : 0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    ></Hex>
  )
}