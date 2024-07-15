import { ASIDE_WIDTH, NAV_HEIGHT } from '../../const/sizes';
import './OverlayComponent.scss';

export default function OverlayComponent() {
  return (
    <div className="Overlay">
      <nav className="Overlay__nav" style={{ width: '100vw', height: NAV_HEIGHT }}>
        nav
      </nav>
      <aside className="Overlay__aside" style={{ width: ASIDE_WIDTH, height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        aside
      </aside>
    </div>
  );
}