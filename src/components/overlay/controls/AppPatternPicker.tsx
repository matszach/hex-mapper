import './AppPatternPicker.scss'
import { HexmapPattern, HexmapPatternType } from "../../../app-state/hexmap.model"
import AppAsideElementWrapper from "./AppAsideElementWrapper"

type PatternType = Omit<HexmapPattern, "color">

export interface AppPatternPickerProps {
  value: PatternType
  onChange: (value: PatternType) => void
}

export default function AppPatternPicker({ value, onChange }: AppPatternPickerProps) {
 
  const update = (p: Partial<PatternType>) => {
    onChange({ ...value, ...p })
  }

  return <AppAsideElementWrapper label="Pattern">
    <div>
      <select onChange={e => update({ type: Number(e.target.value) as HexmapPatternType })} value={value.type}>
        <option value={HexmapPatternType.HATCH}>Hatch</option>
        <option value={HexmapPatternType.CROSSHATCH}>Crosshatch</option>
        <option value={HexmapPatternType.ZIGZAG}>Zigzag</option>
      </select>
    </div>
  </AppAsideElementWrapper>
}