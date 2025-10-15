// PaymentScreen.ts

import React from 'react';
import {ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {useCheckout, type sessionParams} from 'dodopayments-react-native-sdk';
import fetchPaymentParams from './utils/fetchPaymentParams';
import Banner from './Components/Banner';
import ProductItem from './Components/ProductItem';
import OrderSummary from './Components/OrderSummary';
import PolicyInfo from './Components/PolicyInfo';
import PaymentButtons from './Components/PaymentButtons';
import PaymentSuccessScreen from './Components/PaymentSuccessScreen';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Enterprise Plan - Annual Subscription',
    size: 'Enterprise',
    price: 299.99,
    quantity: 1,
    image: require('./assets/placeholder.webp'),
  },
  {
    id: '2',
    name: 'Team Plan - Monthly Subscription',
    size: 'Team',
    price: 149.99,
    quantity: 5,
    image: require('./assets/placeholder2.png'),
  },
];

const PaymentScreen = () => {
  const {initPaymentSession, presentPaymentSheet} = useCheckout();
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = React.useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const styles = isDarkMode ? darkStyles : lightStyles;

  // Calculate totals
  const subtotal = MOCK_PRODUCTS.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
  const shipping = 0; 
  const taxes = 12.0;
  const otherFees = 0.0;
  const total = subtotal + shipping + taxes + otherFees;

  const handleContinue = () => {
    setShowSuccessScreen(false);
    setError('');
    setMessage('');
  };

  const processPayment = async () => {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Fetch client secret and initialize payment session
      const key = await fetchPaymentParams();
      const paymentSheetParamsResult = await initPaymentSession({
        clientSecret: key.clientSecret,
      });

      // Present payment sheet
      const params: sessionParams = {
        ...(paymentSheetParamsResult as sessionParams),
        configuration: {
          appearance: {
            themes: isDarkMode ? 'dark' : 'light',
            primaryButton: {
              colors: {
                light: {
                  background: 'green',
                  componentBorder: 'green',
                  placeholderText: 'yellow',
                },
                dark: {
                  background: 'green',
                  componentBorder: 'green',
                  placeholderText: 'yellow',
                },
              },
              shapes: {
                borderRadius: 30,
                borderWidth: 3,
              },
            },
          },
          mode: 'test', // DEFAULTS TO TEST MODE
        },
      };

      const paymentSheetResponse = await presentPaymentSheet(params);

      switch (paymentSheetResponse?.status) {
        case 'cancelled':
          setError('Payment cancelled by user.');
          break;
        case 'succeeded':
          setMessage('');
          setShowSuccessScreen(true);
          break;
        case 'failed':
          setError('Payment failed : \n' + paymentSheetResponse?.message);
          break;
        default:
          setError(paymentSheetResponse?.message);
          setMessage('');
      }
    } catch (err) {
      setError('Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <Banner />

      <ScrollView
        style={defaultStyles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={defaultStyles.scrollContent}>
        {/* Product Items */}
        <View style={defaultStyles.section}>
          {MOCK_PRODUCTS.map(product => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              size={product.size}
              price={product.price}
              quantity={product.quantity}
              image={product.image}
            />
          ))}
        </View>

        {/* Order Summary */}
        <View style={defaultStyles.section}>
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            taxes={taxes}
            otherFees={otherFees}
            total={total}
          />
        </View>

        {/* Policy Information */}
        <View style={defaultStyles.section}>
          <PolicyInfo />
        </View>

        {/* Payment Buttons */}
        <View style={defaultStyles.section}>
          <PaymentButtons onCheckoutPress={processPayment} loading={loading} />
        </View>

        {/* Status Messages */}
        {message ? (
          <Text style={[defaultStyles.messageText, styles.messageText]}>
            {message}
          </Text>
        ) : null}

        {error ? (
          <Text style={[defaultStyles.errorText, styles.errorText]}>
            {error}
          </Text>
        ) : null}
      </ScrollView>

      {/* Success Screen */}
      {showSuccessScreen && (
        <PaymentSuccessScreen
          amount={total}
          onContinue={handleContinue}
        />
      )}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '500',
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  messageText: {
    color: '#28a745',
  },
  errorText: {
    color: '#dc3545',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
  },
  messageText: {
    color: '#28a745',
  },
  errorText: {
    color: '#dc3545',
  },
});

export default PaymentScreen;
