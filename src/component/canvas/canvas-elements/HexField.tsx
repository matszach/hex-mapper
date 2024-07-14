import Hex from "./Hex"

export interface HexFieldProps {
  x: number
  y: number
  fill?: string
  pattern?: string
  icon?: string                     
}

export default function HexField(
  { x, y, fill, pattern, icon }: HexFieldProps
) {
  return (
    <Hex
      x={x}
      y={y}
      fill={fill}
      radius={40}
      stroke="black"
      strokeWidth={1}
    ></Hex>
  )
}