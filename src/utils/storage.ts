// Token storage utilities for authentication

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const SESSION_TOKEN_KEY = 'sessionToken';
const USER_KEY = 'user';

/**
 * Get access token from localStorage
 */
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Get refresh token from localStorage
 */
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Store both access and refresh tokens
 */
export const setTokens = (accessToken: string, refreshToken: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

/**
 * Clear all tokens from storage
 */
export const clearTokens = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Get session token for signup flow (temporary)
 */
export const getSessionToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SESSION_TOKEN_KEY);
};

/**
 * Store session token for signup flow
 */
export const setSessionToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_TOKEN_KEY, token);
};

/**
 * Clear session token after registration
 */
export const clearSessionToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_TOKEN_KEY);
};

/**
 * Store user data
 */
export const setUser = (user: unknown): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Get user data
 */
export const getUser = <T = unknown>(): T | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as T;
  } catch {
    return null;
  }
};

/**
 * Clear user data
 */
export const clearUser = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_KEY);
};

/**
 * Clear all authentication data (tokens, session, user)
 */
export const clearAllAuthData = (): void => {
  clearTokens();
  clearSessionToken();
  clearUser();
};

