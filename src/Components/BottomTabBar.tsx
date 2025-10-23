import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';

interface BottomTabBarProps {
  activeTab: 'sdk' | 'link';
  onTabChange: (tab: 'sdk' | 'link') => void;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <TouchableOpacity
        style={[
          defaultStyles.tab,
          activeTab === 'sdk' && defaultStyles.activeTab,
          activeTab === 'sdk' && styles.activeTab,
        ]}
        onPress={() => onTabChange('sdk')}>
        <Text
          style={[
            defaultStyles.tabText,
            styles.tabText,
            activeTab === 'sdk' && defaultStyles.activeTabText,
            activeTab === 'sdk' && styles.activeTabText,
          ]}>
          SDK Payment
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          defaultStyles.tab,
          activeTab === 'link' && defaultStyles.activeTab,
          activeTab === 'link' && styles.activeTab,
        ]}
        onPress={() => onTabChange('link')}>
        <Text
          style={[
            defaultStyles.tabText,
            styles.tabText,
            activeTab === 'link' && defaultStyles.activeTabText,
            activeTab === 'link' && styles.activeTabText,
          ]}>
          Payment Link
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#453AA4',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: '700',
    color: '#453AA4',
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderTopColor: '#e0e0e0',
  },
  tabText: {
    color: '#666666',
  },
  activeTabText: {
    color: '#453AA4',
  },
  activeTab: {
    borderBottomColor: '#453AA4',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderTopColor: '#333333',
  },
  tabText: {
    color: '#999999',
  },
  activeTabText: {
    color: '#7d6fe8',
  },
  activeTab: {
    borderBottomColor: '#7d6fe8',
  },
});

export default BottomTabBar;
