import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter';
import Tagtics from 'tagtics-client'; // Import it

// Initialize Tagtics here
Tagtics.init({
  apiKey: 'TEST_KEY',
  excludePaths: ['.*'],  // Show everywhere
  privacyNotice: 'Custom privacy notice for testing',
  serializeChildDepth: 2,
  allowSensitivePages: true,  // Test on all pages
});

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  );
}