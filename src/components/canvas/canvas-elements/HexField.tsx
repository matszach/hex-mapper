import Hex from "./Hex"
import { FIELD_SIZE, X_OFFSET, X_RATIO, Y_RATIO } from "../../../const/sizes"
import { HexmapField } from "../../../global-state/hexmap.model"
import { DrawHandler } from "../../../drawing-tools/draw-handler"
import { GlobalContext } from "../../../global-state/global-state.model"
import { useContext } from "react"

export interface HexFieldProps extends HexmapField { }

export default function HexField(props: HexFieldProps) {
  const draw: DrawHandler = DrawHandler.getInstance()
  const { state, update } = useContext(GlobalContext)
  // TODO draw.inject({ state, update })
  return (
    <Hex
      x={props.x * (FIELD_SIZE * X_RATIO + X_OFFSET)}
      y={props.y * FIELD_SIZE * Y_RATIO  + (props.x % 2 === 0 ? FIELD_SIZE * Y_RATIO / 2 : 0)}
      fill={props.fill}
      radius={FIELD_SIZE}
      stroke={"black"}
      strokeWidth={1}
      // zIndex={0}
      onMouseEnter={e => draw.onMouseEnterHex(e, props, state, update)}
      onMouseLeave={e => draw.onMouseLeaveHex(e, props, state, update)}
      onMouseDown={e => draw.onMouseDownHex(e, props, state, update)}
      onMouseUp={e => draw.onMouseUpHex(e, props, state, update)}
    ></Hex>
  )
}