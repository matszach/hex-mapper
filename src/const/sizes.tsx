import { Vector2d } from "konva/lib/types"

export const X_RATIO: number = (1 + Math.sqrt(3)/4)
export const X_OFFSET: number = 2
export const Y_RATIO: number = Math.sqrt(3)
export const FIELD_SIZE: number = 40
export const NAV_HEIGHT: number = 52
export const ASIDE_WIDTH: number = 320
export const STAGE_OFFSET: Vector2d = { x: -(ASIDE_WIDTH + FIELD_SIZE * 1.2), y: -(NAV_HEIGHT + FIELD_SIZE * 1.2) }