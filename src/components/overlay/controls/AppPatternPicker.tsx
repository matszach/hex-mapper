import './AppPatternPicker.scss'
import { HexmapPattern, HexmapPatternType } from "../../../app-state/hexmap.model"
import AppAsideElementWrapper from "./AppAsideElementWrapper"
import { AppNumber, AppSelect } from './app-bootstrap-inputs'
import { Layer, Stage } from 'react-konva'
import HexField from '../../canvas/canvas-elements/HexField'

type PatternTS = Omit<HexmapPattern, "color">

export interface AppPatternPickerProps {
  value: PatternTS
  patternTypes: [HexmapPatternType, string][]
  nofLinesRange: [number, number]
  strokeWidthRange: [number, number]
  scaleRange: [number, number]
  angles: [number, string][]
  onChange: (value: PatternTS) => void
  selectedColor: string
}

export default function AppPatternPicker({
  value, 
  patternTypes, 
  nofLinesRange: [minLines, maxLines], 
  strokeWidthRange: [minWidth, maxWidth],
  scaleRange: [minScale, maxScale],
  angles,
  onChange,
  selectedColor
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
    {/* SLIDER ? */}
    <AppNumber
      label='Number of lines' className='mb-2'
      value={value.nofLines} min={minLines} max={maxLines} step={1} 
      onChange={nofLines => update({ nofLines })}
    />
    {/* SLIDER ? */}
    <AppNumber
      label='Line width' className='mb-2'
      value={value.strokeWidth} min={minWidth} max={maxWidth} step={0.5} 
      onChange={strokeWidth => update({ strokeWidth })}
    />
    {/* SLIDER ? */}
    <AppNumber
      label='Scale' className='mb-2'
      value={value.scale} min={minScale} max={maxScale} step={0.05} 
      onChange={scale => update({ scale })}
    />
    <AppSelect
      label='Angle' className='mb-2'
      value={value.angle} options={angles.map(([a, label]) => [a, label])}
      onChange={angle => update({ angle: Number(angle) })}
    />
    <Stage width={300} height={90}>
      <Layer>
        <HexField
          x={2.4}
          y={0.6}
          pattern={{ ...value, color: selectedColor }}
        />
      </Layer>
    </Stage>
    {/* TODO some display for how the pater will look */}
  </AppAsideElementWrapper>
}