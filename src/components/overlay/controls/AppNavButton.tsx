import './AppNavButton.scss'

export default function AppNavButton({ children, onClick }: { children: any, onClick: () => void }) {
  return (
    <span className='AppNavButton' onClick={onClick}>
      {children}
    </span>
  )
}