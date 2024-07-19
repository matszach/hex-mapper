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
        <Rect
          x={0} y={0}
          width={size.width} height={size.height}
          fill={'#f4f4f4'}
        />
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