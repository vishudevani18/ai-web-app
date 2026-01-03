// API service for backend endpoints

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1/webapp';

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
  try {
    const response = await fetch(`${API_BASE_URL}/industries-tree`, {
      method: 'GET',
      headers: {
        'accept': '*/*',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch industries tree: ${response.status} ${response.statusText}`);
    }

    const data: Industry[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching industries tree:', error);
    throw error;
  }
};

// Generate image
export const generateImage = async (request: GenerateImageRequest): Promise<GenerateImageResponse> => {
  try {
    // Ensure productImage is in the correct format (data:image/...;base64,...)
    const response = await fetch(`${API_BASE_URL}/generate-image`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to generate image: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: GenerateImageResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
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
  try {
    const response = await fetch(`${API_BASE_URL}/generate-bulk-image`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to generate bulk images: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: GenerateBulkImageResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating bulk images:', error);
    throw error;
  }
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

// System Data Response Interface
export interface SystemDataResponse {
  success: boolean;
  data: Record<string, number>; // Dynamic keys with number values
  error: boolean;
  message: string;
  timestamp: string;
}

// Fetch system data
export const fetchSystemData = async (): Promise<Record<string, number>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/systemdata`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch system data: ${response.status} ${response.statusText}`);
    }

    const data: SystemDataResponse = await response.json();
    
    if (!data.success || data.error) {
      throw new Error(data.message || 'Failed to fetch system data');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching system data:', error);
    throw error;
  }
};

// Generation Statistics Response Interface
export interface GenerationStatisticsResponse {
  success: boolean;
  data: {
    singleGenerationCount: number; // Number of single generation requests
    singleGenerationImages: number; // Total images from single generations
    catalogGenerationCount: number; // Number of catalog generation requests
    catalogGenerationImages: number; // Total images from catalog generations
    totalImages: number; // Total images generated (single + catalog)
  };
  error: boolean;
  message: string;
  timestamp: string;
}

// Fetch generation statistics
export const fetchGenerationStatistics = async (): Promise<GenerationStatisticsResponse['data']> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generation-statistics`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch generation statistics: ${response.status} ${response.statusText}`);
    }

    const data: GenerationStatisticsResponse = await response.json();
    
    if (!data.success || data.error) {
      throw new Error(data.message || 'Failed to fetch generation statistics');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching generation statistics:', error);
    throw error;
  }
};

