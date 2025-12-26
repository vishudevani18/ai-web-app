import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Sparkles, AlertCircle, Download, RefreshCw, Trash2, ChevronRight, Image, Check, Lock, ChevronLeft, Users } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { generateImageWithGemini } from "@/lib/gemini-api";

// Import model/face images (3 AI faces - Kavya, Meera, Sanya)
import kavyaImage from "@/assets/models/kavya-female-indian-mid.jpg";
import meeraImage from "@/assets/models/meera-female-indian-mature.jpg";
import sanyaImage from "@/assets/models/sanya-female-indian-40s.jpg";

// Import pose images - Saree poses (filtered selection)
import sareePose1 from "@/assets/poses/saree-pose-1.jpg";
import sareePose2 from "@/assets/poses/saree-pose-2.jpg";
import sareePose5 from "@/assets/poses/saree-pose-5.jpg";
import sareePose6 from "@/assets/poses/saree-pose-6.jpg";
import sareePose7 from "@/assets/poses/saree-pose-7.jpg";
import mannequinHandsClasped from "@/assets/poses/mannequin-hands-clasped.jpg";
import mannequinSidePose from "@/assets/poses/mannequin-side-pose.jpg";
import mannequinHandOnHip from "@/assets/poses/mannequin-hand-on-hip.jpg";

// Import theme preview images
import indoorThemePreview from "@/assets/themes/indoor-theme-preview.jpg";

// Import indoor theme background (only Bright Natural Window)
import brightNaturalWindow from "@/assets/backgrounds/bright-natural-window.jpg";

interface SelectOption {
  id: string;
  name: string;
  preview?: string;
  disabled?: boolean;
}

interface ThemeOption {
  id: string;
  name: string;
  preview: string;
  backgrounds: { id: string; name: string; preview: string }[];
}

// Industries
const industries: SelectOption[] = [
  { id: "apparel", name: "Apparel" },
];

// Categories based on industry
const categories: SelectOption[] = [
  { id: "women", name: "Women" },
  { id: "men", name: "Men", disabled: true },
];

// Product types for women's apparel (only sarees enabled for now)
const productTypes: SelectOption[] = [
  { id: "kurta-set", name: "Kurta Set", disabled: true },
  { id: "sarees", name: "Sarees" },
  { id: "dresses", name: "Dresses", disabled: true },
];

// Themes with their backgrounds (only Indoor theme with Bright Natural Window)
const themes: ThemeOption[] = [
  {
    id: "indoor",
    name: "Indoor",
    preview: indoorThemePreview,
    backgrounds: [
      { id: "indoor-14", name: "Bright Natural Window", preview: brightNaturalWindow },
    ],
  },
];

// 3 AI Faces - Kavya, Meera, and Sanya (South Indian models for sarees)
const aiFaces = [
  { id: "kavya", name: "Kavya", preview: kavyaImage },
  { id: "meera", name: "Meera", preview: meeraImage },
  { id: "sanya", name: "Sanya", preview: sanyaImage },
];

// Saree-specific poses (filtered selection)
const sareePoses = [
  { id: "saree-pose-1", name: "Hand on Hip", preview: sareePose1 },
  { id: "saree-pose-2", name: "Head Touch", preview: sareePose2 },
  { id: "saree-pose-5", name: "Walking Grace", preview: sareePose5 },
  { id: "saree-pose-6", name: "Arms Open", preview: sareePose6 },
  { id: "saree-pose-7", name: "Arms Crossed", preview: sareePose7 },
  { id: "mannequin-hands-clasped", name: "Hands Clasped", preview: mannequinHandsClasped },
  { id: "mannequin-side-pose", name: "Side Pose", preview: mannequinSidePose },
  { id: "mannequin-hand-on-hip", name: "Hands on Hip", preview: mannequinHandOnHip },
];

// Kurta set poses (placeholder - to be added later)
const kurtaPoses: { id: string; name: string; preview: string }[] = [];

// Dress poses (placeholder - to be added later)
const dressPoses: { id: string; name: string; preview: string }[] = [];

// Horizontal Carousel Component for single selection
interface CarouselProps {
  items: { id: string; name: string; preview: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
  itemSize?: "sm" | "md" | "lg";
}

const HorizontalCarousel = ({ items, selectedId, onSelect, itemSize = "md" }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  return (
    <div className="relative group">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-slate-50 -ml-4"
      >
        <ChevronLeft className="w-5 h-5 text-slate-600" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex-shrink-0 cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${sizeClasses[itemSize]} ${
              selectedId === item.id
                ? "border-teal-500 ring-2 ring-teal-500/20 scale-[1.02]"
                : "border-slate-200 hover:border-teal-300 hover:scale-[1.01]"
            }`}
          >
            <div className="relative w-full h-full">
              <img src={item.preview} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-white font-medium text-xs truncate">{item.name}</p>
              </div>
              {selectedId === item.id && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center shadow-md">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-slate-50 -mr-4"
      >
        <ChevronRight className="w-5 h-5 text-slate-600" />
      </button>

      <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
};

// Multi-select Carousel Component for poses
interface MultiSelectCarouselProps {
  items: { id: string; name: string; preview: string }[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  itemSize?: "sm" | "md" | "lg";
}

const MultiSelectCarousel = ({ items, selectedIds, onToggle, itemSize = "md" }: MultiSelectCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-28 h-36",
    lg: "w-40 h-40",
  };

  return (
    <div className="relative group">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-slate-50 -ml-4"
      >
        <ChevronLeft className="w-5 h-5 text-slate-600" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`flex-shrink-0 cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${sizeClasses[itemSize]} ${
                isSelected
                  ? "border-teal-500 ring-2 ring-teal-500/20 scale-[1.02]"
                  : "border-slate-200 hover:border-teal-300 hover:scale-[1.01]"
              }`}
            >
              <div className="relative w-full h-full">
                <img src={item.preview} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-white font-medium text-xs truncate">{item.name}</p>
                </div>
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center shadow-md">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-slate-50 -mr-4"
      >
        <ChevronRight className="w-5 h-5 text-slate-600" />
      </button>

      <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
};

const CreatePage = () => {
  // Flow states
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("women");
  const [selectedProductType, setSelectedProductType] = useState("sarees");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("");
  const [selectedFace, setSelectedFace] = useState("");
  const [selectedPoses, setSelectedPoses] = useState<string[]>([]);
  
  // Image states
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setProductImage(file);
        setProductImagePreview(URL.createObjectURL(file));
        toast.success("Product image uploaded!");
      }
    },
    onDropRejected: () => {
      toast.error("Please upload a valid image file");
    }
  });

  // Get backgrounds for selected theme
  const selectedThemeData = themes.find(t => t.id === selectedTheme);
  const availableBackgrounds = selectedThemeData?.backgrounds || [];

  // Get poses based on product type
  const getAvailablePoses = () => {
    switch (selectedProductType) {
      case "sarees":
        return sareePoses;
      case "kurta-set":
        return kurtaPoses;
      case "dresses":
        return dressPoses;
      default:
        return [];
    }
  };

  const availablePoses = getAvailablePoses();

  // Toggle pose selection
  const handlePoseToggle = (poseId: string) => {
    setSelectedPoses(prev => 
      prev.includes(poseId) 
        ? prev.filter(id => id !== poseId)
        : [...prev, poseId]
    );
  };

  // Validation check - all fields required
  const isFormValid = 
    selectedIndustry && 
    selectedCategory && 
    selectedProductType && 
    selectedTheme && 
    selectedBackground && 
    selectedFace && 
    selectedPoses.length > 0 && 
    productImage;

  const handleGenerate = async () => {
    if (!isFormValid) {
      toast.error("Please complete all required fields");
      return;
    }

    setIsGenerating(true);
    setGeneratedImages([]);
    
    try {
      const selectedFaceData = aiFaces.find(f => f.id === selectedFace);
      const backgroundData = availableBackgrounds.find(b => b.id === selectedBackground);

      // Generate one image per selected pose
      const results: string[] = [];
      
      for (const poseId of selectedPoses) {
        const poseData = availablePoses.find(p => p.id === poseId);
        
        const result = await generateImageWithGemini({
          productImage,
          modelImageUrl: selectedFaceData?.preview || aiFaces[0].preview,
          model: selectedFaceData?.name || aiFaces[0].name,
          background: backgroundData?.name || "Studio",
          backgroundImageUrl: backgroundData?.preview || "",
          pose: poseData?.name || "Elegant",
          poseImageUrl: poseData?.preview || "",
        });

        if (result.success && result.imageUrl) {
          results.push(result.imageUrl);
        }
      }

      if (results.length > 0) {
        setGeneratedImages(results);
        setCurrentImageIndex(0);
        toast.success(`Generated ${results.length} image${results.length > 1 ? 's' : ''} successfully!`);
      } else {
        toast.error("Failed to generate images");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate images. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setSelectedIndustry("");
    setSelectedCategory("women");
    setSelectedProductType("");
    setSelectedTheme("");
    setSelectedBackground("");
    setSelectedFace("");
    setSelectedPoses([]);
    setProductImage(null);
    setProductImagePreview("");
    setGeneratedImages([]);
    setCurrentImageIndex(0);
  };

  const handleDownload = (imageUrl?: string) => {
    const url = imageUrl || generatedImages[currentImageIndex];
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${currentImageIndex + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded!");
    }
  };

  const handleDownloadAll = () => {
    generatedImages.forEach((url, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `generated-image-${index + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 200);
    });
    toast.success(`Downloading ${generatedImages.length} images!`);
  };

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    setSelectedBackground("");
  };

  const completedSteps = [
    selectedIndustry,
    selectedCategory,
    selectedProductType,
    selectedTheme,
    selectedBackground,
    selectedFace,
    selectedPoses.length > 0,
    productImage
  ].filter(Boolean).length;

  const totalCreditsNeeded = selectedPoses.length * 10;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-3">
          Create Your Magic
        </h1>
        <p className="text-slate-500 text-lg">
          Upload your product • Choose your style • Get stunning results
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
          <div
            key={step}
            className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
              step <= completedSteps 
                ? "bg-gradient-to-r from-teal-400 to-emerald-500" 
                : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Note Banner */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-50 border border-amber-200/60">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-medium text-amber-700">Free credits include a small watermark</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Left Panel - Options (3 cols) */}
        <div className="xl:col-span-3 space-y-4">
          <Card className="border-0 shadow-lg shadow-slate-100/80 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Configure Your Shot
              </h2>
            </div>
            
            <CardContent className="p-6 space-y-6">
              {/* Row 1: Industry & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Industry</label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="w-full h-12 border-slate-200 focus:border-teal-400 focus:ring-teal-400/20 bg-white">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-slate-200 shadow-lg z-50">
                      {industries.map((ind) => (
                        <SelectItem key={ind.id} value={ind.id}>{ind.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={!selectedIndustry}>
                    <SelectTrigger className="w-full h-12 border-slate-200 focus:border-teal-400 focus:ring-teal-400/20 bg-white disabled:opacity-50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-slate-200 shadow-lg z-50">
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id} disabled={cat.disabled} className={cat.disabled ? "opacity-50" : ""}>
                          <span className="flex items-center gap-2">
                            {cat.name}
                            {cat.disabled && <Lock className="w-3 h-3 text-slate-400" />}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 2: Product Type */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Product Type</label>
                <Select value={selectedProductType} onValueChange={(value) => { setSelectedProductType(value); setSelectedPoses([]); }} disabled={!selectedCategory}>
                  <SelectTrigger className="w-full h-12 border-slate-200 focus:border-teal-400 focus:ring-teal-400/20 bg-white disabled:opacity-50">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-lg z-50">
                    {productTypes.map((pt) => (
                      <SelectItem key={pt.id} value={pt.id}>{pt.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product Theme - Horizontal Carousel */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-3 block">Product Theme</label>
                <HorizontalCarousel
                  items={themes.map(t => ({ id: t.id, name: t.name, preview: t.preview }))}
                  selectedId={selectedTheme}
                  onSelect={handleThemeChange}
                  itemSize="lg"
                />
              </div>

              {/* Background Selection */}
              {selectedTheme && (
                <div className="animate-fade-in">
                  <label className="text-sm font-semibold text-slate-700 mb-3 block">
                    Select Background
                    <span className="ml-2 text-xs font-normal text-slate-400">
                      ({selectedThemeData?.name} • {availableBackgrounds.length} options)
                    </span>
                  </label>
                  <HorizontalCarousel
                    items={availableBackgrounds}
                    selectedId={selectedBackground}
                    onSelect={setSelectedBackground}
                    itemSize="md"
                  />
                </div>
              )}

              {/* AI Face Selection */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-3 block flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Select AI Face
                </label>
                <HorizontalCarousel
                  items={aiFaces}
                  selectedId={selectedFace}
                  onSelect={setSelectedFace}
                  itemSize="md"
                />
              </div>

              {/* Pose Selection - Multi-select */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-3 block">
                  Select Poses
                  <span className="ml-2 text-xs font-normal text-slate-400">
                    ({selectedPoses.length} selected • {totalCreditsNeeded} credits)
                  </span>
                </label>
                {availablePoses.length > 0 ? (
                  <MultiSelectCarousel
                    items={availablePoses}
                    selectedIds={selectedPoses}
                    onToggle={handlePoseToggle}
                    itemSize="md"
                  />
                ) : (
                  <div className="text-sm text-slate-400 py-4 text-center bg-slate-50 rounded-lg">
                    Select a product type to see available poses
                  </div>
                )}
                {selectedPoses.length > 0 && (
                  <p className="text-xs text-teal-600 mt-2">
                    Will generate {selectedPoses.length} image{selectedPoses.length > 1 ? 's' : ''} with different poses
                  </p>
                )}
              </div>

              {/* Upload Section */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Product Image</label>
                {!productImage ? (
                  <div
                    {...getRootProps()}
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                      isDragActive 
                        ? "border-teal-400 bg-teal-50/50" 
                        : "border-slate-200 hover:border-teal-300 hover:bg-slate-50"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-medium mb-1">
                      {isDragActive ? "Drop your image here" : "Drag & drop your product image"}
                    </p>
                    <p className="text-sm text-slate-400">or click to browse • JPG, PNG, WEBP</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white shadow-md">
                      <img src={productImagePreview} alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">{productImage.name}</p>
                      <p className="text-xs text-slate-400">{(productImage.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setProductImage(null);
                        setProductImagePreview("");
                      }}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !isFormValid}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 border-0 shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all disabled:opacity-50 disabled:shadow-none"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating {selectedPoses.length} Image{selectedPoses.length > 1 ? 's' : ''}...
                  </>
                ) : (
                  <>
                    Generate {selectedPoses.length > 0 ? `${selectedPoses.length} Image${selectedPoses.length > 1 ? 's' : ''}` : 'Images'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Preview (2 cols) */}
        <div className="xl:col-span-2">
          <Card className="border-0 shadow-lg shadow-slate-100/80 overflow-hidden h-full">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Image className="w-5 h-5" />
                Preview
                {generatedImages.length > 1 && (
                  <span className="ml-auto text-sm font-normal text-slate-300">
                    {currentImageIndex + 1} / {generatedImages.length}
                  </span>
                )}
              </h2>
            </div>

            <CardContent className="p-6">
              {generatedImages.length > 0 ? (
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-lg">
                    <img 
                      src={generatedImages[currentImageIndex]} 
                      alt={`Generated ${currentImageIndex + 1}`} 
                      className="w-full h-auto"
                    />
                    {/* Image Navigation */}
                    {generatedImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                          disabled={currentImageIndex === 0}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg disabled:opacity-30"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(prev => Math.min(generatedImages.length - 1, prev + 1))}
                          disabled={currentImageIndex === generatedImages.length - 1}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg disabled:opacity-30"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Strip */}
                  {generatedImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {generatedImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            idx === currentImageIndex ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-slate-200'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button onClick={() => handleDownload()} className="flex-1 h-12 bg-teal-500 hover:bg-teal-600">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    {generatedImages.length > 1 && (
                      <Button onClick={handleDownloadAll} variant="outline" className="h-12">
                        <Download className="w-4 h-4 mr-2" />
                        All
                      </Button>
                    )}
                    <Button onClick={handleReset} variant="outline" className="flex-1 h-12">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      New
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    Your creation will appear here
                  </h3>
                  <p className="text-slate-400 text-sm max-w-[200px]">
                    Configure your options and upload your product image to generate
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
