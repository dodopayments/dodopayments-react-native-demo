import React, {useState} from 'react';
import {StatusBar, useColorScheme, View, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DodoPaymentsProvider} from 'dodopayments-react-native-sdk';
import PaymentScreen from './src/PaymentScreen';
import PaymentLinkScreen from './src/PaymentLinkScreen';
import BottomTabBar from './src/Components/BottomTabBar';

const PUBLISHABLE_KEY = 'Your_publishable_key';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [activeTab, setActiveTab] = useState<'sdk' | 'link'>('sdk');

  return (
    <DodoPaymentsProvider publishableKey={PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
        />
        <View style={styles.content}>
          {activeTab === 'sdk' ? <PaymentScreen /> : <PaymentLinkScreen />}
        </View>
        <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
    </DodoPaymentsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default App;
