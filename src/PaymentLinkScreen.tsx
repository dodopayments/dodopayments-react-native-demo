import React, {useEffect} from 'react';
import {Alert, Linking} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import fetchPaymentParams from './utils/fetchPaymentParams';
import PaymentContent from './Components/PaymentContent';

const PaymentLinkScreen = () => {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = React.useState(false);

  // Handle deep link callbacks for payment status
  useEffect(() => {
    const handleDeepLink = (url: string) => {
      if (url.includes('payment-status')) {
        const status = url.includes('status=succeeded');
        status ? setShowSuccessScreen(true) : setError('Payment cancelled');
      }
    };

    const subscription = Linking.addEventListener('url', ({url}) =>
      handleDeepLink(url),
    );
    Linking.getInitialURL().then(url => url && handleDeepLink(url));

    return () => subscription?.remove();
  }, []);

  const handleContinue = () => {
    setShowSuccessScreen(false);
    setError('');
  };

  const openPaymentLink = async () => {
    setLoading(true);
    setError('');

    try {
      const {paymentUrl} = await fetchPaymentParams();

      if (!paymentUrl) {
        throw new Error('Payment URL not available');
      }

      await InAppBrowser.open(paymentUrl, {
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#453AA4',
        preferredControlTintColor: 'white',
        animated: true,
        modalPresentationStyle: 'fullScreen',
        showTitle: true,
        toolbarColor: '#453AA4',
        enableUrlBarHiding: true,
        enableDefaultShare: false,
      });
    } catch (err) {
      Alert.alert('Error', 'Failed to open payment page');
      setError('Failed to open payment page');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContent
      onCheckoutPress={openPaymentLink}
      loading={loading}
      error={error}
      showSuccessScreen={showSuccessScreen}
      onContinue={handleContinue}
    />
  );
};

export default PaymentLinkScreen;
