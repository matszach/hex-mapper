import { useEffect, useState } from "react"

export function useTimer(time: number): number {
  const [timer, setTimer] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer + 1)
    }, time)
    return () => clearInterval(interval)
  })
  return timer
}