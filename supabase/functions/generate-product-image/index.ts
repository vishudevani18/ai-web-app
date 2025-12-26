import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      productImageBase64, 
      productImageMimeType, 
      modelImageBase64, 
      model, 
      background,
      backgroundImageBase64,
      pose,
      poseImageBase64,
      logoImageBase64,
      logoMimeType,
      logoPlacement
    } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    let prompt = `You are an AI fashion try-on system.

Task: Generate a realistic photo of the EXACT model from the reference image wearing the clothing from the product image.

CRITICAL: The model's face, body type, skin tone, and features must EXACTLY match the reference model image. This is the most important requirement for consistency.

Selections:
- Model Reference: See reference image (must match exactly)
- Model Description: ${model}
- Pose/Style: ${pose} - MUST match the pose reference image exactly
- Background: ${background} - MUST match the background reference image exactly`;

    if (backgroundImageBase64) {
      prompt += `\n- Background Reference: Use the provided background reference image to create the exact same environment and setting.`;
    }

    if (poseImageBase64) {
      prompt += `\n- Pose Reference: The model's body position, stance, and gesture must exactly match the provided pose reference image.`;
    }

    if (logoImageBase64 && logoPlacement) {
      prompt += `\n- Logo Placement: Place the provided logo image at the ${logoPlacement.replace('-', ' ')} corner of the generated image. The logo should be subtle, professional, and not obstruct the main subject.`;
    }

    prompt += `

Rules:
1. The model MUST look identical to the reference image - same face, same person
2. Do not change or distort the fabric patterns from the product image
3. Ensure the clothing fits naturally on this specific model
4. Apply the selected background cleanly
5. Maintain the exact skin tone, facial features, and body proportions from the reference image`;

    if (logoImageBase64) {
      prompt += `\n6. Place the logo at the specified ${logoPlacement?.replace('-', ' ')} position, ensuring it's visible but not intrusive`;
    }

    const contentArray: any[] = [
      { type: 'text', text: prompt },
      {
        type: 'image_url',
        image_url: {
          url: `data:image/jpeg;base64,${modelImageBase64}`
        }
      },
      {
        type: 'image_url',
        image_url: {
          url: `data:${productImageMimeType};base64,${productImageBase64}`
        }
      }
    ];

    // Add pose reference image if provided
    if (poseImageBase64) {
      contentArray.push({
        type: 'image_url',
        image_url: {
          url: `data:image/jpeg;base64,${poseImageBase64}`
        }
      });
    }

    // Add background reference image if provided
    if (backgroundImageBase64) {
      contentArray.push({
        type: 'image_url',
        image_url: {
          url: `data:image/jpeg;base64,${backgroundImageBase64}`
        }
      });
    }

    // Add logo image if provided
    if (logoImageBase64 && logoMimeType) {
      contentArray.push({
        type: 'image_url',
        image_url: {
          url: `data:${logoMimeType};base64,${logoImageBase64}`
        }
      });
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: contentArray
          }
        ],
        modalities: ['image', 'text']
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Lovable AI credits exceeded. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`Lovable AI Gateway returned ${response.status}`);
    }

    const data = await response.json();
    console.log('Lovable AI Gateway response:', JSON.stringify(data, null, 2));
    
    // Try multiple paths to find the image
    let imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    // Fallback: check if image is in content
    if (!imageUrl && data.choices?.[0]?.message?.content) {
      const content = data.choices[0].message.content;
      if (typeof content === 'string' && content.startsWith('data:image')) {
        imageUrl = content;
      }
    }
    
    // Fallback: check direct image_url in message
    if (!imageUrl && data.choices?.[0]?.message?.image_url?.url) {
      imageUrl = data.choices[0].message.image_url.url;
    }
    
    if (!imageUrl) {
      console.error('Could not find image in response. Full response:', JSON.stringify(data));
      throw new Error('No image returned from AI. Response structure unexpected.');
    }

    return new Response(
      JSON.stringify({ success: true, imageUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-product-image:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
