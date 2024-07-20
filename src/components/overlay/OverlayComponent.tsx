import './OverlayComponent.scss';
import { ASIDE_WIDTH, NAV_HEIGHT } from '../../const/sizes';
import { useContext } from 'react';
import { AppContext } from '../../app-state/app-state.model';
import AppColorPalette from './controls/AppColorPalette';
import { BrushType } from '../../app-state/brush.model';
import AppNavButton from './controls/AppNavButton';
import { usePreloadIcons } from '../../hooks/use-icon';
import { printMap } from '../../utils/print.utils';
import AppNavSelect from './controls/AppNavSelect';
import AppNavDropdown from './controls/AppNavDropdown';
import AppIconPicker from './controls/AppIconPicker';
import { ALLOWED_BRUSH_SIZES, ALLOWED_MAP_RESOLUTIONS, fetchIconKeys } from '../../const/config';
import { usePromise } from '../../hooks/use-promise';

export default function OverlayComponent() {
  
  const { brush, updateBrush, undoHistory, palette, updatePalette, printRef, newMap } = useContext(AppContext)
  usePreloadIcons(brush)
  const [iconKeys] = usePromise(() => fetchIconKeys(), [])

  return (
    <div className='Overlay'>
      <nav className='Overlay__nav' style={{ width: '100vw', height: NAV_HEIGHT }}>
        <AppNavDropdown
          label='New' onChoice={([x, y]) => newMap(x, y)}
          options={ALLOWED_MAP_RESOLUTIONS.map(n => [n, `${n[0]}x${n[1]}`])}
        />
        <AppNavButton label='Undo' onClick={undoHistory}/>
        <AppNavButton label='Redo (WIP)' onClick={() => {}}/>
        <AppNavButton label='Export (WIP)' onClick={() => printMap(printRef)}/>
        <AppNavSelect 
          label='Brush size' value={brush.size} onChange={size => updateBrush({ size })}
          options={ALLOWED_BRUSH_SIZES.map(n => [n, `${n}x${n}`])} 
        />
        <AppNavSelect
          label='Tool' value={brush.type} onChange={type => updateBrush({ type })}
          options={[
            [BrushType.FILL, 'Fill'],
            [BrushType.ICON, 'Icon (WIP)'],
            [BrushType.PATTERN, 'Pattern (WIP)'],
            [BrushType.LINE, 'Line (WIP)'],
            [BrushType.TEXT, 'Text (WIP)']
          ]}
        />
      </nav>
      <aside className='Overlay__aside' style={{ width: ASIDE_WIDTH, height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        <div className='Overlay__aside__inset'>
          <AppColorPalette
            palette={palette} onEdit={updatePalette}
            value={brush.color} onChange={color => updateBrush({ color })}
          />
          {/* content to depend on brush type */}
          {brush.type === BrushType.ICON && (
            <AppIconPicker 
              value={brush.key ?? ''} iconKeys={iconKeys} color={brush.color}
              onChange={key => updateBrush({ key })}
            />
          )}
        </div>
      </aside>
    </div>
  )
}