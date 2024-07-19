import AppAsideElementWrapper from './AppAsideElementWrapper'
import './AppIconPicker.scss'

export interface AppIconPickerProps {
  value?: string
  onChange: (value: string) => void
}

export default function AppIconPicker({ value, onChange }: AppIconPickerProps) {
  return <AppAsideElementWrapper label='Icon'>
    <h1>Hello</h1>
  </AppAsideElementWrapper>
}