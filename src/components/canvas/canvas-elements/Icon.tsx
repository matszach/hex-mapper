import { Image } from "react-konva"
import { FIELD_SIZE } from "../../../const/sizes"
import { useImage } from "../../../hooks/use-image"

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

function InnerIcon({ iconKey, x, y, color }: IconProps) {
  const src = useImage(`./icons/${iconKey}.png`)
  // TODO use color
  if (src) {
    return <Image
      x={x - FIELD_SIZE / 2}
      y={y - FIELD_SIZE / 2}
      width={FIELD_SIZE}
      height={FIELD_SIZE}
      image={src}
    />
  }
  return <></>
}