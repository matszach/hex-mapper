import { useEffect, useState } from "react"
import { Brush, BrushType } from "../app-state/brush.model"
import { publicUrl } from "../utils/env.utils"

const PRELOADED_ICONS: Map<string, any> = new Map()

function loadIcon(src: string, color: string): Promise<CanvasImageSource> {
  const key = `${src}-${color}`
  return new Promise(res => {
    if (PRELOADED_ICONS.has(key)) {
      res(PRELOADED_ICONS.get(key))
    } else {
      const canvas = document.createElement('canvas')
      PRELOADED_ICONS.set(key, canvas)
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.src = publicUrl(`icons/${src}.png`)
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        // @ts-ignore
        ctx.drawImage(img, 0, 0)
        // @ts-ignore
        ctx.fillStyle = color
        // @ts-ignore
        ctx.globalCompositeOperation = 'source-in'
        // @ts-ignore
        ctx.fillRect(0, 0, img.width, img.height)
        res(canvas)
      }
    }
  })
}

export function preloadIcon(src: string, color: string): void {
  loadIcon(src, color)
}

export function usePreloadIcons(brush: Brush): void {
  useEffect(() => {
    if (brush.type === BrushType.ICON && brush.iconKey) {
      preloadIcon(brush.iconKey, brush.color)
    }
  }, [brush.type, brush.iconKey, brush.color])
}

export function useIcon(src: string, color: string): CanvasImageSource | null {
  const [image, setImage] = useState<CanvasImageSource | null>(null)
  useEffect(() => {
    loadIcon(src, color).then(setImage)
  })
  return image
}
