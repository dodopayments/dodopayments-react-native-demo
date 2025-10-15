const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.static('./dist'));
app.use(express.json());

require('dotenv').config({path: './.env'});

const PORT = 5252;

async function createPaymentIntent(request) {
  try {
    const url = 'https://test.dodopayments.com';
    const apiResponse = await fetch(`${url}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
          email: 'tes34t@test.com',
          name: 'Test User',
        },
        product_cart: [
          {
            product_id: process.env.DODO_PRODUCT_ID || 'your_product_id_here', // Get from: https://app.dodopayments.com/products
            quantity: 1,
          },
        ],
      }),
    });


    const paymentIntent = await apiResponse.json();

    console.log(paymentIntent);

    if (paymentIntent.error) {
      console.error('Error - ', paymentIntent.error);
      throw new Error(paymentIntent.error.message ?? 'Something went wrong.');
    }

    return {paymentIntent};
  } catch (error) {
    console.error('Failed to create payment intent:', error);
    throw new Error(
      error.message ||
        'Unexpected error occurred while creating payment intent.',
    );
  }
}

app.get('/create-payment-intent', async (req, res) => {
  try {
    var {paymentIntent} = await createPaymentIntent();

    res.send({
      publishableKey: process.env.DODO_PUBLISHABLE_KEY || 'your_publishable_key_here',
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);

    return res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
