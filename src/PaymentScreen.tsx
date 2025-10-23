import React from 'react';
import {useColorScheme} from 'react-native';
import {useCheckout, type sessionParams} from 'dodopayments-react-native-sdk';
import fetchPaymentParams from './utils/fetchPaymentParams';
import PaymentContent from './Components/PaymentContent';

const PaymentScreen = () => {
  const {initPaymentSession, presentPaymentSheet} = useCheckout();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = React.useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const handleContinue = () => {
    setShowSuccessScreen(false);
    setError('');
  };

  const processPayment = async () => {
    setLoading(true);
    setError('');

    try {
      const key = await fetchPaymentParams();
      const paymentSheetParamsResult = await initPaymentSession({
        clientSecret: key.clientSecret,
      });

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
          mode: 'test',
        },
      };

      const paymentSheetResponse = await presentPaymentSheet(params);

      switch (paymentSheetResponse?.status) {
        case 'cancelled':
          setError('Payment cancelled by user.');
          break;
        case 'succeeded':
          setShowSuccessScreen(true);
          break;
        case 'failed':
          setError('Payment failed: ' + paymentSheetResponse?.message);
          break;
        default:
          setError(paymentSheetResponse?.message || 'Unknown error');
      }
    } catch (err) {
      setError('Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContent
      onCheckoutPress={processPayment}
      loading={loading}
      error={error}
      showSuccessScreen={showSuccessScreen}
      onContinue={handleContinue}
    />
  );
};

export default PaymentScreen;
