import { Stage, Layer } from 'react-konva';
import './CanvasComponent.scss';
import HexField from './canvas-elements/HexField';
import { useWindowSize } from 'usehooks-ts';
import { gridCoords } from '../../utils/calc.utils';

export default function CanvasComponent() {
  const size = useWindowSize()
  return (
    <Stage
      width={size.width}
      height={size.height}
    >
      <Layer>
        {gridCoords(10, 10).map(([x, y]) => <HexField key={`${x}-${y}`} pos={[x, y]} />)}
      </Layer>
    </Stage>
  )
}