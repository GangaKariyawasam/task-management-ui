// index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/reset.css';

// Ensure 'root' is found and create the React root element
const rootElement = document.getElementById('root') as HTMLElement;

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
