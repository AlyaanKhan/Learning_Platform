// API configuration for different environments
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  RUN_CODE: `${API_BASE_URL}/run-code`,
  HEALTH: `${API_BASE_URL}/health`,
};

export default API_BASE_URL; 