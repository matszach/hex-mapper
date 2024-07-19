import { toHsl } from '../../../utils/color.util'
import AppAsideElementWrapper from './AppAsideElementWrapper'
import './AppIconPicker.scss'

export interface AppIconPickerProps {
  value: string
  color: string
  onChange: (value: string) => void
  iconKeys: string[]
}

export default function AppIconPicker({ value, color, onChange, iconKeys }: AppIconPickerProps) {
  return <AppAsideElementWrapper label='Icon'>
    <div className="AppIconPicker__icons">
      {iconKeys.map(key => <div
        key={key}
        className={`AppIconPicker__icons__icon ${key === value ? 'AppIconPicker__icons__icon--selected' : ''}`}
        onClick={() => onChange(key)}
      >
        {color === '#000000' ? (
          <img className='AppIconPicker__icons__icon__image' src={`./icons/${key}.png`} style={{ filter: 'invert(100%)' }}/>
        ) : (
          <>
            <img className='AppIconPicker__icons__icon__image' src={`./icons/${key}.png`}/>
            <div className='AppIconPicker__icons__icon__mask' style={{ backgroundColor: color }}/>
          </>
        )}
      </div>)}
    </div>
  </AppAsideElementWrapper>
}