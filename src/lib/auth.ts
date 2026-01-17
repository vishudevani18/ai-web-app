// Authentication API functions

import axios from 'axios';
import axiosInstance from './axios';
import { setTokens, setSessionToken, getSessionToken, clearAllAuthData, getRefreshToken } from '@/utils/storage';

// Type definitions
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: boolean;
  message: string;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: 'user' | 'admin' | 'super_admin';
  status: 'active' | 'inactive' | 'banned';
  profileImage: string | null;
  business: Business | null;
  credits: number; // User's remaining credits
  createdAt: string;
  updatedAt: string;
}

export interface Business {
  businessName: string;
  businessType: 'manufacturer' | 'reseller' | 'wholesaler' | 'other';
  businessSegment: 'clothing' | 'accessories' | 'furniture' | 'electronics' | 'other';
  businessDescription: string | null;
  gstNumber: string | null;
  websiteUrl: string | null;
  businessLogo: string | null;
}

export interface Address {
  addressType?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  country?: string | null;
}

export interface BusinessDto {
  businessName?: string;
  businessType?: 'manufacturer' | 'reseller' | 'wholesaler' | 'other';
  businessSegment?: 'clothing' | 'accessories' | 'furniture' | 'electronics' | 'other';
  businessDescription?: string | null;
  gstNumber?: string | null;
  websiteUrl?: string | null;
  businessLogo?: string | null;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName?: string | null;
  phone?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: 'user' | 'admin' | 'super_admin';
  status: 'active' | 'inactive' | 'banned';
  profileImage?: string | null;
  address?: Address | null;
  business?: BusinessDto | null;
  credits: number; // User's remaining credits
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

export interface OTPResponse {
  sessionToken: string;
}

export interface CompleteRegistrationData {
  sessionToken: string;
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  address?: {
    addressType?: string;
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
  };
  business?: {
    businessName?: string;
    businessType?: 'manufacturer' | 'reseller' | 'wholesaler' | 'other';
    businessSegment?: 'clothing' | 'accessories' | 'furniture' | 'electronics' | 'other';
    businessDescription?: string;
    gstNumber?: string;
    websiteUrl?: string;
    businessLogo?: string;
  };
}

// Signup Flow

/**
 * Send OTP for signup
 */
export const sendSignupOTP = async (phone: string): Promise<void> => {
  const response = await axiosInstance.post<ApiResponse<null>>('/signup/send-otp', {
    phone,
  });
  
  // Toast is handled by interceptor
  return;
};

/**
 * Verify OTP for signup
 */
export const verifySignupOTP = async (phone: string, otp: string): Promise<string> => {
  const response = await axiosInstance.post<ApiResponse<OTPResponse>>('/signup/verify-otp', {
    phone,
    otp,
  });

  if (response.data.success && response.data.data?.sessionToken) {
    const sessionToken = response.data.data.sessionToken;
    setSessionToken(sessionToken);
    return sessionToken;
  }

  throw new Error(response.data.message || 'Failed to verify OTP');
};

/**
 * Complete registration
 */
export const completeRegistration = async (
  data: Omit<CompleteRegistrationData, 'sessionToken'>
): Promise<AuthResponse> => {
  const sessionToken = getSessionToken();
  
  if (!sessionToken) {
    throw new Error('Session token not found. Please verify your OTP again.');
  }

  const registrationData: CompleteRegistrationData = {
    ...data,
    sessionToken,
  };

  const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/signup/complete', registrationData);

  if (response.data.success && response.data.data) {
    const authData = response.data.data;
    setTokens(authData.accessToken, authData.refreshToken);
    // User profile will be fetched via React Query, not stored in localStorage
    // Clear session token after successful registration
    setSessionToken('');
    return authData;
  }

  throw new Error(response.data.message || 'Failed to complete registration');
};

// Login

/**
 * Login with email/phone and password
 */
export const login = async (emailOrPhone: string, password: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/login', {
    emailOrPhone,
    password,
  });

  if (response.data.success && response.data.data) {
    const authData = response.data.data;
    setTokens(authData.accessToken, authData.refreshToken);
    // User profile will be fetched via React Query, not stored in localStorage
    return authData;
  }

  throw new Error(response.data.message || 'Login failed');
};

// Logout

/**
 * Logout user
 * Refresh token is sent in request body, not in header
 * Do NOT call refresh token endpoint during logout
 */
export const logout = async (): Promise<void> => {
  const refreshTokenValue = getRefreshToken();
  
  // Clear all auth data first to prevent any token refresh attempts
  clearAllAuthData();
  
  if (!refreshTokenValue) {
    // No refresh token, just return (already cleared)
    return;
  }

  try {
    // Send refresh token in request body, not in header
    // Use raw axios to avoid interceptor token refresh logic
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1/webapp';
    await axios.post<ApiResponse<null>>(
      `${API_BASE_URL}/logout`,
      {
        refreshToken: refreshTokenValue,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    // Even if logout fails on server, we've already cleared local data
    // Don't throw error, just log it
    console.error('Logout API call failed:', error);
  }
};

// Forgot Password Flow

/**
 * Send OTP for password reset
 */
export const sendPasswordResetOTP = async (phone: string): Promise<void> => {
  const response = await axiosInstance.post<ApiResponse<null>>('/forgot-password/send-otp', {
    phone,
  });
  
  // Toast is handled by interceptor
  return;
};

/**
 * Verify OTP for password reset
 */
export const verifyPasswordResetOTP = async (phone: string, otp: string): Promise<string> => {
  const response = await axiosInstance.post<ApiResponse<OTPResponse>>('/forgot-password/verify-otp', {
    phone,
    otp,
  });

  if (response.data.success && response.data.data?.sessionToken) {
    const sessionToken = response.data.data.sessionToken;
    setSessionToken(sessionToken);
    return sessionToken;
  }

  throw new Error(response.data.message || 'Failed to verify OTP');
};

/**
 * Reset password
 * Uses sessionToken from OTP verification instead of phone number
 */
export const resetPassword = async (
  newPassword: string,
  confirmPassword: string
): Promise<void> => {
  const sessionToken = getSessionToken();
  
  if (!sessionToken) {
    throw new Error('Session token not found. Please verify your OTP again.');
  }

  const response = await axiosInstance.post<ApiResponse<null>>('/reset-password', {
    sessionToken,
    newPassword,
    confirmPassword,
  });

  // Toast is handled by interceptor
  // Clear session token after successful password reset
  setSessionToken('');
  return;
};

/**
 * Resend OTP for signup or password reset
 */
export const resendOTP = async (
  phone: string,
  purpose: 'signup' | 'reset_password'
): Promise<void> => {
  const response = await axiosInstance.post<ApiResponse<null>>('/forgot-password/resend-otp', {
    phone,
    purpose,
  });
  
  // Toast is handled by interceptor
  return;
};

// Token Management

/**
 * Refresh access token
 * Refresh token is sent in request body, not in header
 */
export const refreshToken = async (): Promise<AuthResponse> => {
  const refreshTokenValue = getRefreshToken();
  
  if (!refreshTokenValue) {
    throw new Error('No refresh token available');
  }

  // Send refresh token in request body, not in header
  // axiosInstance baseURL already includes /webapp, so just use /refresh
  const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
    '/refresh',
    {
      refreshToken: refreshTokenValue,
    }
  );

  if (response.data.success && response.data.data) {
    const authData = response.data.data;
    setTokens(authData.accessToken, authData.refreshToken);
    // User profile will be fetched via React Query, not stored in localStorage
    return authData;
  }

  throw new Error(response.data.message || 'Failed to refresh token');
};

// Profile Management

/**
 * Get current user profile
 */
export const getProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get<ApiResponse<UserProfile>>('/profile');

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to fetch profile');
};

/**
 * Update user profile
 */
export interface UpdateProfileData {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: {
    addressType?: string;
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
  };
  business?: {
    businessName?: string;
    businessType?: string;
    businessSegment?: string;
    businessDescription?: string;
    gstNumber?: string;
    websiteUrl?: string;
    businessLogo?: string;
  };
}

export const updateProfile = async (data: UpdateProfileData): Promise<UserProfile> => {
  const response = await axiosInstance.patch<ApiResponse<UserProfile>>('/profile', data);

  if (response.data.success && response.data.data) {
    // User profile is managed by React Query, not localStorage
    // Invalidate user profile query to trigger refetch with updated data
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to update profile');
};

/**
 * Change password
 */
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const changePassword = async (data: ChangePasswordData): Promise<void> => {
  const response = await axiosInstance.patch<ApiResponse<null>>('/profile/change-password', {
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
    confirmPassword: data.confirmPassword,
  });

  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to change password');
  }

  // Toast is handled by interceptor
  return;
};

