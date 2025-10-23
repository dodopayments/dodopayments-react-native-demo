import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Image,
} from 'react-native';

const Banner: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <View style={defaultStyles.content}>
        <Image 
          source={require('../assets/dodopayments-logo.png')} 
          style={defaultStyles.logo}
        />
        <View style={defaultStyles.textContent}>  
        <Text style={[defaultStyles.title, styles.title]}>
          Dodo Payments 
        </Text>
        <Text style={[defaultStyles.subtitle, styles.subtitle]}>
        Demo React Native 
        </Text>
        </View>
      </View>
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width : '100%',
  },
  textContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
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