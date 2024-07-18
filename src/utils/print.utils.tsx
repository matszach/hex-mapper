export function printMap(printLayerRef: any): void {
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