import { Vector2d } from "konva/lib/types";
import { GlobalState } from "../global-state/global-state.model";

// needs to take into account zoom and the offset from under overlay
export function getDragBoundingFn(state: GlobalState, zoom: Vector2d): (pos: Vector2d) => Vector2d {
  return ({ x, y }: Vector2d) => {
    if (x < 0) {
      x = 0
    }
    if (y < 0) {
      y = 0
    }
    // if (x > state.hexmap.width) {
    //   x = state.hexmap.width
    // }
    // if (y > state.hexmap.height) {
    //   y = state.hexmap.height
    // }
    return { x, y }
  }
}
