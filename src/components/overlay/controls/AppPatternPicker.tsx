import './AppPatternPicker.scss'
import { HexmapPattern, HexmapPatternType } from "../../../app-state/hexmap.model"
import AppAsideElementWrapper from "./AppAsideElementWrapper"

type PatternTS = Omit<HexmapPattern, "color">

export interface AppPatternPickerProps {
  value: PatternTS,
  patternTypes: [HexmapPatternType, string][],
  nofLinesRange: [number, number],
  strokeWidthRange: [number, number],
  angleRange: [number, number],
  onChange: (value: PatternTS) => void
}

export default function AppPatternPicker({ 
  value, 
  patternTypes, 
  nofLinesRange: [minLines, maxLines], 
  strokeWidthRange: [minWidth, maxWidth],
  angleRange: [minAngle, maxAngle], 
  onChange 
}: AppPatternPickerProps) {
 
  const update = (p: Partial<PatternTS>) => {
    onChange({ ...value, ...p })
  }

  return <AppAsideElementWrapper label="Pattern">
    <div>
      <label>type</label>
      <select onChange={e => update({ type: Number(e.target.value) as HexmapPatternType })} value={value.type}>
        {patternTypes.map(([t, label]) => <option key={t} value={t}>{label}</option>)}
      </select>
      <br/>
      <label>nof lines</label>
      <input type="number" min={minLines} max={maxLines} value={value.nofLines} onChange={e => update({ nofLines: Number(e.target.value) })} />
      <br/>
      <label>width</label>
      <input type="number" min={minWidth} max={maxWidth} value={value.strokeWidth} step={0.5} onChange={e => update({ strokeWidth: Number(e.target.value) })} />
      <br/>
      <label>angle</label>
      <input type="number" min={minAngle} max={maxAngle} value={value.angle/Math.PI * 180} step={60} onChange={e => update({ angle: Number(e.target.value)/180 * Math.PI })} />
      <br/>
    </div>
  </AppAsideElementWrapper>
}