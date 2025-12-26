import { supabase } from "@/integrations/supabase/client";

interface GenerateImageRequest {
  productImage: File;
  modelImageUrl: string; // URL of the model reference image (local import)
  model: string;
  background: string;
  backgroundImageUrl: string; // URL of the background reference image
  pose: string;
  poseImageUrl: string; // URL of the pose reference image
  logo?: File | null;
  logoPlacement?: string;
}

interface GenerateImageResponse {
  imageUrl?: string;
  success: boolean;
  error?: string;
}

export const generateImageWithGemini = async ({
  productImage,
  modelImageUrl,
  model,
  background,
  backgroundImageUrl,
  pose,
  poseImageUrl,
  logo,
  logoPlacement
}: GenerateImageRequest): Promise<GenerateImageResponse> => {
  try {
    // Convert product image to base64
    const productImageBase64 = await fileToBase64(productImage);
    
    // Fetch and convert model image to base64
    const modelImageBase64 = await urlToBase64(modelImageUrl);
    
    // Fetch and convert background image to base64
    const backgroundImageBase64 = backgroundImageUrl ? await urlToBase64(backgroundImageUrl) : undefined;
    
    // Fetch and convert pose image to base64
    const poseImageBase64 = poseImageUrl ? await urlToBase64(poseImageUrl) : undefined;
    
    // Convert logo to base64 if provided
    let logoImageBase64: string | undefined;
    let logoMimeType: string | undefined;
    if (logo) {
      logoImageBase64 = await fileToBase64(logo);
      logoMimeType = logo.type;
    }
    
    const { data, error } = await supabase.functions.invoke('generate-product-image', {
      body: {
        productImageBase64,
        productImageMimeType: productImage.type,
        modelImageBase64,
        model,
        background,
        backgroundImageBase64,
        pose,
        poseImageBase64,
        ...(logo && logoImageBase64 && logoPlacement && {
          logoImageBase64,
          logoMimeType,
          logoPlacement
        })
      }
    });

    if (error) {
      throw error;
    }

    if (!data?.success) {
      throw new Error(data?.error || 'Image generation failed');
    }

    return {
      success: true,
      imageUrl: data.imageUrl
    };
  } catch (error) {
    console.error('Error generating image:', error);
    let message = 'Failed to generate image. Please try again.';
    if (error instanceof Error) {
      message = error.message;
    }
    return {
      success: false,
      error: message
    };
  }
};

const urlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch model image');
    
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        if (!base64Data) {
          reject(new Error('Failed to extract base64 from model image'));
          return;
        }
        resolve(base64Data);
      };
      reader.onerror = () => reject(new Error('Failed to read model image'));
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw new Error('Failed to load model reference image: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};

const fileToBase64 = async (file: File): Promise<string> => {
  if (!file) throw new Error('No file provided');
  if (file.size === 0) throw new Error('File is empty');
  if (file.size > 10 * 1024 * 1024) throw new Error('File too large (max 10MB)');
  if (!file.type || !file.type.startsWith('image/')) throw new Error('Unsupported file type. Please upload an image.');

  return await fileToBase64WithReader(file);
};

function fileToBase64WithReader(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          const result = reader.result;
          if (!result || typeof result !== 'string') {
            reject(new Error('Failed to read file - no result'));
            return;
          }
          const base64Data = result.split(',')[1];
          if (!base64Data) {
            reject(new Error('Failed to extract base64 data from file'));
            return;
          }
          resolve(base64Data);
        } catch (error) {
          reject(new Error('Error processing file data: ' + (error instanceof Error ? error.message : 'Unknown error')));
        }
      };
      
      reader.onerror = () => {
        const errorMsg = reader.error?.message || 'Unknown file reading error';
        reject(new Error('Failed to read file: ' + errorMsg));
      };
      
      reader.onabort = () => {
        reject(new Error('File reading was aborted'));
      };
      
      // Start reading the file
      reader.readAsDataURL(file);
    } catch (error) {
      reject(new Error('Failed to initialize file reader: ' + (error instanceof Error ? error.message : 'Unknown error')));
    }
  });
}
