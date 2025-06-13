import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  taxes: number;
  otherFees: number;
  total: number;
  onShippingPress?: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping,
  taxes,
  otherFees,
  total,
  onShippingPress,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = isDarkMode ? darkStyles : lightStyles;

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <View style={defaultStyles.row}>
        <Text style={[defaultStyles.label, styles.label]}>Subtotal</Text>
        <Text style={[defaultStyles.value, styles.value]}>
          {formatPrice(subtotal)}
        </Text>
      </View>

      <TouchableOpacity 
        style={defaultStyles.row}
        onPress={onShippingPress}
        disabled={!onShippingPress}
      >
        <View style={defaultStyles.shippingContainer}>
          <Text style={[defaultStyles.label, styles.label]}>Shipping</Text>
          <Text style={[defaultStyles.infoIcon, styles.infoIcon]}>?</Text>
        </View>
        <Text style={[defaultStyles.shippingText, styles.shippingText]}>
          {shipping === 0 ? 'Enter shipping address' : formatPrice(shipping)}
        </Text>
      </TouchableOpacity>

      <View style={defaultStyles.row}>
        <Text style={[defaultStyles.label, styles.label]}>Estimated Taxes</Text>
        <Text style={[defaultStyles.value, styles.value]}>
          {formatPrice(taxes)}
        </Text>
      </View>

      <View style={defaultStyles.row}>
        <Text style={[defaultStyles.label, styles.label]}>Others Fees</Text>
        <Text style={[defaultStyles.value, styles.value]}>
          {formatPrice(otherFees)}
        </Text>
      </View>

      <View style={[defaultStyles.divider, styles.divider]} />

      <View style={defaultStyles.totalRow}>
        <Text style={[defaultStyles.totalLabel, styles.totalLabel]}>Total</Text>
        <Text style={[defaultStyles.totalValue, styles.totalValue]}>
          USD {formatPrice(total)}
        </Text>
      </View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  shippingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoIcon: {
    marginLeft: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  shippingText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  label: {
    color: '#000000',
  },
  value: {
    color: '#000000',
  },
  infoIcon: {
    backgroundColor: '#f0f0f0',
    color: '#666666',
  },
  shippingText: {
    color: '#666666',
  },
  divider: {
    backgroundColor: '#e0e0e0',
  },
  totalLabel: {
    color: '#000000',
  },
  totalValue: {
    color: '#000000',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
  },
  label: {
    color: '#ffffff',
  },
  value: {
    color: '#ffffff',
  },
  infoIcon: {
    backgroundColor: '#404040',
    color: '#cccccc',
  },
  shippingText: {
    color: '#cccccc',
  },
  divider: {
    backgroundColor: '#404040',
  },
  totalLabel: {
    color: '#ffffff',
  },
  totalValue: {
    color: '#ffffff',
  },
});

export default OrderSummary; 