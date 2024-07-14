import React from 'react';
import './App.scss';
import CanvasComponent from './components/canvas/CanvasComponent';

export default function App() {
  return (
    <div className="App">
      {/* warn that it may not work on mobile (but let proceed) */}
      {/* nav, float */}
      {/* options as sidebars */}
      <CanvasComponent></CanvasComponent>
    </div>
  );
}
