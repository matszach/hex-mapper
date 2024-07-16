import { FloatingLabel, Form } from "react-bootstrap";

export interface AppSelectProps {
  label: string
  value: string | number
  options: (string | number)[]
  onChange: (value: string | number) => void
}

export default function AppSelect({ label, value, options, onChange }: AppSelectProps) {
  return (
    <FloatingLabel label={label}>
      <Form.Select value={value} onChange={e => onChange(e.target.value) }>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </Form.Select>
    </FloatingLabel>
  )
}