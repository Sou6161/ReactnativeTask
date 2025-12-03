import { API_BASE_URL, HEALTH_URL } from './config';

// Health check to verify backend connection
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(HEALTH_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return null;
  }
};

// API endpoints (ready for when you replace mock data)
export const api = {
  // Categories
  getCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { success: false, data: [] };
    }
  },

  // Events
  getEvents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      return { success: false, data: [] };
    }
  },

  // Offers
  getOffers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching offers:', error);
      return { success: false, data: [] };
    }
  },

  // Users
  getUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      return { success: false, data: [] };
    }
  },
};
