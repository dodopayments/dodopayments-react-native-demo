import React from 'react';
import {
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import Button from './Button';

interface PaymentButtonsProps {
  onCheckoutPress: () => void;
  loading?: boolean;
}

const PaymentButtons: React.FC<PaymentButtonsProps> = ({
  onCheckoutPress,
  loading = false,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[defaultStyles.container, styles.container]}>

      <Button
        callback={onCheckoutPress}
        buttonText="Checkout"
        loading={loading}
        disabled={loading}
        style={[defaultStyles.othersPayButton, styles.othersPayButton]}
        textStyle={[defaultStyles.othersPayText, styles.othersPayText]}
      />
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 12,
  },


  othersPayButton: {
    height: 56,
    borderRadius: 8,
  },


  othersPayText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },


  othersPayButton: {
    backgroundColor: '#000000',
  },

  othersPayText: {
    color: '#ffffff',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
  },

  othersPayButton: {
    backgroundColor: '#000000',
  },

  othersPayText: {
    color: '#ffffff',
  },
});

export default PaymentButtons; 