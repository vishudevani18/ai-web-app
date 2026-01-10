// Authentication hook for managing auth state

import { useState, useEffect, useCallback } from 'react';
import { getUser, getAccessToken, clearAllAuthData } from '@/utils/storage';
import { User, login as loginApi, logout as logoutApi, refreshToken } from '@/lib/auth';

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = getUser<User>();
        const token = getAccessToken();
        
        if (storedUser && token) {
          setUser(storedUser);
          // Set up token refresh timer
          setupTokenRefresh();
        } else {
          clearAllAuthData();
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        clearAllAuthData();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

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
        setUser(null);
        if (refreshTimer) {
          clearInterval(refreshTimer);
          refreshTimer = null;
        }
        window.location.href = '/auth/login';
      }
    }, refreshInterval);
  }, []);

  // Login function
  const login = useCallback(async (emailOrPhone: string, password: string) => {
    setIsLoading(true);
    try {
      const authData = await loginApi(emailOrPhone, password);
      setUser(authData.user);
      setupTokenRefresh();
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setupTokenRefresh]);

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
      setUser(null);
      clearAllAuthData();
      setIsLoading(false);
      
      // Redirect to login page
      window.location.href = '/auth/login';
    }
  }, []);

  // Manual refresh function
  const refresh = useCallback(async () => {
    try {
      const authData = await refreshToken();
      setUser(authData.user || null);
      setupTokenRefresh();
    } catch (error) {
      console.error('Token refresh failed:', error);
      setUser(null);
      clearAllAuthData();
      throw error;
    }
  }, [setupTokenRefresh]);

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
    user,
    isAuthenticated: !!user && !!getAccessToken(),
    isLoading,
    login,
    logout,
    refresh,
  };
};

