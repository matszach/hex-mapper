import { useEffect, useState } from "react";

const PRELOADED_IMAGES = new Map<string, CanvasImageSource>()

export function useImage(src: string): CanvasImageSource | null {
  const [image, setImage] = useState<CanvasImageSource | null>(null)
  useEffect(() => {
    if (PRELOADED_IMAGES.has(src)) {
      setImage(PRELOADED_IMAGES.get(src) as CanvasImageSource)
    } else {
      const img = new Image()
      PRELOADED_IMAGES.set(src, img)
      img.src = src
      img.onload = () => {
        setImage(img)
      }
    }
  })
  return image
}