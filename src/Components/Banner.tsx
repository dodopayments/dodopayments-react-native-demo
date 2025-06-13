import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

const Banner: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <Text style={[defaultStyles.title, styles.title]}>
        Dodo Payments Demo React Native
      </Text>
      <Text style={[defaultStyles.subtitle, styles.subtitle]}>
        Checkout SDK Demo
      </Text>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#e0e0e0',
  },
  title: {
    color: '#000000',
  },
  subtitle: {
    color: '#666666',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderBottomColor: '#404040',
  },
  title: {
    color: '#ffffff',
  },
  subtitle: {
    color: '#cccccc',
  },
});

export default Banner; 