import { ASIDE_WIDTH, NAV_HEIGHT } from '../../const/sizes';
import './OverlayComponent.scss';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../app-state/app-state.model';
import AppSelect from './controls/AppSelect';
import AppColorPalette from './controls/AppColorPalette';
import { BrushType } from '../../app-state/brush.model';
import AppNavButton from './controls/AppNavButton';
import { preloadIcon } from '../../hooks/use-icon';
import { printMap } from '../../utils/print.utils';
import AppNavSelect from './controls/AppNavSelect';
import AppNavDropdown from './controls/AppNavDropdown';

export default function OverlayComponent() {
  const { brush, updateBrush, undoHistory, palette, updatePalette, printRef, newMap } = useContext(AppContext)

  useEffect(() => {
    if (brush.type === BrushType.ICON && brush.key) {
      preloadIcon(brush.key, brush.color)
    }
  }, [brush.type, brush.key, brush.color])

  return (
    <div className='Overlay'>
      <nav className='Overlay__nav' style={{ width: '100vw', height: NAV_HEIGHT }}>
        <AppNavDropdown
          label='New' onChoice={([x, y]) => newMap(x, y)}
          options={[[30, 20], [40, 25], [50, 30], [60, 35], [70, 40]].map(n => [n, `${n[0]}x${n[1]}`])}
        />
        <AppNavButton label='Undo' onClick={undoHistory}/>
        <AppNavButton label='Redo (WIP)' onClick={() => {}}/>
        <AppNavButton label='Export (WIP)' onClick={() => printMap(printRef)}/>
        <AppNavSelect 
          label='Brush size' value={brush.size} onChange={size => updateBrush({ size })}
          options={[1, 3, 5, 7, 9, 11, 13, 15].map(n => [n, `${n}x${n}`])} 
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
            className='mb-2'
            palette={palette}
            onEdit={updatePalette}
            value={brush.color}
            onChange={e => updateBrush({ color: e })}
          />
          {/* content to depend on brush type */}
        </div>
      </aside>
    </div>
  )
}