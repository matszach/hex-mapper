import Hex from "./Hex"
import { FIELD_SIZE, X_OFFSET, X_RATIO, Y_RATIO } from "../../../const/sizes"
import { HexmapField } from "../../../app-state/hexmap.model"
import { DrawHandler } from "../../../drawing-tools/draw-handler"
import { AppContext } from "../../../app-state/app-state.model"
import { useContext } from "react"

export interface HexFieldProps extends HexmapField { }

export default function HexField(props: HexFieldProps) {
  const draw: DrawHandler = DrawHandler.getInstance()
  const context = useContext(AppContext)
  return (
    <Hex
      x={props.x * (FIELD_SIZE * X_RATIO + X_OFFSET)}
      y={props.y * FIELD_SIZE * Y_RATIO  + (props.x % 2 === 0 ? FIELD_SIZE * Y_RATIO / 2 : 0)}
      fill={props.fill}
      radius={FIELD_SIZE}
      stroke={"black"}
      strokeWidth={1}
      // zIndex={0}
      onMouseEnter={e => draw.onMouseEnterHex(e, props, context)}
      onMouseLeave={e => draw.onMouseLeaveHex(e, props, context)}
      onMouseDown={e => draw.onMouseDownHex(e, props, context)}
      onMouseUp={e => draw.onMouseUpHex(e, props, context)}
    ></Hex>
  )
}