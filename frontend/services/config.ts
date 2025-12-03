import { Platform } from 'react-native';

/**
 * API Configuration
 * 
 * This file contains the API URL configuration for different environments.
 * 
 * For development:
 * - Web: Uses localhost
 * - iOS/Android: Uses your computer's local IP address
 * 
 * If the backend connection fails, check:
 * 1. Backend is running (npm run dev in backend folder)
 * 2. Your computer's IP address hasn't changed
 * 3. Both devices are on the same WiFi network
 * 4. Firewall isn't blocking port 3000
 */

// Your computer's local IP address
// To find it: run `ifconfig | grep "inet " | grep -v 127.0.0.1` on macOS/Linux
const LOCAL_IP = '192.168.1.10';

export const getApiUrl = () => {
  if (!__DEV__) {
    // Production URL - update this when deploying
    return 'https://your-production-url.com';
  }
  
  // Development URLs
  if (Platform.OS === 'web') {
    return 'http://localhost:3000';
  }
  
  // For iOS simulator, Android emulator, or physical devices
  return `http://${LOCAL_IP}:3000`;
};

export const API_BASE_URL = `${getApiUrl()}/api`;
export const HEALTH_URL = `${getApiUrl()}/health`;
