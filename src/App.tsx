import './App.scss';
import CanvasComponent from './components/canvas/CanvasComponent';
import OverlayComponent from './components/overlay/OverlayComponent';
import MobileWarnComponent from './components/mobile-warn/MobileWarnComponent';
import { useState } from 'react';
import { isMobile } from './utils/env.utils';

export default function App() {

  const [mobileConfirmed, setMobileConfirmed] = useState(false);

  if (isMobile() && !mobileConfirmed) {
    return <MobileWarnComponent onConfirm={() => setMobileConfirmed(true)}></MobileWarnComponent>
  }

  return (
    <div className="App">
      <OverlayComponent></OverlayComponent>
      <CanvasComponent></CanvasComponent>
    </div>
  );
}
