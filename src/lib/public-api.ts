// Public API functions (no authentication required)

import axios from 'axios';
import type { ApiResponse } from './auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1/webapp';
const LEGAL_BASE_URL = `${BASE_URL}/legal`;

// Axios instance for public legal endpoints (no auth interceptors)
const publicAxios = axios.create({
  baseURL: LEGAL_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

export interface LegalContent {
  title: string;
  content: string;
  lastUpdated: string;
}

const fetchLegalContent = async (endpoint: string, errorMessage: string): Promise<LegalContent> => {
  const response = await publicAxios.get<ApiResponse<LegalContent>>(endpoint);

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || errorMessage);
};

export const getTermsOfService = (): Promise<LegalContent> =>
  fetchLegalContent('/terms-of-service', 'Failed to fetch Terms of Service');

export const getPrivacyPolicy = (): Promise<LegalContent> =>
  fetchLegalContent('/privacy-policy', 'Failed to fetch Privacy Policy');

