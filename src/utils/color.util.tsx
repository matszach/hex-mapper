var hexToHsl = require('hex-to-hsl');

const CASHED_RGB: Record<string, [number, number, number]> = {}

export function toRgb(hex: string): [number, number, number] {
  if (hex in CASHED_RGB) {
    return CASHED_RGB[hex]
  }
  hex = hex.replace(/^#/, '');
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  CASHED_RGB[hex] = [r, g, b]
  return [r, g, b]
}

export function toHex(r: number, g: number, b: number): string {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

const CASHED_HSL: Record<string, [number, number, number]> = {}

export function toHsl(hex: string): [number, number, number] {
  if (hex in CASHED_HSL) {
    return CASHED_HSL[hex]
  }
  const [h, s, l] = hexToHsl(hex)
  CASHED_HSL[hex] = [h, s, l]
  return [h, s, l]
}