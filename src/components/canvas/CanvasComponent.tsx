import { Stage, Layer, Rect } from 'react-konva';
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

Konva.dragButtons = [2]

export default function CanvasComponent() {
  const size = useWindowSize()
  const c = useContext(AppContext)
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      c.setPrintRef(ref.current)
    }
  }, [ref])

  return (
    <Stage
      width={size.width} height={size.height} 
      onWheel={c.handleZoom}
      onContextMenu={prevent}
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
        ref={ref}
      > 
        {/* Optimize not to draw hexes that would be out of bounds (based od screen size, scale and drag) */}
        {c.map?.fields.map(row => (
          row.map(field => (
            <HexField key={`${field.x}-${field.y}`} {...field} />
          ))
        ))}
        <ToolIndicator/>
      </Layer>
    </Stage>
  )
}