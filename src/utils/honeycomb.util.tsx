
const sq3 = Math.sqrt(3)

const DIRS: Record<string, [number, number]> = {
  'L':  [1, 0],
  'LD': [0.5, sq3 / 2],
  'RD': [-0.5, sq3 / 2],
  'R': [-1, 0],
  'RU': [-0.5, -sq3 / 2],
  'LU': [0.5, -sq3 / 2]
}

function getSide(direction: string, length: number): string[] {
  const dirKeys = Object.keys(DIRS)
  const n = dirKeys.length
  const dirIndex = dirKeys.indexOf(direction)
  const prevDirection = dirKeys[((dirIndex + n - 1) % n)]
  const steps = []
  for (let i = 0; i < length; i++) {
    steps.push(i % 2 === 0 ? prevDirection : direction)
  }
  return steps
}

function computeHoneycombOutlineCoords(size: number = 1): [number, number][] {
  const os = Math.floor(size / 2)
  let youAreHere = [-1 - os * (1.5), - os * sq3 / 2] // ??
  // @ts-ignore
  const stepsToTake = Object.keys(DIRS).reduce((acc: string[], curr: string) => {
    return [...acc, ...getSide(curr, size)]
  }, [] as string[])
  const coords = stepsToTake.map(step => {
    const point = [youAreHere[0] + DIRS[step][0], youAreHere[1] + DIRS[step][1]]
    youAreHere = point
    return point
  })
  return coords as [number, number][]
}

const HEX_COORDS: Record<number, [number, number][]> = { }

export function getComputedHoneycombCoords(size: number = 1): [number, number][] {
  if (!(size in HEX_COORDS)) {
    HEX_COORDS[size] = computeHoneycombOutlineCoords(size)
  }
  return HEX_COORDS[size]
}

