import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import { createRoot } from 'react-dom/client';
import { showEasterEgg } from './utils/easterEgg';
import { App } from './App';

showEasterEgg();

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
}