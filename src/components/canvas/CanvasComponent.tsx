import { Stage, Layer } from 'react-konva';
import './CanvasComponent.scss';
import HexField from './canvas-elements/HexField';
import { useWindowSize } from 'usehooks-ts';
import { useZoom } from '../../hooks/use-zoom';
import Konva from 'konva';
import { useContext } from 'react';
import { AppContext } from '../../app-state/app-state.model';
import { prevent } from '../../utils/evt.utils';
import { STAGE_OFFSET } from '../../const/sizes';
import ToolIndicator from './canvas-elements/ToolIndicator';

Konva.dragButtons = [2]

export default function CanvasComponent() {
  const size = useWindowSize()
  const { map, zoom, handleZoom } = useContext(AppContext)
  return (
    <Stage
      width={size.width} height={size.height} 
      onWheel={handleZoom} scale={zoom}
      draggable
      onContextMenu={prevent}
      offset={STAGE_OFFSET}
    >
      <Layer> 
        {map?.fields.map(row => (
          row.map(field => (
            <HexField key={`${field.x}-${field.y}`} {...field} />
          ))
        ))}
      </Layer>
      <Layer listening={false}>
        <ToolIndicator/>
      </Layer>
    </Stage>
  )
}