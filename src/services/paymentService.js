import axios from "axios";

const createPaymentIntent = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/payments/create-payment-intent"); // Your backend endpoint
    return response.data;
  } catch (error) {
    console.error("Error creating payment intent", error);
    throw new Error("Failed to create payment intent.");
  }
};

export default {
  createPaymentIntent,
};
