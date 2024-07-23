import Konva from "konva";
import { HexmapField } from "../app-state/hexmap.model";
import { AppState } from "../app-state/app-state.model";
import { BrushType } from "../app-state/brush.model";
import { getColor, honeycombAround, primaryDown, safeHex } from "./draw.tool";

export class Draw {

  private static drawHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, { map, brush, updateMap }: AppState) {
    if (!primaryDown(e)) {
      return
    }
    if (brush.type === BrushType.FILL) {
      honeycombAround(hex, brush.size).forEach(hex => {
        safeHex(map, hex, {}).fill = getColor(brush)
      })
    }
    if (brush.type === BrushType.ICON) {
      honeycombAround(hex, brush.size).forEach(hex => {
        safeHex(map, hex, {}).icon = {
          key: brush.iconKey,
          color: getColor(brush)
        }
      })
    }
    if (brush.type === BrushType.PATTERN) {
      honeycombAround(hex, brush.size).forEach(hex => {
        safeHex(map, hex, {}).pattern = {
          ...brush.patternData,
          color: getColor(brush)
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
    this.drawHex(e, hex, state)
  }

  static onDownHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) {
    this.drawHex(e, hex, state)
    state.saveHistory()
  }

  static onUpHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) {
    this.drawHex(e, hex, state)
  }

  static onEnterCanvas(e: Konva.KonvaEventObject<MouseEvent>, state: AppState) {

  }

  static onLeaveCanvas(e: Konva.KonvaEventObject<MouseEvent>, { updateBrush }: AppState) {
    updateBrush({ hoveredHex: undefined })
  }

}