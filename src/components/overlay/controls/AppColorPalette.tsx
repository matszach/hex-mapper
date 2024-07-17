import { useState } from 'react'
import './AppColorPalette.scss'

export interface AppColorPaletteProps {
  className?: string,
  palette: string[],
  onEdit: (palette: string[]) => void
  value: string,
  onChange: (value: string) => void
}

export default function AppColorPalette({ className, palette, onEdit, value, onChange }: AppColorPaletteProps) {
  const [index, setIndex] = useState(palette.indexOf(value) ?? 0)
  const colorChange = (i: number) => {
    setIndex(i)
    onChange(palette[i])
  }
  return (
    <div className={`AppColorPalette ${className}`}>
      <div className="AppColorPalette__palette">
        {palette.map((color, i) => (
          <div
            key={i}
            className={`AppColorPalette__palette__color ${i === index ? 'AppColorPalette__palette__color--selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => colorChange(i)}
          />
        ))}
      </div> 
    </div>
  )
}