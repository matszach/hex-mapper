import Hex from "./Hex"
import { FIELD_SIZE, X_OFFSET, X_RATIO, Y_RATIO } from "../../../const/sizes"
import { HexmapField } from "../../../app-state/hexmap.model"
import { Draw } from "../../../draw/draw"
import { AppContext } from "../../../app-state/app-state.model"
import { useContext } from "react"
import Icon from "./Icon"
// import { Text } from "react-konva"

export interface HexFieldProps extends HexmapField { }

export default function HexField(props: HexFieldProps) {
  const context = useContext(AppContext)
  const xPos = props.x * (FIELD_SIZE * X_RATIO + X_OFFSET)
  const yPos = props.y * FIELD_SIZE * Y_RATIO  + (props.x % 2 === 0 ? FIELD_SIZE * Y_RATIO / 2 : 0)
  return (
    <>
      <Hex
        x={xPos}
        y={yPos}
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
      <Icon iconKey={props.icon?.key} x={xPos} y={yPos} color={props.icon?.color} />
      {/* <Text x={xPos - 10} y={yPos} fill={"black"} text={`${props.x}, ${props.y}`}></Text> */}
    </>
  )
}