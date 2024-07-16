import './MobileWarnComponent.scss'
import { Button } from "react-bootstrap"

export default function MobileWarnComponent({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className="MobileWarn">
      <p>Mobile not supported :(</p>
      <Button onClick={onConfirm}>Proceed anyway</Button>
    </div>
  )
}