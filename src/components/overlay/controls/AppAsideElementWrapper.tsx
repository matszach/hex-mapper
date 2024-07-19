import './AppAsideElementWrapper.scss'

export interface AppAsideElementWrapperProps {
  label?: string,
  children?: React.ReactNode
}

export default function AppAsideElementWrapper({ label, children }: AppAsideElementWrapperProps) {
  return (
    <div className="AppAsideElementWrapper">
      <div className="AppAsideElementWrapper__inside">
        <label className="AppAsideElementWrapper__label">{label}</label>
        {children}
      </div>
    </div>
  )
}