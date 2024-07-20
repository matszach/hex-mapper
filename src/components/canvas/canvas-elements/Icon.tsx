import { Image as KonvaImage } from "react-konva"
import { FIELD_SIZE } from "../../../const/sizes"
import { useIcon } from "../../../hooks/use-icon"
import { HexmapIcon } from "../../../app-state/hexmap.model"

export interface IconProps {
  x: number
  y: number
  icon?: HexmapIcon
}

export default function Icon(props: IconProps) {
  if (props.icon) {
    return <InnerIcon x={props.x} y={props.y} icon={props.icon} />
  }
  return <></>
}

function InnerIcon({ x, y, icon }: IconProps & { icon: { key: string, color: string } }) {
  const image = useIcon(icon.key, icon.color)
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