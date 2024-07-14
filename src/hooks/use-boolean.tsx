import { useState } from "react";

export function useBoolean(initial: boolean = false): [boolean, () => void, () => void] {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(!value);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  return [value, setTrue, setFalse];
}