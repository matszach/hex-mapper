import { useState } from 'react'
import './AppNavDropdown.scss'

export interface AppNavDropdownProps {
  label?: string
  options: [any, string][]
  onChoice: (value: any) => void,
  children?: React.ReactNode
}

export default function AppNavDropdown({ label, options, onChoice, children }: AppNavDropdownProps) {
  const [open, setOpen] = useState(false)
  return (
    <span className='AppNavDropdown' onClick={() => setOpen(!open)} onBlur={() => setOpen(false)}>
      {label}{children}
      <span className={`AppNavDropdown__dropdown ${open ? 'AppNavDropdown__dropdown--open' : ''}`}>
        {options.map(([o, text]) => <div 
          className='AppNavDropdown__dropdown__item' 
          key={o} onClick={() => onChoice(o)}
        >{text}</div>)}
      </span>
    </span>
  )                                                                             
}