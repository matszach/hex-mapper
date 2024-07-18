const CASHED_COLORS: Record<string, [number, number, number]> = {}

export function toRgb(hex: string): [number, number, number] {
  if (hex in CASHED_COLORS) {
    return CASHED_COLORS[hex]
  }
  hex = hex.replace(/^#/, '');
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  CASHED_COLORS[hex] = [r, g, b]
  return [r, g, b]
}