import { useEffect, useState } from 'react'
import './AppColorPalette.scss'
import { Form } from 'react-bootstrap'
import { useTimer } from '../../../hooks/use-timer'
import { areEqual } from '../../../utils/calc.utils'
import AppAsideElementWrapper from './AppAsideElementWrapper'

export interface AppColorPaletteProps {
  palette: string[],
  onEdit: (palette: string[]) => void
  value: string,
  onChange: (value: string) => void
}

export default function AppColorPalette({ palette, onEdit, value, onChange }: AppColorPaletteProps) {
  const [localPalette, setLocalPalette] = useState(palette)
  const [selectedIndex, setSelectedIndex] = useState(localPalette.indexOf(value) ?? 0)
  const timer = useTimer(100)

  const selectColor = (i: number) => {
    setSelectedIndex(i)
    onChange(localPalette[i])
  }

  const updateLocalPalette = (i: number, color: string) => {
    const newPalette = [...localPalette]
    newPalette[i] = color
    setLocalPalette(newPalette)
  }

  const emitPaletteUpdate = () => {
    if (!areEqual(palette, localPalette)) {
      onChange(localPalette[selectedIndex])
      onEdit(localPalette)
    }
  }

  // workaround for the "no event on mouse up on colorpicker" issue
  useEffect(emitPaletteUpdate, [timer])

  // return (
  //   <div className='AppColorPalette'>
  //     <div className="AppColorPalette__palette">
  //       <label className="AppColorPalette__palette__label">Color</label>
  //       {localPalette.map((color, i) => (
  //         <div
  //           key={i}
  //           className={`AppColorPalette__palette__color ${i === selectedIndex ? 'AppColorPalette__palette__color--selected' : ''}`}
  //           style={{ backgroundColor: color }}
  //           onClick={() => selectColor(i)}
  //         />
  //       ))}
  //       <Form.Control 
  //         className='w-100 mt-1'
  //         type="color" 
  //         value={localPalette[selectedIndex]}
  //         onChange={e => updateLocalPalette(selectedIndex, e.target.value)} 
  //         onBlur={emitPaletteUpdate}
  //       />
  //     </div>
  //   </div>
  // )
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
      className='w-100 mt-1'
      type="color" 
      value={localPalette[selectedIndex]}
      onChange={e => updateLocalPalette(selectedIndex, e.target.value)} 
      onBlur={emitPaletteUpdate}
    />
  </AppAsideElementWrapper>
}