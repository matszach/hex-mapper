import React from 'react';
import './App.scss';
import CanvasComponent from './components/canvas/CanvasComponent';
import OverlayComponent from './components/overlay/OverlayComponent';

export default function App() {
  return (
    <div className="App">
      {/* warn that it may not work on mobile (but let proceed) */}
      <OverlayComponent></OverlayComponent>
      <CanvasComponent></CanvasComponent>
    </div>
  );
}
