import Konva from "konva";
import { Tool } from "./tools";
import { HexmapField } from "../global-state/hexmap.model";
import { GlobalState } from "../global-state/global-state.model";
import { randomColor } from "../utils/mock.util";

export class DrawHandler {

  private tool: Tool = new Tool()

  static instance: DrawHandler

  static getInstance() {
    if (!DrawHandler.instance) {
      DrawHandler.instance = new DrawHandler()
    }
    return DrawHandler.instance
  }

  private constructor() { }

  setTool(tool: Tool) {
    this.tool = tool
  }

  onMouseEnterHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: GlobalState, update: (newState: Partial<GlobalState>) => void) {
    // TODO remove the global state and make events for stuff like create new mape etc ?
    // TODO make the hexmap and array of arrays
    const field = state.hexmap.fields.find(f => f.x === hex.x && f.y === hex.y) 
    if (field && e.evt.buttons === 1) {
      field.fill = randomColor()
      update({ hexmap: state.hexmap })
    }
    this.tool.onMouseEnterHex(e, hex, state, update)
  }

  onMouseLeaveHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: GlobalState, update: (newState: Partial<GlobalState>) => void) {
    this.tool.onMouseLeaveHex(e, hex, state, update)
  }

  onMouseDownHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: GlobalState, update: (newState: Partial<GlobalState>) => void) {
    this.tool.onMouseDownHex(e, hex, state, update)
  }

  onMouseUpHex(e: Konva.KonvaEventObject<MouseEvent>, hex: HexmapField, state: GlobalState, update: (newState: Partial<GlobalState>) => void) {
    this.tool.onMouseUpHex(e, hex, state, update)
  }

}