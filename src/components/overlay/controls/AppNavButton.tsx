import './AppNavButton.scss'

export interface AppNavButtonProps {
  label: string
  onClick: () => void
}

export default function AppNavButton({ label, onClick }: AppNavButtonProps) {
  return (
    <span className='AppNavButton' onClick={onClick}>
      {label}
    </span>
  )
}