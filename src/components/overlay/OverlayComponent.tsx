import { FloatingLabel, Form } from 'react-bootstrap';
import { ASIDE_WIDTH, NAV_HEIGHT } from '../../const/sizes';
import './OverlayComponent.scss';
import { useContext } from 'react';
import { AppContext } from '../../app-state/app-state.model';

export default function OverlayComponent() {
  const { brush, updateBrush } = useContext(AppContext);
  return (
    <div className="Overlay">
      <nav className="Overlay__nav" style={{ width: '100vw', height: NAV_HEIGHT }}>
        
      </nav>
      <aside className="Overlay__aside" style={{ width: ASIDE_WIDTH, height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        <FloatingLabel label="Brush size">
          <Form.Select value={brush.size} onChange={e => updateBrush({ size: Number(e.target.value) })}>
            {[1, 3, 5, 7, 9, 11, 13, 15].map(n => <option key={n} value={n}>{n}</option>)}
          </Form.Select>
        </FloatingLabel>
      </aside>
    </div>
  );
}