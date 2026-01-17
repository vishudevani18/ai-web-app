// Authentication hook for managing auth state

import { useState, useEffect, useCallback } from 'react';
import { getAccessToken, clearAllAuthData } from '@/utils/storage';
import { login as loginApi, logout as logoutApi, refreshToken } from '@/lib/auth';
import { useQueryClient } from '@tanstack/react-query';
import type { User } from '@/lib/auth';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrPhone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

let refreshTimer: NodeJS.Timeout | null = null;

export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Setup automatic token refresh (refresh 5 minutes before expiry)
  const setupTokenRefresh = useCallback(() => {
    // Clear existing timer
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }

    // Default token expiry is 3600 seconds (60 minutes)
    // Refresh 5 minutes before expiry = 55 minutes = 3300000 ms
    const refreshInterval = 55 * 60 * 1000; // 55 minutes

    refreshTimer = setInterval(async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error('Token refresh failed:', error);
        // If refresh fails, clear auth and redirect to login
        clearAllAuthData();
        if (refreshTimer) {
          clearInterval(refreshTimer);
          refreshTimer = null;
        }
        window.location.href = '/auth/login';
      }
    }, refreshInterval);
  }, []);

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = getAccessToken();
        
        if (token) {
          // Set up token refresh timer
          setupTokenRefresh();
        } else {
          clearAllAuthData();
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        clearAllAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [setupTokenRefresh]);

  // Login function
  const login = useCallback(async (emailOrPhone: string, password: string) => {
    setIsLoading(true);
    try {
      const authData = await loginApi(emailOrPhone, password);
      // Invalidate user profile to fetch fresh data with updated credits
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      setupTokenRefresh();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setupTokenRefresh, queryClient]);

  // Logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    
    // Clear refresh timer first to prevent any token refresh attempts
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
    
    try {
      await logoutApi();
    } catch (error) {
      // Even if logout fails, clear local state
      console.error('Logout error:', error);
    } finally {
      clearAllAuthData();
      setIsLoading(false);
      
      // Redirect to login page
      window.location.href = '/auth/login';
    }
  }, []);

  // Manual refresh function
  const refresh = useCallback(async () => {
    try {
      await refreshToken();
      // Invalidate user profile to fetch fresh data
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      setupTokenRefresh();
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearAllAuthData();
      throw error;
    }
  }, [setupTokenRefresh, queryClient]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshTimer) {
        clearInterval(refreshTimer);
        refreshTimer = null;
      }
    };
  }, []);

  return {
    user: null, // User profile now comes from React Query via useUserProfile hook
    isAuthenticated: !!getAccessToken(),
    isLoading,
    login,
    logout,
    refresh,
  };
};

