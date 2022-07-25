import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '@propelauth/react';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider authUrl={process.env.REACT_APP_PROPELAUTH_URL}>
    <App />
  </AuthProvider>
);
