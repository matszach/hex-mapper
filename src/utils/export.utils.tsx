import { Hexmap } from "../app-state/hexmap.model";

export function exportPng(printLayerRef: any): void {
  // THIS WILL PROBABLY NEED TO BE REDRAWN FROM STATE ONA A NEW CANVAS
  // THIS WILL ALSO ALLOW printRef TO BE REMOVED FROM STATE
  const uri = printLayerRef.toDataURL()
  const link = document.createElement('a');
  link.download = 'map.png'
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportJson(map: Hexmap): void {
  const blob = new Blob([JSON.stringify(map, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'map.json'
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}