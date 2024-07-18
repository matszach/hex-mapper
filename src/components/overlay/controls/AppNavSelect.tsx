import { useState } from 'react'
import './AppNavSelect.scss'

export interface AppNavSelectProps {
  label: string
  value: any
  options: [any, string][]
  onChange: (value: any) => void
}

export default function AppNavSelect({ label, value, options, onChange }: AppNavSelectProps) {
  const [open, setOpen] = useState(false)
  const displayed = options.find(o => o[0] === value)?.[1]
  return (
    <span className='AppNavSelect' onClick={() => setOpen(!open)}>
      {label}: {displayed}
      <span className={`AppNavSelect__dropdown ${open ? 'AppNavSelect__dropdown--open' : ''}`}>
        {options.map(([o, text]) => <div 
          className='AppNavSelect__dropdown__item' 
          key={o} onClick={() => onChange(o)}
        >{text}</div>)}
      </span>
    </span>
  )                                                                             
}