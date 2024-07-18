import { useEffect, useState } from "react"


const PRELOADED_ICONS: Map<string, any> = new Map()

export function useIcon(src: string, color: string): CanvasImageSource | null {
  const [image, setImage] = useState<CanvasImageSource | null>(null)
  const key = `${src}-${color}`
  useEffect(() => {
    if (PRELOADED_ICONS.has(key)) {
      setImage(PRELOADED_ICONS.get(key))
    } else {
      const canvas = document.createElement('canvas')
      PRELOADED_ICONS.set(key, canvas)
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.src = `./icons/${src}.png`
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
        // console.log('preloaded', src, color)
        setImage(canvas)
      }                    
    }
  })
  return image
}
