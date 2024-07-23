import { useEffect, useState } from 'react'
import './AppColorPalette.scss'
import { Form } from 'react-bootstrap'
import { useTimer } from '../../../hooks/use-timer'
import { areEqual } from '../../../utils/calc.utils'
import AppAsideElementWrapper from './AppAsideElementWrapper'
import { AppSlider } from './app-bootstrap-inputs'

export interface AppColorPaletteProps {
  palette: string[],
  color: string,
  colorVariety: number
  onPaletteChange: (values: string[]) => void
  onColorChange: (value: string) => void
  onColorVarietyChange: (value: number) => void
}

export default function AppColorPalette({ palette, color, colorVariety, onPaletteChange, onColorChange, onColorVarietyChange }: AppColorPaletteProps) {
  const [localPalette, setLocalPalette] = useState(palette)
  const [selectedIndex, setSelectedIndex] = useState(localPalette.indexOf(color) ?? 0)
  const timer = useTimer(100)

  const selectColor = (i: number) => {
    setSelectedIndex(i)
    onColorChange(localPalette[i])
  }

  const updateLocalPalette = (i: number, color: string) => {
    const newPalette = [...localPalette]
    newPalette[i] = color
    setLocalPalette(newPalette)
  }

  const emitPaletteUpdate = () => {
    if (!areEqual(palette, localPalette)) {
      onColorChange(localPalette[selectedIndex])
      onPaletteChange(localPalette)
    }
  }

  // workaround for the "no event on mouse up on colorpicker" issue
  useEffect(emitPaletteUpdate, [timer])

  return <AppAsideElementWrapper label='Color'>
    <div className="AppColorPalette__palette">
      {localPalette.map((color, i) => (
        <div
          key={i}
          className={`AppColorPalette__palette__color ${i === selectedIndex ? 'AppColorPalette__palette__color--selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => selectColor(i)}
        />
      ))}
    </div>
    <Form.Control 
      className='w-100 mt-3 mb-2'
      type="color" 
      value={localPalette[selectedIndex]}
      onChange={e => updateLocalPalette(selectedIndex, e.target.value)} 
      onBlur={emitPaletteUpdate}
    />
    <AppSlider
      label='Color Variety'
      value={colorVariety}
      min={0} max={100} step={1}
      onChange={onColorVarietyChange}
    ></AppSlider>
  </AppAsideElementWrapper>
}