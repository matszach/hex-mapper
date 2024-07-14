import { Stage, Layer } from 'react-konva';
import './CanvasComponent.scss';
import HexField from './canvas-elements/HexField';
import { useWindowSize } from 'usehooks-ts';
import { useZoom } from '../../hooks/use-zoom';
import Konva from 'konva';
import { useContext } from 'react';
import { GlobalContext } from '../../global-state/global-state.model';

Konva.dragButtons = [2]

export default function CanvasComponent() {
  const size = useWindowSize()
  const [zoom, setZoom] = useZoom({ rate: 1.2 })
  const { state } = useContext(GlobalContext)
  return (
    <Stage
      width={size.width} height={size.height} 
      onWheel={setZoom} scale={zoom}
      draggable
      onContextMenu={e => e.evt.preventDefault()}
    >
      <Layer> 
        {state?.hexmap?.fields.map(({ x, y }) => <HexField key={`${x}-${y}`} pos={[x, y]} />)}
      </Layer>
    </Stage>
  )
}