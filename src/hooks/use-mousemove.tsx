import { useEffect, useState } from "react"

export function useMousemove<T>(callback: (e?: MouseEvent) => T): T{
  const [t, setT] = useState<T>(callback())
  useEffect(() => {
    const handler = (e: MouseEvent) => setT(callback(e))
    document.addEventListener('mousemove', handler)
    return () => document.removeEventListener('mousemove', handler)
  }, [])
  return t
}