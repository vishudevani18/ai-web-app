import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, ArrowRight, ArrowLeft, Sparkles, X, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { generateImageWithGemini } from "@/lib/gemini-api";

// Import model images
import emmaImage from "@/assets/models/emma-female-caucasian.jpg";
import zaraImage from "@/assets/models/zara-female-african.jpg";
import priyaImage from "@/assets/models/priya-female-south-asian.jpg";
import sofiaImage from "@/assets/models/sofia-female-hispanic.jpg";
import yukiImage from "@/assets/models/yuki-female-east-asian.jpg";

import ananyaImage from "@/assets/models/ananya-female-indian-young.jpg";
import kavyaImage from "@/assets/models/kavya-female-indian-mid.jpg";
import meeraImage from "@/assets/models/meera-female-indian-mature.jpg";
import nicoleImage from "@/assets/models/nicole-female-mature-40s.jpg";
import sanyaImage from "@/assets/models/sanya-female-indian-40s.jpg";
import mariaImage from "@/assets/models/maria-female-hispanic-young.jpg";
import amaraImage from "@/assets/models/amara-female-african.jpg";


import elegantFemale from "@/assets/poses/elegant-female.jpg";
import casualChicFemale from "@/assets/poses/casual-chic-female.jpg";
import sportyFemale from "@/assets/poses/sporty-female.jpg";
import businessFemale from "@/assets/poses/business-female.jpg";
import standingStraight from "@/assets/poses/standing-straight.jpg";
import walkingForward from "@/assets/poses/walking-forward.jpg";
import handsInPockets from "@/assets/poses/hands-in-pockets.jpg";
import armsCrossed from "@/assets/poses/arms-crossed.jpg";
import leaningWall from "@/assets/poses/leaning-wall.jpg";
import sittingCasual from "@/assets/poses/sitting-casual.jpg";
import profileView from "@/assets/poses/profile-view.jpg";
import threeQuarterTurn from "@/assets/poses/three-quarter-turn.jpg";
import overShoulder from "@/assets/poses/over-shoulder.jpg";
import handOnHip from "@/assets/poses/hand-on-hip.jpg";
import oneLegForward from "@/assets/poses/one-leg-forward.jpg";
import handsOnHips from "@/assets/poses/hands-on-hips.jpg";
import casualSlouch from "@/assets/poses/casual-slouch.jpg";
import dynamicMovement from "@/assets/poses/dynamic-movement.jpg";
import handsBehindHead from "@/assets/poses/hands-behind-head.jpg";
import kneeling from "@/assets/poses/kneeling.jpg";
import jumping from "@/assets/poses/jumping.jpg";
import twirling from "@/assets/poses/twirling.jpg";
import reachingUp from "@/assets/poses/reaching-up.jpg";
import lookingDown from "@/assets/poses/looking-down.jpg";

// Import background images
import studioGray from "@/assets/backgrounds/studio-gray.jpg";
import minimalist from "@/assets/backgrounds/minimalist.jpg";
import lifestyle from "@/assets/backgrounds/lifestyle.jpg";
import luxury from "@/assets/backgrounds/luxury.jpg";
import natural from "@/assets/backgrounds/natural.jpg";
import urbanStreet from "@/assets/backgrounds/urban-street.jpg";
import gradientAbstract from "@/assets/backgrounds/gradient-abstract.jpg";
import texturedFabric from "@/assets/backgrounds/textured-fabric.jpg";
import modernOffice from "@/assets/backgrounds/modern-office.jpg";
import cafeLifestyle from "@/assets/backgrounds/cafe-lifestyle.jpg";
import retailStore from "@/assets/backgrounds/retail-store.jpg";
import fashionRunway from "@/assets/backgrounds/fashion-runway.jpg";
import brickWall from "@/assets/backgrounds/brick-wall.jpg";
import marbleSurface from "@/assets/backgrounds/marble-surface.jpg";
import woodFloor from "@/assets/backgrounds/wood-floor.jpg";
import desertSand from "@/assets/backgrounds/desert-sand.jpg";
import beachScene from "@/assets/backgrounds/beach-scene.jpg";
import botanicalGarden from "@/assets/backgrounds/botanical-garden.jpg";
import mountainLandscape from "@/assets/backgrounds/mountain-landscape.jpg";
import artGallery from "@/assets/backgrounds/art-gallery.jpg";
import warehouseIndustrial from "@/assets/backgrounds/warehouse-industrial.jpg";
import rooftopTerrace from "@/assets/backgrounds/rooftop-terrace.jpg";
import vintageArchitecture from "@/assets/backgrounds/vintage-architecture.jpg";
import neonUrban from "@/assets/backgrounds/neon-urban.jpg";

interface Model {
  id: string;
  name: string;
  gender: "male" | "female";
  age: string;
  ethnicity: string;
  preview: string;
}

interface Background {
  id: string;
  name: string;
  preview: string;
  type: "transparent" | "white" | "styled";
}

interface Pose {
  id: string;
  name: string;
  gender: "male" | "female";
  preview: string;
}

const models: Model[] = [
  { id: "f1", name: "Emma", gender: "female", age: "22-28", ethnicity: "Caucasian", preview: emmaImage },
  { id: "f2", name: "Zara", gender: "female", age: "25-30", ethnicity: "African", preview: zaraImage },
  { id: "f3", name: "Priya", gender: "female", age: "20-25", ethnicity: "South Asian", preview: priyaImage },
  { id: "f4", name: "Sofia", gender: "female", age: "30-35", ethnicity: "Hispanic", preview: sofiaImage },
  { id: "f5", name: "Yuki", gender: "female", age: "25-30", ethnicity: "East Asian", preview: yukiImage },
  { id: "f6", name: "Ananya", gender: "female", age: "20-24", ethnicity: "Indian", preview: ananyaImage },
  { id: "f7", name: "Kavya", gender: "female", age: "26-30", ethnicity: "Indian", preview: kavyaImage },
  { id: "f8", name: "Meera", gender: "female", age: "32-36", ethnicity: "Indian", preview: meeraImage },
  { id: "f9", name: "Nicole", gender: "female", age: "38-42", ethnicity: "Caucasian", preview: nicoleImage },
  { id: "f10", name: "Sanya", gender: "female", age: "42-48", ethnicity: "Indian", preview: sanyaImage },
  { id: "f11", name: "Maria", gender: "female", age: "24-28", ethnicity: "Hispanic", preview: mariaImage },
  { id: "f12", name: "Amara", gender: "female", age: "25-29", ethnicity: "African", preview: amaraImage },
];

const backgrounds: Background[] = [
  { id: "transparent", name: "Transparent", preview: "/placeholder.svg", type: "transparent" },
  { id: "white", name: "Clean White", preview: "/placeholder.svg", type: "white" },
  { id: "studio", name: "Studio Gray", preview: studioGray, type: "styled" },
  { id: "minimalist", name: "Minimalist", preview: minimalist, type: "styled" },
  { id: "lifestyle", name: "Lifestyle", preview: lifestyle, type: "styled" },
  { id: "luxury", name: "Luxury", preview: luxury, type: "styled" },
  { id: "nature", name: "Natural", preview: natural, type: "styled" },
  { id: "urban-street", name: "Urban Street", preview: urbanStreet, type: "styled" },
  { id: "gradient", name: "Gradient Abstract", preview: gradientAbstract, type: "styled" },
  { id: "fabric", name: "Textured Fabric", preview: texturedFabric, type: "styled" },
  { id: "office", name: "Modern Office", preview: modernOffice, type: "styled" },
  { id: "cafe", name: "Cafe Lifestyle", preview: cafeLifestyle, type: "styled" },
  { id: "retail", name: "Retail Store", preview: retailStore, type: "styled" },
  { id: "runway", name: "Fashion Runway", preview: fashionRunway, type: "styled" },
  { id: "brick", name: "Brick Wall", preview: brickWall, type: "styled" },
  { id: "marble", name: "Marble Surface", preview: marbleSurface, type: "styled" },
  { id: "wood", name: "Wood Floor", preview: woodFloor, type: "styled" },
  { id: "desert", name: "Desert Sand", preview: desertSand, type: "styled" },
  { id: "beach", name: "Beach Scene", preview: beachScene, type: "styled" },
  { id: "botanical", name: "Botanical Garden", preview: botanicalGarden, type: "styled" },
  { id: "mountain", name: "Mountain Landscape", preview: mountainLandscape, type: "styled" },
  { id: "gallery", name: "Art Gallery", preview: artGallery, type: "styled" },
  { id: "warehouse", name: "Warehouse Industrial", preview: warehouseIndustrial, type: "styled" },
  { id: "rooftop", name: "Rooftop Terrace", preview: rooftopTerrace, type: "styled" },
  { id: "vintage", name: "Vintage Architecture", preview: vintageArchitecture, type: "styled" },
  { id: "neon", name: "Neon Urban", preview: neonUrban, type: "styled" },
];

const poses: Pose[] = [
  { id: "elegant", name: "Elegant", gender: "female", preview: elegantFemale },
  { id: "casual-chic", name: "Casual Chic", gender: "female", preview: casualChicFemale },
  { id: "sporty", name: "Sporty", gender: "female", preview: sportyFemale },
  { id: "business", name: "Business", gender: "female", preview: businessFemale },
  { id: "sitting-casual", name: "Sitting Casual", gender: "female", preview: sittingCasual },
  { id: "profile-view", name: "Profile View", gender: "female", preview: profileView },
  { id: "three-quarter", name: "Three Quarter Turn", gender: "female", preview: threeQuarterTurn },
  { id: "over-shoulder", name: "Over Shoulder", gender: "female", preview: overShoulder },
  { id: "hand-on-hip", name: "Hand on Hip", gender: "female", preview: handOnHip },
  { id: "hands-on-hips", name: "Hands on Hips", gender: "female", preview: handsOnHips },
  { id: "dynamic-movement", name: "Dynamic Movement", gender: "female", preview: dynamicMovement },
  { id: "kneeling", name: "Kneeling", gender: "female", preview: kneeling },
  { id: "twirling", name: "Twirling", gender: "female", preview: twirling },
  { id: "reaching-up", name: "Reaching Up", gender: "female", preview: reachingUp },
  { id: "looking-down", name: "Looking Down", gender: "female", preview: lookingDown },
];

interface ImageGeneratorProps {
  onClose: () => void;
}

const ImageGenerator = ({ onClose }: ImageGeneratorProps) => {
  const [step, setStep] = useState(1);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedBackground, setSelectedBackground] = useState<string>("");
  const [selectedPose, setSelectedPose] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string>("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB per file
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setProductImages(prev => [...prev, ...acceptedFiles]);
        if (productImages.length === 0) {
          setStep(2);
        }
      }
    },
    onDropRejected: (rejections) => {
      const reason = rejections[0]?.errors?.[0]?.message || 'File not accepted';
      toast.error(`Upload failed: ${reason}`);
    }
  });

  const selectedModelData = models.find(m => m.id === selectedModel);
  const filteredPoses = selectedModelData ? poses.filter(p => p.gender === selectedModelData.gender) : [];

  const handleGenerate = async () => {
    if (productImages.length === 0 || !selectedModel || !selectedBackground || !selectedPose) {
      toast.error("Please complete all steps before generating");
      return;
    }

    setIsGenerating(true);
    
    try {
      const selectedModelData = models.find(m => m.id === selectedModel);
      const selectedBackgroundData = backgrounds.find(b => b.id === selectedBackground);
      const selectedPoseData = poses.find(p => p.id === selectedPose);

      // Use the first image for generation (can be enhanced to use multiple)
      const result = await generateImageWithGemini({
        productImage: productImages[0],
        modelImageUrl: selectedModelData?.preview || '',
        model: `${selectedModelData?.name} - ${selectedModelData?.ethnicity} ${selectedModelData?.gender} (${selectedModelData?.age})`,
        background: selectedBackgroundData?.name || selectedBackground,
        backgroundImageUrl: selectedBackgroundData?.preview || '',
        pose: selectedPoseData?.name || selectedPose,
        poseImageUrl: selectedPoseData?.preview || ''
      });

      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
        toast.success("Image generated successfully!");
      } else {
        throw new Error(result.error || "Failed to generate image");
      }
    } catch (error) {
      console.error("Generation error:", error);
      const message = error instanceof Error ? error.message : "Failed to generate image. Please try again.";
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setProductImages([]);
    setSelectedModel("");
    setSelectedBackground("");
    setSelectedPose("");
    setGeneratedImage("");
  };

  const removeImage = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Generate Professional Product Photo</h2>
              <p className="text-muted-foreground">Follow the steps to create your AI-powered product image</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress */}
          <div className="flex items-center space-x-4 mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    step > stepNumber ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Step 1: Upload Product Images</h3>
                <p className="text-muted-foreground">Upload multiple product photos for more accurate AI generation (max 5 images)</p>
              </div>
              
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">
                  {isDragActive ? "Drop your images here" : "Drag & drop product images"}
                </p>
                <p className="text-muted-foreground mt-2">or click to browse files</p>
                <Badge variant="secondary" className="mt-4">
                  Supports JPG, PNG, WEBP up to 10MB each (max 5 images)
                </Badge>
              </div>

              {productImages.length > 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {productImages.map((file, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => setStep(2)}>
                    Continue to Model Selection ({productImages.length} {productImages.length === 1 ? 'image' : 'images'})
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Step 2: Choose a Model</h3>
                <p className="text-muted-foreground">Select from 25+ diverse models (ages 20-50, including Indian origin)</p>
              </div>
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {models.map((model) => (
                  <Card
                    key={model.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedModel === model.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <div className="p-4 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-full flex items-center justify-center">
                        <img src={model.preview} alt={model.name} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <h4 className="font-medium">{model.name}</h4>
                      <p className="text-xs text-muted-foreground">{model.age}</p>
                      <p className="text-xs text-muted-foreground">{model.ethnicity}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {model.gender}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>

              {selectedModel && (
                <div className="text-center">
                  <Button onClick={() => setStep(3)}>
                    Continue to Background Selection
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Step 3: Select Background & Pose</h3>
                  <p className="text-muted-foreground">Choose background and pose style for your product photo</p>
                </div>
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Background Options</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {backgrounds.map((bg) => (
                      <Card
                        key={bg.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedBackground === bg.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedBackground(bg.id)}
                      >
                        <div className="p-3 text-center">
                          <div className="w-full h-20 mb-2 bg-muted rounded flex items-center justify-center">
                            <img src={bg.preview} alt={bg.name} className="w-full h-full rounded object-cover" />
                          </div>
                          <p className="text-sm font-medium">{bg.name}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">
                    Pose Options {selectedModelData && `(${selectedModelData.gender})`}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {filteredPoses.map((pose) => (
                      <Card
                        key={pose.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedPose === pose.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedPose(pose.id)}
                      >
                        <div className="p-3 text-center">
                          <div className="w-full h-20 mb-2 bg-muted rounded flex items-center justify-center">
                            <img src={pose.preview} alt={pose.name} className="w-full h-full rounded object-cover" />
                          </div>
                          <p className="text-sm font-medium">{pose.name}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {selectedBackground && selectedPose && (
                <div className="text-center">
                  <Button onClick={() => setStep(4)}>
                    Continue to Generate
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Step 4: Generate Image</h3>
                  <p className="text-muted-foreground">Review your selections and generate your professional product photo</p>
                </div>
                <Button variant="outline" onClick={() => setStep(3)}>
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
              </div>

              {/* Summary */}
              <Card className="p-4">
                <h4 className="font-medium mb-3">Your Selections</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Product Images</p>
                    <p className="font-medium">{productImages.length} {productImages.length === 1 ? 'image' : 'images'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Model</p>
                    <p className="font-medium">{selectedModelData?.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Background</p>
                    <p className="font-medium">{backgrounds.find(b => b.id === selectedBackground)?.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pose</p>
                    <p className="font-medium">{poses.find(p => p.id === selectedPose)?.name}</p>
                  </div>
                </div>
              </Card>

              {!generatedImage ? (
                <div className="text-center">
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating}
                    className="cta-button text-lg"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 w-5 h-5 animate-spin" />
                        Generating Image...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 w-5 h-5" />
                        Generate Professional Photo
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    This will take about 30-60 seconds
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Your Generated Image</h4>
                    <div className="max-w-md mx-auto">
                      <img 
                        src={generatedImage} 
                        alt="Generated product photo" 
                        className="w-full rounded-lg shadow-lg"
                      />
                    </div>
                  </Card>
                  
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={resetFlow}>
                      Generate Another
                    </Button>
                    <Button asChild>
                      <a href={generatedImage} download="product-photo.jpg">
                        Download Image
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ImageGenerator;