// API service for backend endpoints

import axiosInstance from './axios';

// Type definitions for API responses
export interface AiFace {
  id: string;
  name: string;
  description: string | null;
  gender: 'male' | 'female';
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductBackground {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductPose {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  productBackgrounds: ProductBackground[];
}

export interface ProductTheme {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  productBackgrounds: ProductBackground[];
}

export interface ProductType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  productThemes: ProductTheme[];
  productPoses: ProductPose[];
}

export interface CategoryAiFaces {
  male: AiFace[];
  female: AiFace[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  aiFaces: CategoryAiFaces;
  productTypes: ProductType[];
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
}

export interface IndustriesTreeResponse {
  data: Industry[];
  success: boolean;
  error: boolean;
  message: string;
  timestamp: string;
}

export interface GenerateImageRequest {
  industryId: string;
  categoryId: string;
  productTypeId: string;
  productPoseId: string;
  productThemeId: string;
  productBackgroundId: string;
  aiFaceId: string;
  productImage: string; // base64 encoded image with data URL prefix
  productImageMimeType: string;
}

export interface GenerateImageResponse {
  success: boolean;
  data: {
    success: boolean;
    imageUrl: string;
    message: string;
    expiresAt: string;
  };
  error: boolean;
  message: string;
  timestamp: string;
}

export interface GenerateBulkImageRequest {
  industryId: string;
  categoryId: string;
  productTypeId: string;
  productPoseIds: string[]; // Array of pose IDs (1-20 allowed)
  productThemeId: string;
  productBackgroundId: string;
  aiFaceId: string;
  productImage: string; // base64 encoded image with data URL prefix
  productImageMimeType: string;
}

export interface BulkImageItem {
  imageUrl: string;
  poseId: string;
  expiresAt: string;
}

export interface GenerateBulkImageResponse {
  success: boolean;
  data: {
    success: boolean;
    images: BulkImageItem[];
    totalGenerated: number;
    message: string;
  };
  error: boolean;
  message: string;
  timestamp: string;
}

// Convert File to base64 data URL
const fileToBase64DataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

// Fetch industries tree
export const fetchIndustriesTree = async (): Promise<Industry[]> => {
  const response = await axiosInstance.get<Industry[]>('/industries-tree');
  return response.data;
};

// Generate image
export const generateImage = async (request: GenerateImageRequest): Promise<GenerateImageResponse> => {
  // Ensure productImage is in the correct format (data:image/...;base64,...)
  const response = await axiosInstance.post<GenerateImageResponse>('/generate-image', request);
  return response.data;
};

// Helper function to generate image from form data
export const generateImageFromFormData = async (
  productImage: File,
  industryId: string,
  categoryId: string,
  productTypeId: string,
  productPoseId: string,
  productThemeId: string,
  productBackgroundId: string,
  aiFaceId: string
): Promise<GenerateImageResponse> => {
  // Convert file to base64 data URL
  const productImageBase64 = await fileToBase64DataURL(productImage);
  
  const request: GenerateImageRequest = {
    industryId,
    categoryId,
    productTypeId,
    productPoseId,
    productThemeId,
    productBackgroundId,
    aiFaceId,
    productImage: productImageBase64,
    productImageMimeType: productImage.type,
  };

  return generateImage(request);
};

// Generate bulk images
export const generateBulkImage = async (request: GenerateBulkImageRequest): Promise<GenerateBulkImageResponse> => {
  const response = await axiosInstance.post<GenerateBulkImageResponse>('/generate-bulk-image', request);
  return response.data;
};

// Helper function to generate bulk images from form data
export const generateBulkImageFromFormData = async (
  productImage: File,
  industryId: string,
  categoryId: string,
  productTypeId: string,
  productPoseIds: string[],
  productThemeId: string,
  productBackgroundId: string,
  aiFaceId: string
): Promise<GenerateBulkImageResponse> => {
  // Convert file to base64 data URL
  const productImageBase64 = await fileToBase64DataURL(productImage);
  
  const request: GenerateBulkImageRequest = {
    industryId,
    categoryId,
    productTypeId,
    productPoseIds,
    productThemeId,
    productBackgroundId,
    aiFaceId,
    productImage: productImageBase64,
    productImageMimeType: productImage.type,
  };

  return generateBulkImage(request);
};

// User Dashboard Statistics Types
export interface GenerationsStatistics {
  usersWithSingleGeneration: number;
  usersWithBulkGeneration: number;
  totalImageGenerations: number;
}

export interface SystemData {
  aiFaces: number;
  backgrounds: number;
  poses: number;
  categories: number;
  industries: number;
  themes: number;
}

export interface GeneralStatistics {
  totalCredits: number;
  remainingCredits: number;
  usedCredits: number;
  totalGeneratedImagePurchasedCredit: number; // Dummy: 0 (for future payment integration)
  totalPaidAmount: number; // Dummy: 0 (for future payment integration)
}

export interface SystemStatisticsData {
  generations: GenerationsStatistics;
  system: SystemData;
  general: GeneralStatistics;
}

export interface SystemStatisticsResponse {
  success: boolean;
  data: SystemStatisticsData;
  error: boolean;
  message: string;
  timestamp: string;
}

// Fetch user dashboard statistics
export const fetchUserDashboardStatistics = async (): Promise<SystemStatisticsData> => {
  const response = await axiosInstance.get<SystemStatisticsResponse>('/userDashboardStatistics');
  const data = response.data;
  
  if (!data.success || data.error) {
    throw new Error(data.message || 'Failed to fetch user dashboard statistics');
  }

  return data.data;
};

