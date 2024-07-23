export function chunk<T = any>(array: T[], size: number, skipIncomplete: boolean = true): T[][] {
  const chunked: T[][] = []
  let i: number = 0
  let currentChunk: T[] = []
  array.forEach(item => {
    i++
    currentChunk.push(item)
    if (i === size) {
      chunked.push(currentChunk)
      currentChunk = []
      i = 0
    }
  })
  if (!skipIncomplete && currentChunk.length > 0) {
    chunked.push(currentChunk)
  }
  return chunked
}

export function batchMap<T = any, R = any>(array: T[], size: number, callback: (items: T[]) => R[]): R[] {
  return chunk(array, size, true).reduce((acc, curr) => [...acc, ...callback(curr)], [] as R[])
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function areEqual(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}

export function getRotateFn(pivotX: number, pivotY: number, angle: number): (x: number, y: number) => [number, number] {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return (x: number, y: number): [number, number] => {
    const x1 = x - pivotX
    const y1 = y - pivotY
    const x2 = x1 * cos - y1 * sin
    const y2 = x1 * sin + y1 * cos
    return [x2 + pivotX, y2 + pivotY]
  }                             
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}