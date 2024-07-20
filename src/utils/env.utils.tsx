export function isLocal(): boolean {
  return ['localhost', '127.0.0.1'].includes(window.location.hostname)
}

export function publicUrl(url: string): string {
  return `./hex-mapper/${url}`
}

export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}