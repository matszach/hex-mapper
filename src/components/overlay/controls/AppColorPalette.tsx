import { useState } from 'react'
import './AppColorPalette.scss'

export interface AppColorPaletteProps {
  className?: string,
  palette: string[],
  onEdit: (palette: string[]) => void
  value: string,
  onChange: (value: string) => void
}

export default function AppColorPalette({ className, palette: palette, onEdit, value, onChange }: AppColorPaletteProps) {
  const [localPalette, setLocalPalette] = useState(palette)
  const [index, setIndex] = useState(localPalette.indexOf(value) ?? 0)
  
  const colorChange = (i: number) => {
    setIndex(i)
    onChange(localPalette[i])
  }

  // const colorUpdate = (i: number, color: string) => {
  //   const newPalette = [...localPalette]
  //   newPalette[i] = color
  //   setLocalPalette(newPalette)
  // }

  return (
    <div className={`AppColorPalette ${className}`}>
      <div className="AppColorPalette__palette">
        <label className="AppColorPalette__palette__label">Color</label>
        {localPalette.map((color, i) => (
          <div
            key={i}
            className={`AppColorPalette__palette__color ${i === index ? 'AppColorPalette__palette__color--selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => colorChange(i)}
          />
        ))}
      </div>
      {/* TODO */}
      {/* <Form.Control 
        type="color" 
        value={localPalette[index]}
        onChange={e => 
          colorUpdate(index, e.target.value)
        } 
        onBlur={e => {
          onEdit(localPalette)
          onChange(e.target.value)
        }}
      /> */}
    </div>
  )
}