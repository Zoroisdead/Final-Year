import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserProvider from './UserContext'; // Importing the default export now

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> {/* Wrap App with the provider */}
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
