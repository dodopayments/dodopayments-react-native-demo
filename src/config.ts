/**
 * Configuration for Dodo Payments Demo App
 */

// ==================== SERVER CONFIGURATION ====================

/**
 * Toggle for Android testing environment:
 * - true: Android Emulator (AVD)
 * - false: Physical Android Device
 */
export const IS_ANDROID_EMULATOR = false;

/**
 * Your computer's IP address (for physical devices only)
 * 
 * Find your IP:
 * - Windows: ipconfig (look for IPv4 Address)
 * - Mac/Linux: ifconfig | grep "inet " (not 127.0.0.1)
 */
export const YOUR_COMPUTER_IP = 'YOUR_COMPUTER_IP_HERE'; // Replace with your actual IP (e.g., '192.168.1.100')

/**
 * Backend server port
 */
export const SERVER_PORT = 5252;

// ==================== AUTO-GENERATED (Don't Edit) ====================

import { Platform } from 'react-native';

/**
 * Determines backend URL based on platform and device type
 */
export const getBackendUrl = (): string => {
  if (Platform.OS === 'ios') {
    return `http://localhost:${SERVER_PORT}`;
  } else {
    if (IS_ANDROID_EMULATOR) {
      return `http://10.0.2.2:${SERVER_PORT}`;
    } else {
      return `http://${YOUR_COMPUTER_IP}:${SERVER_PORT}`;
    }
  }
};

/**
 * Full backend API endpoint
 */
export const BACKEND_API_URL = `${getBackendUrl()}/create-payment-intent`;
