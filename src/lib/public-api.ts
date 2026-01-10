// Public API functions (no authentication required)

import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import type { ApiResponse } from './auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1/webapp';
const LEGAL_BASE_URL = `${BASE_URL}/legal`;

// Axios instance for public legal endpoints (no auth interceptors)
const publicAxios = axios.create({
  baseURL: LEGAL_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// Axios instance for public contact endpoint (no auth interceptors, but with toast interceptors)
const contactAxios = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// Add response interceptors to contactAxios for toast notifications
contactAxios.interceptors.response.use(
  (response) => {
    const data = response.data;
    const method = response.config.method?.toUpperCase();

    // Show success toasts for mutations (POST, PATCH, DELETE, PUT), not GET requests
    if (data?.success && data?.message && method && ['POST', 'PATCH', 'DELETE', 'PUT'].includes(method)) {
      toast.success(data.message);
    }

    return response;
  },
  (error: AxiosError) => {
    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection and try again.');
      return Promise.reject(error);
    }

    const response = error.response;
    const data = response.data as { success?: boolean; error?: boolean; message?: string };

    // Handle errors - show toast with backend message
    if (data?.message) {
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

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: string;
  submittedAt: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ContactErrorResponse {
  success: false;
  data: null;
  error: true;
  message: string;
  errors?: ValidationError[];
  timestamp: string;
}

// Submit contact form
export const submitContactForm = async (data: ContactFormData): Promise<ContactResponse> => {
  const response = await contactAxios.post<ApiResponse<ContactResponse>>('/contact', {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone?.trim() || undefined,
    subject: data.subject.trim(),
    message: data.message.trim(),
  });

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to submit contact form');
};

