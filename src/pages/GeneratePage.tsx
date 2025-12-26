import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, ArrowRight, Sparkles, Trash2, Check, Camera } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { generateImageWithGemini } from "@/lib/gemini-api";
import { useNavigate } from "react-router-dom";

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
import sittingCasual from "@/assets/poses/sitting-casual.jpg";
import profileView from "@/assets/poses/profile-view.jpg";
import threeQuarterTurn from "@/assets/poses/three-quarter-turn.jpg";
import overShoulder from "@/assets/poses/over-shoulder.jpg";
import handOnHip from "@/assets/poses/hand-on-hip.jpg";
import handsOnHips from "@/assets/poses/hands-on-hips.jpg";
import dynamicMovement from "@/assets/poses/dynamic-movement.jpg";
import kneeling from "@/assets/poses/kneeling.jpg";
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
  theme: "lifestyle" | "luxury" | "minimalist" | "natural" | "urban";
}

interface Theme {
  id: string;
  name: string;
  description: string;
}

interface ProductType {
  id: string;
  name: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  industry: string;
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

const industries = [
  { id: "apparel", name: "Apparel/Clothing" }
];

const categories: Category[] = [
  { id: "women", name: "Women", industry: "apparel" },
  { id: "men", name: "Men", industry: "apparel" },
  { id: "kids", name: "Kids", industry: "apparel" },
];

const productTypes: ProductType[] = [
  { id: "kurti", name: "Kurti", category: "women" },
  { id: "saree", name: "Saree", category: "women" },
  { id: "lehenga", name: "Lehenga", category: "women" },
  { id: "dress", name: "Dress", category: "women" },
  { id: "top", name: "Top", category: "women" },
  { id: "shirt", name: "Shirt", category: "men" },
  { id: "t-shirt", name: "T-Shirt", category: "men" },
  { id: "jeans", name: "Jeans", category: "men" },
  { id: "kurta", name: "Kurta", category: "men" },
  { id: "kids-dress", name: "Dress", category: "kids" },
  { id: "kids-shirt", name: "Shirt", category: "kids" },
];

const themes: Theme[] = [
  { id: "lifestyle", name: "Lifestyle", description: "Casual, everyday settings perfect for relatable product shots" },
  { id: "luxury", name: "Luxury", description: "Premium, high-end settings for sophisticated appeal" },
  { id: "minimalist", name: "Minimalist", description: "Clean, simple backgrounds that highlight your product" },
  { id: "natural", name: "Natural", description: "Outdoor, nature-inspired settings for organic feel" },
  { id: "urban", name: "Urban/Modern", description: "Contemporary city settings with modern edge" },
];

const backgrounds: Background[] = [
  // Lifestyle Theme
  { id: "cafe", name: "Cafe Lifestyle", preview: cafeLifestyle, type: "styled", theme: "lifestyle" },
  { id: "lifestyle", name: "Lifestyle", preview: lifestyle, type: "styled", theme: "lifestyle" },
  { id: "retail", name: "Retail Store", preview: retailStore, type: "styled", theme: "lifestyle" },
  { id: "office", name: "Modern Office", preview: modernOffice, type: "styled", theme: "lifestyle" },
  { id: "rooftop", name: "Rooftop Terrace", preview: rooftopTerrace, type: "styled", theme: "lifestyle" },
  { id: "urban-street", name: "Urban Street", preview: urbanStreet, type: "styled", theme: "lifestyle" },
  
  // Luxury Theme
  { id: "luxury", name: "Luxury", preview: luxury, type: "styled", theme: "luxury" },
  { id: "marble", name: "Marble Surface", preview: marbleSurface, type: "styled", theme: "luxury" },
  { id: "gallery", name: "Art Gallery", preview: artGallery, type: "styled", theme: "luxury" },
  { id: "vintage", name: "Vintage Architecture", preview: vintageArchitecture, type: "styled", theme: "luxury" },
  { id: "runway", name: "Fashion Runway", preview: fashionRunway, type: "styled", theme: "luxury" },
  
  // Minimalist Theme
  { id: "minimalist", name: "Minimalist", preview: minimalist, type: "styled", theme: "minimalist" },
  { id: "studio", name: "Studio Gray", preview: studioGray, type: "styled", theme: "minimalist" },
  { id: "white", name: "Clean White", preview: "/placeholder.svg", type: "white", theme: "minimalist" },
  { id: "transparent", name: "Transparent", preview: "/placeholder.svg", type: "transparent", theme: "minimalist" },
  { id: "gradient", name: "Gradient Abstract", preview: gradientAbstract, type: "styled", theme: "minimalist" },
  { id: "fabric", name: "Textured Fabric", preview: texturedFabric, type: "styled", theme: "minimalist" },
  
  // Natural Theme
  { id: "nature", name: "Natural", preview: natural, type: "styled", theme: "natural" },
  { id: "botanical", name: "Botanical Garden", preview: botanicalGarden, type: "styled", theme: "natural" },
  { id: "beach", name: "Beach Scene", preview: beachScene, type: "styled", theme: "natural" },
  { id: "mountain", name: "Mountain Landscape", preview: mountainLandscape, type: "styled", theme: "natural" },
  { id: "desert", name: "Desert Sand", preview: desertSand, type: "styled", theme: "natural" },
  
  // Urban Theme
  { id: "neon", name: "Neon Urban", preview: neonUrban, type: "styled", theme: "urban" },
  { id: "brick", name: "Brick Wall", preview: brickWall, type: "styled", theme: "urban" },
  { id: "warehouse", name: "Warehouse Industrial", preview: warehouseIndustrial, type: "styled", theme: "urban" },
  { id: "wood", name: "Wood Floor", preview: woodFloor, type: "styled", theme: "urban" },
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

const GeneratePage = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProductType, setSelectedProductType] = useState<string>("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedPose, setSelectedPose] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedBackground, setSelectedBackground] = useState<string>("");
  const [addLogo, setAddLogo] = useState<boolean>(false);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [logoImagePreview, setLogoImagePreview] = useState<string>("");
  const [logoPlacement, setLogoPlacement] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string>("");

  // Dropzone for product image upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setProductImage(file);
        setProductImagePreview(URL.createObjectURL(file));
        toast.success("Product image uploaded successfully!");
      }
    },
    onDropRejected: () => {
      toast.error("Please upload a valid image file (JPG, PNG, or WEBP)");
    }
  });

  // Dropzone for logo upload
  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps, isDragActive: isLogoDragActive } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setLogoImage(file);
        setLogoImagePreview(URL.createObjectURL(file));
        toast.success("Logo uploaded successfully!");
      }
    },
    onDropRejected: () => {
      toast.error("Please upload a valid logo image file (JPG, PNG, or WEBP)");
    }
  });

  // Filter data based on selections
  const filteredCategories = categories.filter(c => c.industry === selectedIndustry);
  const filteredProductTypes = productTypes.filter(pt => pt.category === selectedCategory);
  const selectedModelData = models.find(m => m.id === selectedModel);
  const filteredPoses = selectedModelData ? poses.filter(p => p.gender === selectedModelData.gender) : [];
  const filteredBackgrounds = backgrounds.filter(bg => bg.theme === selectedTheme);

  const handleGenerate = async () => {
    if (!selectedIndustry || !selectedCategory || !selectedProductType || !productImage || !selectedModel || !selectedPose || !selectedTheme || !selectedBackground) {
      toast.error("Please complete all steps before generating");
      return;
    }

    // Validate logo requirements if user wants to add logo
    if (addLogo && (!logoImage || !logoPlacement)) {
      toast.error("Please upload logo and select placement");
      return;
    }

    setIsGenerating(true);
    
    try {
      const selectedModelData = models.find(m => m.id === selectedModel);
      const selectedBackgroundData = backgrounds.find(b => b.id === selectedBackground);
      const selectedPoseData = poses.find(p => p.id === selectedPose);

      const result = await generateImageWithGemini({
        productImage,
        modelImageUrl: selectedModelData!.preview,
        model: selectedModelData!.name,
        background: selectedBackgroundData!.name,
        backgroundImageUrl: selectedBackgroundData!.preview,
        pose: selectedPoseData!.name,
        poseImageUrl: selectedPoseData!.preview,
        logo: addLogo ? logoImage : undefined,
        logoPlacement: addLogo ? logoPlacement : undefined
      });

      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
        toast.success("Image generated successfully!");
      } else {
        toast.error(result.error || "Failed to generate image");
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
    setSelectedIndustry("");
    setSelectedCategory("");
    setSelectedProductType("");
    setProductImage(null);
    setProductImagePreview("");
    setSelectedModel("");
    setSelectedPose("");
    setSelectedTheme("");
    setSelectedBackground("");
    setAddLogo(false);
    setLogoImage(null);
    setLogoImagePreview("");
    setLogoPlacement("");
    setGeneratedImage("");
  };

  const step1Complete = selectedIndustry !== "";
  const step2Complete = selectedCategory !== "";
  const step3Complete = selectedProductType !== "";
  const step4Complete = productImage !== null;
  const step5Complete = selectedModel !== "";
  const step6Complete = selectedPose !== "";
  const step7Complete = selectedTheme !== "";
  const step8Complete = selectedBackground !== "";
  const step9Complete = !addLogo || (addLogo && logoImage !== null && logoPlacement !== "");

  // Calculate completion percentage
  const completedSteps = [step1Complete, step2Complete, step3Complete, step4Complete, step5Complete, step6Complete, step7Complete, step8Complete, step9Complete].filter(Boolean).length;
  const completionPercentage = (completedSteps / 9) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <Camera className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold text-foreground">PhotoAI</span>
            </a>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Generate Professional Product Photo</h1>
          <p className="text-muted-foreground text-lg">Complete each step to create your AI-powered product image</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm font-bold text-primary">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-2 mb-12 overflow-x-auto">
          {[
            { num: 1, label: "Industry", complete: step1Complete },
            { num: 2, label: "Category", complete: step2Complete },
            { num: 3, label: "Product", complete: step3Complete },
            { num: 4, label: "Upload", complete: step4Complete },
            { num: 5, label: "Model", complete: step5Complete },
            { num: 6, label: "Pose", complete: step6Complete },
            { num: 7, label: "Theme", complete: step7Complete },
            { num: 8, label: "Background", complete: step8Complete },
            { num: 9, label: "Logo", complete: step9Complete },
          ].map((step, idx) => (
            <div key={step.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step.complete 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {step.complete ? <Check className="w-5 h-5" /> : step.num}
                </div>
                <span className="text-xs mt-2 text-muted-foreground">{step.label}</span>
              </div>
              {idx < 8 && (
                <div className={`w-16 h-0.5 mx-2 transition-all ${
                  step.complete ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Industry */}
        <Card className={`mb-8 border-2 transition-all ${step1Complete ? 'border-primary/50' : 'border-border'}`}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">1</span>
                  Select Industry
                </h3>
                <p className="text-muted-foreground">Choose your product industry to get started</p>
              </div>
              {step1Complete && <Badge variant="default" className="bg-primary"><Check className="w-3 h-3 mr-1" /> Complete</Badge>}
            </div>
            
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-full md:w-96">
                <SelectValue placeholder="Select an industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry.id} value={industry.id}>
                    {industry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Step 2: Select Category */}
        <Card className={`mb-8 border-2 transition-all ${!step1Complete ? 'opacity-50 pointer-events-none' : step2Complete ? 'border-primary/50' : 'border-border'}`}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">2</span>
                  Select Category
                </h3>
                <p className="text-muted-foreground">Choose the category of your product</p>
              </div>
              {step2Complete && <Badge variant="default" className="bg-primary"><Check className="w-3 h-3 mr-1" /> Complete</Badge>}
            </div>
            
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
              disabled={!step1Complete}
            >
              <SelectTrigger className="w-full md:w-96">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Step 3: Select Product Type */}
        <Card className={`mb-8 border-2 transition-all ${!step2Complete ? 'opacity-50 pointer-events-none' : step3Complete ? 'border-primary/50' : 'border-border'}`}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">3</span>
                  Select Product Type
                </h3>
                <p className="text-muted-foreground">Choose the specific type of product</p>
              </div>
              {step3Complete && <Badge variant="default" className="bg-primary"><Check className="w-3 h-3 mr-1" /> Complete</Badge>}
            </div>
            
            <Select 
              value={selectedProductType} 
              onValueChange={setSelectedProductType}
              disabled={!step2Complete}
            >
              <SelectTrigger className="w-full md:w-96">
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent>
                {filteredProductTypes.map((productType) => (
                  <SelectItem key={productType.id} value={productType.id}>
                    {productType.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Step 4: Upload Product Image */}
        <Card className={`mb-8 border-2 transition-all ${!step3Complete ? 'opacity-50 pointer-events-none' : step4Complete ? 'border-primary/50' : 'border-border'}`}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">4</span>
                  Upload Product Image
                </h3>
                <p className="text-muted-foreground">Upload a clear image of your product</p>
              </div>
              {step4Complete && <Badge variant="default" className="bg-primary"><Check className="w-3 h-3 mr-1" /> Complete</Badge>}
            </div>

            {!productImage ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                  isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                } ${!step3Complete ? "pointer-events-none" : ""}`}
              >
                <input {...getInputProps()} disabled={!step3Complete} />
                <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  {isDragActive ? "Drop your image here" : "Drag & drop your product image"}
                </p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                <p className="text-xs text-muted-foreground">Supports: JPG, PNG, WEBP (max 10MB)</p>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <img src={productImagePreview} alt="Product preview" className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="font-medium">{productImage.name}</p>
                  <p className="text-sm text-muted-foreground">{(productImage.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setProductImage(null);
                    setProductImagePreview("");
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Step 5: Choose Model */}
        <Card className={`mb-8 border-2 transition-all ${!step4Complete ? 'opacity-50 pointer-events-none' : step5Complete ? 'border-primary/50' : 'border-border'}`}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">5</span>
                  Choose Model
                </h3>
                <p className="text-muted-foreground">Select from 12+ diverse models (ages 20-50, including Indian origin)</p>
              </div>
              {step5Complete && <Badge variant="default" className="bg-primary"><Check className="w-3 h-3 mr-1" /> Complete</Badge>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {models.map((model) => (
                <Card
                  key={model.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedModel === model.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => step4Complete && setSelectedModel(model.id)}
                >
                  <div className="p-4 text-center">
                    <div className="w-full aspect-square mb-3 rounded-lg overflow-hidden">
                      <img src={model.preview} alt={model.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="font-semibold text-sm">{model.name}</p>
                    <p className="text-xs text-muted-foreground">{model.ethnicity}</p>
                    <p className="text-xs text-muted-foreground">{model.age}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Step 6: Choose Pose */}
        <Card className={`mb-8 border-2 transition-all ${!step5Complete ? 'opacity-50 pointer-events-none' : step6Complete ? 'border-primary/50' : 'border-border'}`}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">6</span>
                  Choose Pose
                </h3>
                <p className="text-muted-foreground">Select a pose that best showcases your product</p>
              </div>
              {step6Complete && <Badge variant="default" className="bg-primary"><Check className="w-3 h-3 mr-1" /> Complete</Badge>}
            </div>

            {filteredPoses.length > 0 ? (
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {filteredPoses.map((pose) => (
                  <Card
                    key={pose.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedPose === pose.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => step5Complete && setSelectedPose(pose.id)}
                  >
                    <div className="p-3 text-center">
                      <div className="w-full aspect-square mb-2 rounded-lg overflow-hidden">
                        <img src={pose.preview} alt={pose.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs font-medium truncate">{pose.name}</p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">Please select a model first to see available poses</p>
            )}
          </div>
        </Card>

        {/* Step 7: Choose Theme */}
        <Card className={`mb-8 border-2 transition-all ${!step6Complete ? 'opacity-50 pointer-events-none' : step7Complete ? 'border-primary/50' : 'border-border'}`}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">7</span>
                  Choose Theme
                </h3>
                <p className="text-muted-foreground">Select a theme style for your product background</p>
              </div>
              {step7Complete && <Badge variant="default" className="bg-primary"><Check className="w-3 h-3 mr-1" /> Complete</Badge>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <Card
                  key={theme.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedTheme === theme.id ? "ring-2 ring-primary shadow-md" : ""
                  }`}
                  onClick={() => step6Complete && setSelectedTheme(theme.id)}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-lg">{theme.name}</h4>
                      {selectedTheme === theme.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{theme.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Step 8: Choose Background */}
        <Card className={`mb-8 border-2 transition-all ${!step7Complete ? 'opacity-50 pointer-events-none' : step8Complete ? 'border-primary/50' : 'border-border'}`}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">8</span>
                  Choose Background
                </h3>
                <p className="text-muted-foreground">Select the perfect background from the {themes.find(t => t.id === selectedTheme)?.name} theme</p>
              </div>
              {step8Complete && <Badge variant="default" className="bg-primary"><Check className="w-3 h-3 mr-1" /> Complete</Badge>}
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
              {filteredBackgrounds.map((bg) => (
                <Card
                  key={bg.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedBackground === bg.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => step7Complete && setSelectedBackground(bg.id)}
                >
                  <div className="p-3 text-center">
                    <div className="w-full aspect-square mb-2 rounded-lg overflow-hidden bg-muted">
                      {bg.type !== "transparent" && bg.type !== "white" && (
                        <img src={bg.preview} alt={bg.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <p className="text-xs font-medium truncate">{bg.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Step 9: Logo Options */}
        <Card className={`mb-8 border-2 transition-all ${!step8Complete ? 'opacity-50 pointer-events-none' : step9Complete ? 'border-primary/50' : 'border-border'}`}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">9</span>
                  Logo Options (Optional)
                </h3>
                <p className="text-muted-foreground">Add your brand logo to the generated image</p>
              </div>
              {step9Complete && <Badge variant="default" className="bg-primary"><Check className="w-3 h-3 mr-1" /> Complete</Badge>}
            </div>

            {/* Checkbox to enable logo */}
            <div className="flex items-center space-x-2 mb-6">
              <Checkbox 
                id="add-logo" 
                checked={addLogo} 
                onCheckedChange={(checked) => {
                  setAddLogo(checked as boolean);
                  if (!checked) {
                    setLogoImage(null);
                    setLogoImagePreview("");
                    setLogoPlacement("");
                  }
                }}
                disabled={!step8Complete}
              />
              <label
                htmlFor="add-logo"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Do you want to add your logo to the generated image?
              </label>
            </div>

            {/* Logo Upload */}
            {addLogo && (
              <div className="space-y-6">
                {!logoImage ? (
                  <div
                    {...getLogoRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                      isLogoDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input {...getLogoInputProps()} />
                    <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-base font-medium mb-2">
                      {isLogoDragActive ? "Drop your logo here" : "Drag & drop your logo"}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">or click to browse files</p>
                    <p className="text-xs text-muted-foreground">Supports: JPG, PNG, WEBP (max 10MB)</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <img src={logoImagePreview} alt="Logo preview" className="w-20 h-20 object-contain rounded-lg bg-background p-2" />
                    <div className="flex-1">
                      <p className="font-medium">{logoImage.name}</p>
                      <p className="text-sm text-muted-foreground">{(logoImage.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setLogoImage(null);
                        setLogoImagePreview("");
                        setLogoPlacement("");
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* Logo Placement Selection */}
                {logoImage && (
                  <div>
                    <label className="text-sm font-medium mb-3 block">Select Logo Placement</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: "top-left", label: "Top Left" },
                        { id: "top-right", label: "Top Right" },
                        { id: "bottom-left", label: "Bottom Left" },
                        { id: "bottom-right", label: "Bottom Right" },
                      ].map((placement) => (
                        <Card
                          key={placement.id}
                          className={`cursor-pointer transition-all hover:shadow-md p-4 text-center ${
                            logoPlacement === placement.id ? "ring-2 ring-primary bg-primary/5" : ""
                          }`}
                          onClick={() => setLogoPlacement(placement.id)}
                        >
                          <p className="text-sm font-medium">{placement.label}</p>
                          {logoPlacement === placement.id && (
                            <Check className="w-4 h-4 mx-auto mt-2 text-primary" />
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Generate Button */}
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={handleGenerate}
            disabled={!step9Complete || isGenerating}
            size="lg"
            className="min-w-[200px]"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Image
              </>
            )}
          </Button>
          {(step1Complete || step2Complete || step3Complete || step4Complete || step5Complete || step6Complete || step7Complete || step8Complete) && (
            <Button variant="outline" onClick={resetFlow}>
              Reset All
            </Button>
          )}
        </div>

        {/* Generated Image */}
        {generatedImage && (
          <Card className="mt-8">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">Your Generated Image</h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <img src={generatedImage} alt="Generated" className="w-full rounded-lg shadow-elegant" />
                </div>
                <div className="flex-1 flex flex-col justify-center gap-4">
                  <Button className="w-full">
                    Download Image
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button variant="outline" onClick={resetFlow} className="w-full">
                    Generate Another
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GeneratePage;
