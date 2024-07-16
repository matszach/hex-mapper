import Konva from "konva"
import { HexmapField } from "../app-state/hexmap.model"
import { AppState } from "../app-state/app-state.model"

export class Tool {
  onMouseEnterHex: (e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) => void = () => {}
  onMouseLeaveHex: (e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) => void = () => {}
  onMouseDownHex: (e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) => void = () => {}
  onMouseUpHex: (e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: AppState) => void = () => {}
}