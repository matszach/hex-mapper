import { Stage, Layer, Group } from 'react-konva';
import './CanvasComponent.scss';
import HexField from './canvas-elements/HexField';
import { useWindowSize } from 'usehooks-ts';
import Konva from 'konva';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../app-state/app-state.model';
import { prevent } from '../../utils/evt.utils';
import { STAGE_OFFSET } from '../../const/sizes';
import ToolIndicator from './canvas-elements/ToolIndicator';
import { Draw } from '../../draw/draw';
import Background from './canvas-elements/Background';
import { Vector2d } from 'konva/lib/types';

Konva.dragButtons = [2]

export default function CanvasComponent() {
  const size = useWindowSize()
  const c = useContext(AppContext)
  const mapLayerRef = useRef(null)

  const [relativeMousePos, setRelativeMousePos] = useState<Vector2d>({ x: 0, y: 0 })
  const [visibleMapRect, setVisibleMapRect] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const updateOnMouseMove = () => {
    // @ts-ignore
    setRelativeMousePos(mapLayerRef.current?.getRelativePointerPosition())
    // @ts-ignore
    setVisibleMapRect(mapLayerRef.current?.getClientRect())
  }

  // TODO remove when no longer needed
  useEffect(() => {
    if (mapLayerRef.current) {
      c.setPrintRef(mapLayerRef.current)
    }
  }, [mapLayerRef])

  return (
    <Stage
      width={size.width} height={size.height} 
      onWheel={c.handleZoom}
      onContextMenu={prevent}
      onMouseMove={updateOnMouseMove}
    >
      {/* Background */}
      <Layer>
        <Background size={size} />
      </Layer>
      {/* Map Layer */}
      <Layer
        offset={STAGE_OFFSET}
        draggable
        scale={c.zoom}
        onMouseEnter={e => Draw.onEnterCanvas(e, c)}
        onMouseLeave={e => Draw.onLeaveCanvas(e, c)}
        ref={mapLayerRef}
      > 
        {/* Optimize not to draw hexes that would be out of bounds (based od screen size, scale and drag) */}
        <Group>
          {c.map?.fields.map(row => (
            row.map(field => (
              <HexField key={`${field.x}-${field.y}`} {...field} />
            ))
          ))}
        </Group>
        <ToolIndicator mousePos={relativeMousePos}/>
      </Layer>
    </Stage>
  )
}