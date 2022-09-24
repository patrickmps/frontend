import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './pages/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header title="USER APP"/>
    <App />
  </React.StrictMode>
);

