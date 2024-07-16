import Konva from "konva";
import { HexmapField } from "../app-state/hexmap.model";
import { AppState } from "../app-state/app-state.model";
import { BrushType } from "../app-state/brush.model";

export class DrawHandler {

  static onMouseEnterHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, { map, updateMap, brush, updateBrush }: AppState) {
    updateBrush({ hoveredHex: hex })
    // TODO remove the global state and make events for stuff like create new mape etc ?
    // TODO make the hexmap and array of arrays
    const field = map.fields[hex.x][hex.y]
    if (field && e.evt.buttons === 1) {
      if (brush.type === BrushType.COLOR) {
        field.fill = brush.value
        updateMap(map)
      }
    }
    // this.tool.onMouseEnterHex(e, hex, state, update)
  }

  static onMouseLeaveHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) {
    // this.hoveredHex = null // this causes stutter
    // this.tool.onMouseLeaveHex(e, hex, state, update)
  }

  static onMouseDownHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) {
    // this.tool.onMouseDownHex(e, hex, state, update)
  }

  static onMouseUpHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) {
    // this.tool.onMouseUpHex(e, hex, state, update)
  }

}