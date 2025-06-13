import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

const PolicyInfo: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <View style={defaultStyles.policyItem}>
        <Text style={[defaultStyles.icon, styles.icon]}>🌐</Text>
        <Text style={[defaultStyles.policyText, styles.policyText]}>
          Global access from any device, anywhere
        </Text>
      </View>

      <View style={defaultStyles.policyItem}>
        <Text style={[defaultStyles.icon, styles.icon]}>🔄</Text>
        <Text style={[defaultStyles.policyText, styles.policyText]}>
          Cancel or change plans anytime
        </Text>
      </View>

      <View style={defaultStyles.policyItem}>
        <Text style={[defaultStyles.icon, styles.icon]}>💫</Text>
        <Text style={[defaultStyles.policyText, styles.policyText]}>
          Free updates and premium support included
        </Text>
      </View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  icon: {
    fontSize: 16,
    marginRight: 12,
    marginTop: 2,
    width: 20,
    textAlign: 'center',
  },
  policyText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  icon: {
    color: '#666666',
  },
  policyText: {
    color: '#666666',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
  },
  icon: {
    color: '#cccccc',
  },
  policyText: {
    color: '#cccccc',
  },
});

export default PolicyInfo; 