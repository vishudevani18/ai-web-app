// Axios instance with interceptors for automatic token handling and toast notifications

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { getAccessToken, getRefreshToken, setTokens, clearAllAuthData } from '@/utils/storage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1/webapp';

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor: Add access token to requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Skip adding access token for logout and refresh endpoints (they use refresh token in body)
    const url = config.url || '';
    if (url.includes('/logout') || url.includes('/refresh')) {
      return config;
    }
    
    // If Authorization header is already set, don't override
    if (config.headers?.Authorization) {
      return config;
    }
    
    // Add access token to Authorization header for all other requests
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle responses, show toasts, handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    const data = response.data;
    const method = response.config.method?.toUpperCase();

    // Only show success toasts for mutations (POST, PATCH, DELETE, PUT), not GET requests
    // This prevents toast spam from data fetching operations
    if (data?.success && data?.message && method && ['POST', 'PATCH', 'DELETE', 'PUT'].includes(method)) {
      toast.success(data.message);
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle network errors (including timeouts)
    if (!error.response) {
      // Check if it's a timeout error
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        const url = originalRequest?.url || '';
        // For generation endpoints, show a more specific message
        if (url.includes('/generate-image') || url.includes('/generate-bulk-image')) {
          toast.error('Request is taking longer than expected. The generation may still be processing. Please check your gallery or try again.');
        } else {
          toast.error('Request timeout. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection and try again.');
      }
      return Promise.reject(error);
    }

    const response = error.response;
    const data = response.data as { success?: boolean; error?: boolean; message?: string };

    // Handle 401 Unauthorized - Try to refresh token
    // DO NOT refresh tokens for auth endpoints (login, signup, forgot-password, etc.)
    const url = originalRequest?.url || '';
    const isAuthEndpoint = 
      url.includes('/login') || 
      url.includes('/signup') || 
      url.includes('/forgot-password') || 
      url.includes('/reset-password') ||
      url.includes('/logout') || 
      url.includes('/webapp/logout') ||
      url.includes('/refresh');
    
    if (response.status === 401 && originalRequest && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        // No refresh token - this is likely an auth endpoint error (login, signup, etc.)
        // Don't try to refresh, just reject the error so it can be handled normally
        processQueue(error, null);
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        // Attempt to refresh token
        // Send refresh token in request body, not in header
        // API_BASE_URL already includes /webapp, so just use /refresh
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/refresh`,
          {
            refreshToken: refreshToken,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const refreshData = refreshResponse.data as {
          success?: boolean;
          data?: {
            accessToken: string;
            refreshToken: string;
          };
        };

        if (refreshData?.success && refreshData.data) {
          const { accessToken, refreshToken: newRefreshToken } = refreshData.data;
          setTokens(accessToken, newRefreshToken);

          // Update original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          processQueue(null, accessToken);
          isRefreshing = false;

          // Retry original request
          return axiosInstance(originalRequest);
        } else {
          throw new Error('Token refresh failed');
        }
      } catch (refreshError) {
        // Refresh failed, clear auth and redirect to login
        clearAllAuthData();
        processQueue(refreshError as AxiosError, null);
        isRefreshing = false;
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors - show toast with backend message
    if (data?.message) {
      // Show error toast with backend message
      toast.error(data.message);
    } else {
      // Fallback error message
      const statusMessages: Record<number, string> = {
        400: 'Bad request. Please check your input.',
        403: 'Access forbidden.',
        404: 'Resource not found.',
        409: 'Conflict. This resource already exists.',
        429: 'Too many requests. Please try again later.',
        500: 'Server error. Please try again later.',
      };

      const message = statusMessages[response.status] || 'An error occurred. Please try again.';
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

