export function printMap(printLayerRef: any): void {
  const uri = printLayerRef.toDataURL()
  const link = document.createElement('a');
  link.download = 'map.png'
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}