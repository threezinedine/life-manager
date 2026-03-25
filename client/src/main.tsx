import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './style.css';
import '@/features/language/i18n';
import { Toast } from '@/components/toast';
import App from './App';

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toast>
        <App />
      </Toast>
    </BrowserRouter>
  </StrictMode>
);
