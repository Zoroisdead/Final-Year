const stripe = require('stripe')(process.env.sk_test_51QgkdHQTmJEHFoWL07zRHPE4SUQpUppL2yJzkZb9eAtYaDmSvIp6Zb4OXGeOHzwqcDYT61xdgxUeHVqe43o0WiJB00x2P6AzOr);

// Exchange rate and minimum amount setup
const minimumAmountInUSD = 0.50; // Minimum amount in USD
const exchangeRate = 0.0076; // Example conversion rate (1 NPR = 0.0076 USD)

// Calculate the minimum amount in NPR
const minimumAmountInNPR = minimumAmountInUSD / exchangeRate;

const createPaymentIntent = async (paymentMethodId, amountInNPR) => {
  try {
    // Validate if the amount in NPR is sufficient
    if (amountInNPR < minimumAmountInNPR) {
      throw new Error(`Amount must be at least ${Math.ceil(minimumAmountInNPR)} NPR, which converts to at least 50 cents USD.`);
    }

    // Proceed with creating the PaymentIntent if the amount is valid
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInNPR * 100, // Convert to cents
      currency: 'NPR', // Use the correct currency
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    return paymentIntent;
  } catch (error) {
    throw error;
  }
};

module.exports = { createPaymentIntent };
