import './AppPatternPicker.scss'
import { HexmapPattern, HexmapPatternType } from "../../../app-state/hexmap.model"
import AppAsideElementWrapper from "./AppAsideElementWrapper"

type PatternTS = Omit<HexmapPattern, "color">

export interface AppPatternPickerProps {
  value: PatternTS,
  patternTypes: [HexmapPatternType, string][],
  minLines: number,
  maxLines: number,
  minWidth: number,
  maxWidth: number,
  onChange: (value: PatternTS) => void
}

export default function AppPatternPicker(
  { value, patternTypes, minLines, maxLines, minWidth, maxWidth, onChange }: AppPatternPickerProps
) {
 
  const update = (p: Partial<PatternTS>) => {
    onChange({ ...value, ...p })
  }

  return <AppAsideElementWrapper label="Pattern">
    <div>
      <p><strong>WIP</strong></p>
      <select onChange={e => update({ type: Number(e.target.value) as HexmapPatternType })} value={value.type}>
        {patternTypes.map(([t, label]) => <option key={t} value={t}>{label}</option>)}
      </select>
      <br/>
      <input type="number" min={minLines} max={maxLines} value={value.nofLines} onChange={e => update({ nofLines: Number(e.target.value) })} />
      <br/>
      <input type="number" min={minWidth} max={maxWidth} value={value.strokeWidth} step={0.5} onChange={e => update({ strokeWidth: Number(e.target.value) })} />
    </div>
  </AppAsideElementWrapper>
}