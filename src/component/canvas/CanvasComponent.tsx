import { Stage, Layer } from 'react-konva';
import './CanvasComponent.scss';
import Hex from './canvas-elements/Hex';

export default function CanvasComponent() {
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        <Hex
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          radius={100}
          stroke='blue'
          strokeWidth={5}
          fill='red'
        ></Hex>
      </Layer>
    </Stage>
  )
}