import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import paymentService from '../services/paymentService';

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
      return;
    }

    try {
      const response = await paymentService.createPaymentIntent(token.id);
      const { clientSecret } = response.data;

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret);
      if (confirmError) {
        console.error(confirmError);
        alert(confirmError.message);
      } else if (paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
      }
    } catch (error) {
      console.error(error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Submit Payment'}
      </button>
    </form>
  );
};

export default PaymentForm;
