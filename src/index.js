import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import UserProvider from './UserContext';
const stripe = require('stripe')('sk_test_51QgkdHQTmJEHFoWL07zRHPE4SUQpUppL2yJzkZb9eAtYaDmSvIp6Zb4OXGeOHzwqcDYT61xdgxUeHVqe43o0WiJB00x2P6AzOr');
// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51QgkdHQTmJEHFoWLqgj5BU8AbyzLWdyzUscyNv5JUymkZkRvGMrkF3aobZsezgJE2Gj32f35Dpj7pfRctn9cDFw600HA50lH8X'); // Replace with your Stripe publishable key

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> {/* Wrap App with the provider */}
      <Elements stripe={stripePromise}> {/* Wrap your app with Elements */}
        <App />
      </Elements>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
