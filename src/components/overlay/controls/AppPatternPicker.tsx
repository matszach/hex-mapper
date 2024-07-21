import './AppPatternPicker.scss'
import { HexmapPattern, HexmapPatternType } from "../../../app-state/hexmap.model"
import AppAsideElementWrapper from "./AppAsideElementWrapper"
import { AppNumber, AppSelect } from './app-bootstrap-inputs'

type PatternTS = Omit<HexmapPattern, "color">

export interface AppPatternPickerProps {
  value: PatternTS
  patternTypes: [HexmapPatternType, string][]
  nofLinesRange: [number, number]
  strokeWidthRange: [number, number]
  angles: [number, string][]
  onChange: (value: PatternTS) => void
}

export default function AppPatternPicker({ 
  value, 
  patternTypes, 
  nofLinesRange: [minLines, maxLines], 
  strokeWidthRange: [minWidth, maxWidth],
  angles,
  onChange 
}: AppPatternPickerProps) {
 
  const update = (p: Partial<PatternTS>) => {
    onChange({ ...value, ...p })
  }

  return <AppAsideElementWrapper label="Pattern">
    <AppSelect
      label='Type' className='mb-2'
      value={value.type} options={patternTypes.map(([t, label]) => [t, label])}
      onChange={type => update({ type: Number(type) as HexmapPatternType })}
    />
    <AppNumber
      label='Number of lines' className='mb-2'
      value={value.nofLines} min={minLines} max={maxLines} step={1} 
      onChange={nofLines => update({ nofLines })}
    />
    <AppNumber
      label='Line width' className='mb-2'
      value={value.strokeWidth} min={minWidth} max={maxWidth} step={0.5} 
      onChange={strokeWidth => update({ strokeWidth })}
    />
    <AppSelect
      label='Angle' className='mb-2'
      value={value.angle} options={angles.map(([a, label]) => [a, label])}
      onChange={angle => update({ angle: Number(angle) })}
    />
  </AppAsideElementWrapper>
}