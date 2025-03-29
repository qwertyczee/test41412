import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind directives should be imported here or in App.js
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> // StrictMode can cause double renders in dev, temporarily remove if causing issues with effects
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
