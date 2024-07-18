import { Image as KonvaImage } from "react-konva"
import { FIELD_SIZE } from "../../../const/sizes"
import { useIcon } from "../../../hooks/use-icon"

export interface IconProps {
  iconKey?: string
  color?: string
  x: number
  y: number
}

export default function Icon({ iconKey, x, y, color }: IconProps) {
  if (iconKey) {
    return <InnerIcon iconKey={iconKey} x={x} y={y} color={color} />
  }
  return <></>
}

function InnerIcon({ iconKey = '', x, y, color = '#000000' }: IconProps) {
  const image = useIcon(iconKey, color)

  if (image) {
    return <KonvaImage
      x={x - FIELD_SIZE / 2}
      y={y - FIELD_SIZE / 2}
      width={FIELD_SIZE}
      height={FIELD_SIZE}
      image={image}
    />
  }
  return <></>
}