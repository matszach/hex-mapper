import './AppPatternPicker.scss'
import { HexmapPattern, HexmapPatternType } from "../../../app-state/hexmap.model"
import AppAsideElementWrapper from "./AppAsideElementWrapper"
import { AppNumber, AppSelect, AppSlider } from './app-bootstrap-inputs'
import { Layer, Stage } from 'react-konva'
import HexField from '../../canvas/canvas-elements/HexField'

type PatternTS = Omit<HexmapPattern, "color">

export interface AppPatternPickerProps {
  value: PatternTS
  patternTypes: [HexmapPatternType, string][]
  nofLinesRange: [number, number]
  strokeWidthRange: [number, number]
  scaleRange: [number, number]
  angleRange: [number, number]
  onChange: (value: PatternTS) => void
  selectedColor: string
}

export default function AppPatternPicker({
  value, 
  patternTypes, 
  nofLinesRange: [minLines, maxLines], 
  strokeWidthRange: [minWidth, maxWidth],
  scaleRange: [minScale, maxScale],
  angleRange: [minAngle, maxAngle],
  onChange,
  selectedColor
}: AppPatternPickerProps) {
 
  const update = (p: Partial<PatternTS>) => {
    onChange({ ...value, ...p })
  }

  const angleRatio: number = 180 / Math.PI

  return <AppAsideElementWrapper label="Pattern">
    <AppSelect
      label='Type' className='mb-2'
      value={value.type} options={patternTypes.map(([t, label]) => [t, label])}
      onChange={type => update({ type: Number(type) as HexmapPatternType })}
    />
    <AppSlider
      label='Number of lines' className='m-1'
      value={value.nofLines} min={minLines} max={maxLines} step={1} 
      onChange={nofLines => update({ nofLines })}
    />
    <AppSlider
      label='Line width' className='m-1'
      value={value.strokeWidth} min={minWidth} max={maxWidth} step={0.1} 
      onChange={strokeWidth => update({ strokeWidth })}
    />
    <AppSlider
      label='Scale' className='m-1'
      value={value.scale} min={minScale} max={maxScale} step={0.01} 
      onChange={scale => update({ scale })}
    />
    <AppSlider
      label='Angle' className='m-1'
      value={value.angle * angleRatio} min={minAngle * angleRatio} max={maxAngle * angleRatio} step={5} 
      onChange={angle => update({ angle: angle/angleRatio })}
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