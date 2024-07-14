import { Stage, Layer } from 'react-konva';
import './CanvasComponent.scss';
import HexField from './canvas-elements/HexField';
import { useWindowSize } from 'usehooks-ts';

export default function CanvasComponent() {
  const size = useWindowSize()
  return (
    <Stage
      width={size.width}
      height={size.height}
    >
      <Layer offsetX={-size.width / 2} offsetY={-size.height / 2}>
        <HexField
          x={0}
          y={0}
        ></HexField>
      </Layer>
    </Stage>
  )
}