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