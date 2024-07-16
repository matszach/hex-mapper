import Konva from "konva";
import { HexmapField } from "../app-state/hexmap.model";
import { AppState } from "../app-state/app-state.model";
import { BrushType } from "../app-state/brush.model";
import { honeycombAround, primaryDown, safeHex } from "./draw.tool";

export class Draw {

  static onEnterHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, { map, updateMap, brush, updateBrush }: AppState) {
    updateBrush({ hoveredHex: hex })
    if (primaryDown(e)) {
      honeycombAround(hex, brush.size).forEach(hex => {
        if (brush.type === BrushType.COLOR) {
          safeHex(map, hex, {}).fill = brush.value
        }
      })
      updateMap(map)
    }
  }

  static onLeaveHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) {
    // this.hoveredHex = null // this causes stutter
  }

  static onDownHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) {
  }

  static onUpHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, { map, pushHistory }: AppState) {
    pushHistory(map)
  }

  static onEnterCanvas(e: Konva.KonvaEventObject<MouseEvent>, state: AppState) {

  }

  static onLeaveCanvas(e: Konva.KonvaEventObject<MouseEvent>, { updateBrush }: AppState) {
    updateBrush({ hoveredHex: null })
  }

}