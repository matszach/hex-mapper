import { publicUrl } from '../../../utils/env.utils'
import AppAsideElementWrapper from './AppAsideElementWrapper'
import './AppIconPicker.scss'

export interface AppIconPickerProps {
  value: string
  onChange: (value: string) => void
  iconKeys: string[]
}

export default function AppIconPicker({ value, onChange, iconKeys }: AppIconPickerProps) {
  return <AppAsideElementWrapper label='Icon'>
    <div className="AppIconPicker__icons">
      {iconKeys.map(key => <div
        key={key}
        className={`AppIconPicker__icons__icon ${key === value ? 'AppIconPicker__icons__icon--selected' : ''}`}
        onClick={() => onChange(key)}
      >
        <img className='AppIconPicker__icons__icon__image' src={publicUrl(`icons/${key}.png`)} style={{ filter: 'invert(100%)' }}/>
        {/* {color === '#000000' ? (
          <img className='AppIconPicker__icons__icon__image' src={publicUrl(`icons/${key}.png`)} style={{ filter: 'invert(100%)' }}/>
        ) : (
          <>
            <img className='AppIconPicker__icons__icon__image' src={publicUrl(`icons/${key}.png`)}/>
            <div className='AppIconPicker__icons__icon__mask' style={{ backgroundColor: color }}/>
          </>
        )} */}
      </div>)}
    </div>
  </AppAsideElementWrapper>
}