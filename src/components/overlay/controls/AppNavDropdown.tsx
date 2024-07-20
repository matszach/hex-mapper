import { useState } from 'react'
import './AppNavDropdown.scss'
import { useBoolean } from 'usehooks-ts'

export interface AppNavDropdownProps {
  label?: string
  options: ([any, string] | [any, string, Function])[]
  onChoice?: (value: any) => void,
  children?: React.ReactNode
}

export default function AppNavDropdown({ label, options, onChoice, children }: AppNavDropdownProps) {
  // const [open, setOpen] = useState(false)
  const { value: open, setTrue, setFalse } = useBoolean(false)
  return (
    <span className='AppNavDropdown' onMouseEnter={setTrue} onMouseLeave={setFalse}>
      {label}{children}
      <span className={`AppNavDropdown__dropdown ${open ? 'AppNavDropdown__dropdown--open' : ''}`}>
        {options.map(([o, text, fn]) => <div 
          className='AppNavDropdown__dropdown__item' 
          key={o} onClick={() => {
            onChoice && onChoice(o)
            fn && fn()
            setFalse()
          }}
        >{text}</div>)}
      </span>
    </span>
  )                                                                             
}