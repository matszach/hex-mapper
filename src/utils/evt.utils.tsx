import Konva from "konva";

export function prevent(e: Konva.KonvaEventObject<Event>) {
  e.evt.preventDefault()
}