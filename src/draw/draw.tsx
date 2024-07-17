import Konva from "konva";
import { HexmapField } from "../app-state/hexmap.model";
import { AppState } from "../app-state/app-state.model";
import { BrushType } from "../app-state/brush.model";
import { honeycombAround, primaryDown, safeHex } from "./draw.tool";

export class Draw {

  private static drawHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, { map, brush, updateMap }: AppState) {
    if (primaryDown(e)) {
      honeycombAround(hex, brush.size).forEach(hex => {
        if (brush.type === BrushType.COLOR) {
          safeHex(map, hex, {}).fill = brush.value
        }
      })
      updateMap(map)
    }
  }

  static onEnterHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) {
    state.updateBrush({ hoveredHex: hex })
    this.drawHex(e, hex, state)
  }

  static onLeaveHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) {

  }

  static onDownHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) {
    state.saveHistory()
    this.drawHex(e, hex, state)
  }

  static onUpHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) {
  }

  static onEnterCanvas(e: Konva.KonvaEventObject<MouseEvent>, state: AppState) {

  }

  static onLeaveCanvas(e: Konva.KonvaEventObject<MouseEvent>, { updateBrush }: AppState) {
    updateBrush({ hoveredHex: null })
  }

}