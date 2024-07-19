import Konva from "konva";
import { HexmapField } from "../app-state/hexmap.model";
import { AppState } from "../app-state/app-state.model";
import { BrushType } from "../app-state/brush.model";
import { honeycombAround, primaryDown, safeHex } from "./draw.tool";

export class Draw {

  private static drawHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, { map, brush, updateMap }: AppState) {
    if (!primaryDown(e)) {
      return
    }
    if (brush.type === BrushType.FILL) {
      honeycombAround(hex, brush.size).forEach(hex => {
        safeHex(map, hex, {}).fill = brush.color
      })
    }
    if (brush.type === BrushType.ICON) {
      honeycombAround(hex, brush.size).forEach(hex => {
        safeHex(map, hex, {}).icon = {
          key: brush.key ?? '', // TODO HANDLE UNKNOWN ?
          color: brush.color
        }
      })
    }
    updateMap(map)
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
    updateBrush({ hoveredHex: undefined })
  }

}