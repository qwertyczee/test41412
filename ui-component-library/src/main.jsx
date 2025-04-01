import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// Import slick-carousel CSS files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Ensure the modal root element exists in the DOM
let modalRoot = document.getElementById('modal-root');
if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
}
