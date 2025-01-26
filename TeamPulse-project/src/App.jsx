import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PayrollTable from './Components/PayrollTable';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <PayrollTable />
    </Elements>
  );
}

export default App;
