import Konva from "konva";
import { HexmapField } from "../app-state/hexmap.model";
import { AppState } from "../app-state/app-state.model";
import { BrushType } from "../app-state/brush.model";

export class DrawHandler {

  static onEnterHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, { map, updateMap, brush, updateBrush }: AppState) {
    updateBrush({ hoveredHex: hex })
    const field = map.fields[hex.x][hex.y]
    if (field && e.evt.buttons === 1) {
      if (brush.type === BrushType.COLOR) {
        field.fill = brush.value
        updateMap(map)
      }
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