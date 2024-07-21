import { FloatingLabel, Form } from "react-bootstrap";
import { clamp } from "../../../utils/calc.utils";

export interface AppInputBaseProps<T> {
  label: string
  value: T
  onChange: (value: T) => void
  className?: string
}

export interface AppSelectProps extends AppInputBaseProps<string | number> {
  options: (any | [any, any])[]
}

export function AppSelect({ label, value, options, onChange, className }: AppSelectProps) {
  return (
    <FloatingLabel label={label}>
      <Form.Select className={className} value={value} onChange={e => onChange(e.target.value) }>
        {options.map(([o1, o2]) => <option key={o1} value={o1}>{o2 ?? o1}</option>)}
      </Form.Select>
    </FloatingLabel>
  )
}

export interface AppNumberProps extends AppInputBaseProps<number> {
  min: number
  max: number
  step: number
}

export function AppNumber({ label, value, min, max, step, onChange, className }: AppNumberProps) {
  return (
    <FloatingLabel label={label}>
      <Form.Control
        type="number" value={value}
        min={min} max={max} step={step}
        className={className}
        onChange={e => onChange(clamp(Number(e.target.value), min, max))}
      />
    </FloatingLabel>
  )
}

