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
        <AppNavButton label='Undo' onClick={undoHistory}/>
        <AppNavButton label='Export' onClick={() => printMap(printRef)}/>
        <AppNavSelect 
          label='Brush size' value={brush.size} onChange={size => updateBrush({ size })}
          options={[1, 3, 5, 7, 9, 11, 13, 15].map(n => [n, `${n}x${n}`])} 
        />
        <AppNavDropdown
          label='New' onChoice={([x, y]) => newMap(x, y)}
          options={[[30, 20], [40, 25], [50, 30], [60, 35], [70, 40]].map(n => [n, `${n[1]}x${n[0]}`])}
        />
      </nav>
      <aside className='Overlay__aside' style={{ width: ASIDE_WIDTH, height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        <div className='Overlay__aside__inset'>
          {/* TODO replace by radio button like ? */}
          <AppSelect
            className='mb-2' 
            label='Brush type' 
            value={BrushType[brush.type]} 
            options={['FILL', 'PATTERN', 'ICON', 'LINE', 'TEXT']} 
            onChange={e => updateBrush({ type: BrushType[e as keyof typeof BrushType] })} 
          />
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