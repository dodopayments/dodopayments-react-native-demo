/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StatusBar, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DodoPaymentsProvider} from 'dodopayments-react-native-sdk';
import PaymentScreen from './src/PaymentScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const safePadding = '0%';

  const PUBLISHABLE_KEY = 'YOUR_PUBLISHABLE_KEY_HERE'; // Get from: https://app.dodopayments.com/developer/others
  
  return (
    <DodoPaymentsProvider
      publishableKey={PUBLISHABLE_KEY}>
      <View style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
              paddingHorizontal: safePadding,
              paddingTop: '7%',
              paddingBottom: safePadding,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <PaymentScreen />
          </View>
        </ScrollView>
      </View>
    </DodoPaymentsProvider>
  );
}

export default App;
