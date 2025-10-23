const express = require('express');
const cors = require('cors');
require('dotenv').config({path: './.env'});

const app = express();
const PORT = 5252;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('./dist'));

// Create payment intent for SDK flow
async function createPaymentIntent() {
  const apiResponse = await fetch('https://test.dodopayments.com/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DODOPAYMENTS_TEST_API_KEY}`,
    },
    body: JSON.stringify({
      billing: {
        city: 'San Francisco',
        country: 'US',
        state: 'California',
        street: '123 Market Street',
        zipcode: '94107',
      },
      customer: {
        email: 'test@test.com',
        name: 'Test User',
      },
      product_cart: [
        {
          product_id: process.env.DODO_PRODUCT_ID,
          quantity: 1,
        },
      ],
    }),
  });

  const paymentIntent = await apiResponse.json();

  if (paymentIntent.error) {
    throw new Error(paymentIntent.error.message || 'Payment intent creation failed');
  }

  return paymentIntent;
}

// Generate payment URL for InAppBrowser flow
function getPaymentUrl() {
  const productId = process.env.DODO_PRODUCT_ID;
  const returnUrl = encodeURIComponent('dodopaymentapp://payment-status?status=succeeded');
  return `https://test.checkout.dodopayments.com/buy/${productId}?quantity=1&return_url=${returnUrl}`;
}

// Main endpoint - returns data for both SDK and InAppBrowser flows
app.get('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await createPaymentIntent();
    const paymentUrl = getPaymentUrl();

    res.send({
      publishableKey: process.env.DODO_PUBLISHABLE_KEY,
      clientSecret: paymentIntent.client_secret,
      paymentUrl: paymentUrl,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).send({
      error: {message: error.message},
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
