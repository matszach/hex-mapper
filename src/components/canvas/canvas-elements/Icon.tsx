import { Image as KonvaImage } from "react-konva"
import { FIELD_SIZE } from "../../../const/sizes"
import useImage from "use-image"
import { useEffect, useRef } from "react"
import { RGB } from "konva/lib/filters/RGB"
import { toRgb } from "../../../utils/color.util"
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
  // const [image] = useImage(`./icons/${iconKey}.png`, 'anonymous')
  const image = useIcon(iconKey, color)
  // const image = useIcon(iconKey, color)
  // TODO load image by key and color and the store it, filtering as it goes causes lag - this will also let us avoid using ref
  // lternative would be runig a script to pregenerate the icons (but that would make editing the colors later impossible)
  // const ref = useRef();

  // useEffect(() => {
  //   if (image) {
  //     // @ts-ignore
  //     ref.current.cache();
  //   }
  // }, [image]);

  // TODO use color
  if (image/* && ref */) {
    // const [r, g, b] = toRgb(color)
    return <KonvaImage
      x={x - FIELD_SIZE / 2}
      y={y - FIELD_SIZE / 2}
      width={FIELD_SIZE}
      height={FIELD_SIZE}
      image={image}
      // @ts-ignore
      // ref={ref}
      // filters={[RGB]}
      // red={r}
      // green={g}
      // blue={b}
    />
  }
  return <></>
}