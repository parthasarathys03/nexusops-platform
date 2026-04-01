import React from 'react';
import ReactDOM from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import App from './App';
import './styles/tokens.css';
import './styles/globals.css';
import './styles/animations.css';

config.autoAddCss = false;
library.add(fas, far);

// Light mode is the primary experience — dark class NOT set by default.
// Theme toggle in App.jsx manages the 'dark' class via localStorage.
const saved = localStorage.getItem('sentra-theme');
if (saved === 'dark') {
  document.documentElement.classList.add('dark');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
