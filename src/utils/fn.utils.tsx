export function callDefined(...fns: Function[]) {
  return fns.filter(fn => fn).map(fn => fn())
}