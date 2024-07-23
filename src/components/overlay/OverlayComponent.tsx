import './OverlayComponent.scss';
import { ASIDE_WIDTH, NAV_HEIGHT } from '../../const/sizes';
import { useContext } from 'react';
import { AppContext } from '../../app-state/app-state.model';
import AppColorPalette from './controls/AppColorPalette';
import { BrushType } from '../../app-state/brush.model';
import AppNavButton from './controls/AppNavButton';
import { usePreloadIcons } from '../../hooks/use-icon';
import { exportJson, exportPng } from '../../utils/export.utils';
import AppNavSelect from './controls/AppNavSelect';
import AppNavDropdown from './controls/AppNavDropdown';
import AppIconPicker from './controls/AppIconPicker';
import { ALLOWED_BRUSH_SIZES, ALLOWED_MAP_RESOLUTIONS, fetchIconKeys } from '../../const/config';
import { usePromise } from '../../hooks/use-promise';
import AppPatternPicker from './controls/AppPatternPicker';
import { HexmapPatternType } from '../../app-state/hexmap.model';

export default function OverlayComponent() {
  
  const { brush, updateBrush, undoHistory, palette, updatePalette, printRef, map, newMap } = useContext(AppContext)
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
        <AppNavDropdown
          label='Export as'
          options={[
            [1, 'PNG (WIP)', () => exportPng(printRef)],
            [2, 'JSON', () => exportJson(map)],
          ]}
        />
        <AppNavSelect 
          label='Brush size' value={brush.size} onChange={size => updateBrush({ size })}
          options={ALLOWED_BRUSH_SIZES.map(n => [n, `${n}x${n}`])} 
        />
        <AppNavSelect
          label='Tool' value={brush.type} onChange={type => updateBrush({ type })}
          options={[
            [BrushType.FILL, 'Fill'],
            [BrushType.ICON, 'Icon'],
            [BrushType.PATTERN, 'Pattern'],
            [BrushType.LINE, 'Line (WIP)'],
            [BrushType.TEXT, 'Text (WIP)']
          ]}
        />
        {/* BUTTON TO REALIGN CANVAS / RETURN SCALE TO 1/1 */}
      </nav>
      <aside className='Overlay__aside' style={{ width: ASIDE_WIDTH, height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        <div className='Overlay__aside__inset'>
          <AppColorPalette
            palette={palette} onPaletteChange={updatePalette}
            color={brush.color}  onColorChange={color => updateBrush({ color })}
            colorVariety={brush.colorVariety} onColorVarietyChange={colorVariety => updateBrush({ colorVariety })}
          />
          {/* content to depend on brush type */}
          {brush.type === BrushType.ICON && (
            <AppIconPicker
              value={brush.iconKey} iconKeys={iconKeys}
              onChange={key => updateBrush({ iconKey: key })}
            />
          )}
          {brush.type === BrushType.PATTERN && (
            <AppPatternPicker 
              value={brush.patternData}
              selectedColor={brush.color}
              patternTypes={[
                [HexmapPatternType.HATCH, "Hatch"],
                [HexmapPatternType.CROSSHATCH, "Crosshatch"],
                [HexmapPatternType.ZIGZAG, "Zigzag"]
              ]}
              nofLinesRange={[1, 15]}
              strokeWidthRange={[0.2, 7]}
              scaleRange={[0.1, 2]}
              angleRange={[-Math.PI, Math.PI]}
              onChange={patternData => updateBrush({ patternData })}
            />
          )}
          {/* TODO LINE will have a toggle to snap to grid or not */}
        </div>
      </aside>
    </div>
  )
}