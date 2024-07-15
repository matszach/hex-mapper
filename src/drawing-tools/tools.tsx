import Konva from "konva"
import { HexmapField } from "../global-state/hexmap.model"
import { GlobalState } from "../global-state/global-state.model"

export class Tool {
  onMouseEnterHex: (e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: GlobalState, update: (newState: Partial<GlobalState>) => void) => void = () => {}
  onMouseLeaveHex: (e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: GlobalState, update: (newState: Partial<GlobalState>) => void) => void = () => {}
  onMouseDownHex: (e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: GlobalState, update: (newState: Partial<GlobalState>) => void) => void = () => {}
  onMouseUpHex: (e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: GlobalState, update: (newState: Partial<GlobalState>) => void) => void = () => {}
}