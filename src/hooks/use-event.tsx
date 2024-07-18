import { useEffect } from "react";

export function useEvent(event: string, callback: (e: any) => void) {
  useEffect(() => {
    window.addEventListener(event, callback)
    return () => window.removeEventListener(event, callback)
  })
}