import { Stage, Layer } from 'react-konva';
import './CanvasComponent.scss';
import HexField from './canvas-elements/HexField';
import { useWindowSize } from 'usehooks-ts';
import { gridCoords } from '../../utils/calc.utils';
import { useZoom } from '../../hooks/use-zoom';
import Konva from 'konva';

Konva.dragButtons = [2]

export default function CanvasComponent() {
  const size = useWindowSize()
  const [zoom, setZoom] = useZoom({ rate: 1.2 })
  return (
    <Stage
      width={size.width} height={size.height} 
      onWheel={setZoom} scale={zoom}
      draggable
      onContextMenu={e => e.evt.preventDefault()}
    >
      <Layer> 
        {gridCoords(50, 30).map(([x, y]) => <HexField key={`${x}-${y}`} pos={[x, y]} />)}
      </Layer>
    </Stage>
  )
}