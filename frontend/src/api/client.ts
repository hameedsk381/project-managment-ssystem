import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Token refresh logic would go here
      // For now, we just logout if we get 401
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }

    const errorMessage = (error.response?.data as any)?.message || error.message || 'An unexpected error occurred';
    
    // In a production app, you might want to show a toast here
    console.error('[API Error]:', errorMessage);

    return Promise.reject(error);
  }
);
