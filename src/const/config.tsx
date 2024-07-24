import { publicUrl } from "../utils/env.utils"

export const MAX_HISTORY_SIZE = 20
export const ZOOM = {
  RATE: 1.2,
  MAX: 5,
  MIN: 0.1
}

export const ALLOWED_MAP_RESOLUTIONS = [
  [30, 20], [40, 25], [50, 30], [60, 35], [70, 40]
]

export const ALLOWED_BRUSH_SIZES = [
  1, 3, 5, 7, 9, 11, 13, 15
]

export function fetchIconKeys(): Promise<string[]> {
  return fetch(publicUrl('config.json'))
    .then(res => res.json())
    .then(({ iconKeys }) => iconKeys)
}

export const DEFAULT_PALETTE = [
  '#000000', '#e4a672', '#b86f50', '#743f39', '#3f2832', '#9e2835', '#e53b44', '#fb922b', 
  '#ffe762', '#63c64d', '#327345', '#193d3f', '#4f6781', '#1fbfd2', '#2ce8f4', '#0484d1',
  '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'
]