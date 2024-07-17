import { ASIDE_WIDTH, NAV_HEIGHT } from '../../const/sizes';
import './OverlayComponent.scss';
import { useContext } from 'react';
import { AppContext } from '../../app-state/app-state.model';
import AppSelect from './controls/AppSelect';
import { Button } from 'react-bootstrap';
import AppColorPalette from './controls/AppColorPalette';
import { BrushType } from '../../app-state/brush.model';

export default function OverlayComponent() {
  const { brush, updateBrush, undoHistory, palette, updatePalette } = useContext(AppContext)
  return (
    <div className='Overlay'>
      <nav className='Overlay__nav' style={{ width: '100vw', height: NAV_HEIGHT }}>
        
      </nav>
      <aside className='Overlay__aside' style={{ width: ASIDE_WIDTH, height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        <div className='Overlay__aside__inset'>
          <AppColorPalette
            className='mb-2'
            palette={palette}
            onEdit={updatePalette}
            value={brush.color}
            onChange={e => updateBrush({ color: e })}
          />
          <AppSelect
            className='mb-2' 
            label='Brush type' 
            value={BrushType[brush.type]} 
            options={['FILL', 'PATTERN', 'ICON']} 
            onChange={e => updateBrush({ type: BrushType[e as keyof typeof BrushType] })} 
          />
          {/* to depend on brush type */}
          <AppSelect
            className='mb-2' 
            label='Brush size' 
            value={brush.size} 
            options={[1, 3, 5, 7, 9, 11, 13, 15]} 
            onChange={e => updateBrush({ size: Number(e) })} 
          />
          <Button onClick={undoHistory}>Undo</Button>
        </div>
      </aside>
    </div>
  )
}