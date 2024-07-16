import Hex from "./Hex"
import { FIELD_SIZE, X_OFFSET, X_RATIO, Y_RATIO } from "../../../const/sizes"
import { HexmapField } from "../../../app-state/hexmap.model"
import { Draw } from "../../../draw/draw"
import { AppContext } from "../../../app-state/app-state.model"
import { useContext } from "react"

export interface HexFieldProps extends HexmapField { }

export default function HexField(props: HexFieldProps) {
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
      onMouseEnter={e => Draw.onEnterHex(e, props, context)}
      onMouseLeave={e => Draw.onLeaveHex(e, props, context)}
      onMouseDown={e => Draw.onDownHex(e, props, context)}
      onMouseUp={e => Draw.onUpHex(e, props, context)}
    ></Hex>
  )
}