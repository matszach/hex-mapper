import { Rect } from "react-konva"

export interface BackgroundProps {
  size: {
    width: number
    height: number
  }
}

const RECT_SIZE: number = 80

export default function Background({ size }: BackgroundProps) {
  const rects = []
  const maxX = size.width / RECT_SIZE
  const maxY = size.height / RECT_SIZE
  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      rects.push(
        <Rect
          key={`${x}-${y}`}
          x={x * RECT_SIZE}
          y={y * RECT_SIZE}
          width={RECT_SIZE}
          height={RECT_SIZE}
          fill={(x + y) % 2 === 0 ? '#f8f8f8' : '#f0f0f0'}
        />
      )
    }
  }
  return <>{rects}</>
}