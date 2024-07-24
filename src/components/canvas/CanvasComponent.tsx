import { Stage, Layer, Group, Rect } from 'react-konva';
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
  const stageRef = useRef(null)
  const mapRef = useRef(null)

  const [relativeMousePos, setRelativeMousePos] = useState<Vector2d>({ x: 0, y: 0 })
  const [visibleRect, setVisibleRect] = useState({ x: 0, y: 0, width: 200, height: 200 })

  const updateOnMouseMove = () => {
    // @ts-ignore
    setRelativeMousePos(mapRef.current?.getRelativePointerPosition())
    // @ts-ignore
    const pos = mapRef.current?.getPosition() // 0,0 initiall, doesnt change on zoom, essentially this is the layters drag position ignoring offset
    // @ts-ignore
    const rect = mapRef.current?.getClientRect({ skipTransform: true })
  }

  // TODO remove when no longer needed
  useEffect(() => {
    if (mapRef.current) {
      c.setPrintRef(mapRef.current)
    }
  }, [mapRef])

  return (
    <Stage
      width={size.width} height={size.height} 
      onWheel={c.handleZoom}
      onContextMenu={prevent}
      onMouseMove={updateOnMouseMove}
      ref={stageRef}
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
        ref={mapRef}
      > 
        {/* Optimize not to draw hexes that would be out of bounds (based od screen size, scale and drag) */}
        <Group>
          {c.map?.fields.map(row => (
            row.map(field => (
              <HexField key={`${field.x}-${field.y}`} {...field} />
            ))
          ))}
        </Group>
        {/* <Rect
          x={visibleRect.x}
          y={visibleRect.y}
          width={visibleRect.width}
          height={visibleRect.height}
          fill='red'
          opacity={0.5}
        /> */}
        <ToolIndicator mousePos={relativeMousePos}/>
      </Layer>
    </Stage>
  )
}