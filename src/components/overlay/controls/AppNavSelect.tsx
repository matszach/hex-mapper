import AppNavDropdown from './AppNavDropdown'

export interface AppNavSelectProps {
  label: string
  value: any
  options: [any, string][]
  onChange: (value: any) => void
}

export default function AppNavSelect({ label, value, options, onChange }: AppNavSelectProps) {
  const displayed = options.find(o => o[0] === value)?.[1]
  return <AppNavDropdown
    label={`${label}: ${displayed}`}
    options={options}
    onChoice={onChange}
  />                                                                       
}