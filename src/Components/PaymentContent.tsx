import React from 'react';
import {ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';
import Banner from './Banner';
import ProductItem from './ProductItem';
import OrderSummary from './OrderSummary';
import PolicyInfo from './PolicyInfo';
import PaymentButtons from './PaymentButtons';
import PaymentSuccessScreen from './PaymentSuccessScreen';
import {MOCK_PRODUCTS, calculateTotals} from '../constants/mockData';

interface PaymentContentProps {
  onCheckoutPress: () => Promise<void>;
  loading: boolean;
  error: string;
  showSuccessScreen: boolean;
  onContinue: () => void;
}

const PaymentContent: React.FC<PaymentContentProps> = ({
  onCheckoutPress,
  loading,
  error,
  showSuccessScreen,
  onContinue,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = isDarkMode ? darkStyles : lightStyles;
  const {subtotal, shipping, taxes, otherFees, total} = calculateTotals();

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
          <PaymentButtons onCheckoutPress={onCheckoutPress} loading={loading} />
        </View>

        {/* Error Message */}
        {error ? (
          <Text style={[defaultStyles.errorText, styles.errorText]}>
            {error}
          </Text>
        ) : null}
      </ScrollView>

      {/* Success Screen */}
      {showSuccessScreen && (
        <PaymentSuccessScreen amount={total} onContinue={onContinue} />
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
  errorText: {
    color: '#dc3545',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
  },
  errorText: {
    color: '#dc3545',
  },
});

export default PaymentContent;

