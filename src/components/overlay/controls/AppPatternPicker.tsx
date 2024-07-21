import './AppPatternPicker.scss'
import { HexmapPattern, HexmapPatternType } from "../../../app-state/hexmap.model"
import AppAsideElementWrapper from "./AppAsideElementWrapper"

type PatternTS = Omit<HexmapPattern, "color">

export interface AppPatternPickerProps {
  value: PatternTS,
  patternTypes: [HexmapPatternType, string][],
  onChange: (value: PatternTS) => void
}

export default function AppPatternPicker({ value, patternTypes, onChange }: AppPatternPickerProps) {
 
  const update = (p: Partial<PatternTS>) => {
    onChange({ ...value, ...p })
  }

  return <AppAsideElementWrapper label="Pattern">
    <div>
      <select onChange={e => update({ type: Number(e.target.value) as HexmapPatternType })} value={value.type}>
        {patternTypes.map(([t, label]) => <option key={t} value={t}>{label}</option>)}
      </select>
    </div>
  </AppAsideElementWrapper>
}