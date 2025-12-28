import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Sparkles, AlertCircle, Download, RefreshCw, Trash2, ChevronRight, Image, Check, ChevronLeft, Users, Loader2, Info } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { fetchIndustriesTree, generateImageFromFormData, type Industry, type Category, type ProductType, type ProductTheme, type ProductPose, type ProductBackground, type AiFace } from "@/lib/api";

// Carousel Component for single selection
interface CarouselProps {
  items: { id: string; name: string; preview: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
  itemSize?: "sm" | "md" | "lg";
}

const HorizontalCarousel = ({ items, selectedId, onSelect, itemSize = "md" }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, []);

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
        aria-label="Scroll left"
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
              <img src={item.preview} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
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
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5 text-slate-600" />
      </button>

      <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
};

const CreatePage = () => {
  // Fetch industries tree from API
  const { data: industriesTree, isLoading: isLoadingIndustries, error: industriesError } = useQuery({
    queryKey: ['industries-tree'],
    queryFn: fetchIndustriesTree,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Form state
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("");
  const [selectedFace, setSelectedFace] = useState("");
  const [selectedPose, setSelectedPose] = useState("");
  
  // Image states
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string>("");

  // Transform API data to component format using useMemo for performance
  const industries = useMemo(() => {
    if (!industriesTree) return [];
    return industriesTree.map((ind: Industry) => ({
      id: ind.id,
      name: ind.name,
    }));
  }, [industriesTree]);

  const categories = useMemo(() => {
    if (!selectedIndustry || !industriesTree) return [];
    const industry = industriesTree.find((ind: Industry) => ind.id === selectedIndustry);
    return industry?.categories.map((cat: Category) => ({
      id: cat.id,
      name: cat.name,
    })) || [];
  }, [selectedIndustry, industriesTree]);

  const productTypes = useMemo(() => {
    if (!selectedCategory || !industriesTree || !selectedIndustry) return [];
    const industry = industriesTree.find((ind: Industry) => ind.id === selectedIndustry);
    const category = industry?.categories.find((cat: Category) => cat.id === selectedCategory);
    return category?.productTypes.map((pt: ProductType) => ({
      id: pt.id,
      name: pt.name,
    })) || [];
  }, [selectedCategory, selectedIndustry, industriesTree]);

  const themes = useMemo(() => {
    if (!selectedProductType || !industriesTree || !selectedIndustry || !selectedCategory) return [];
    const industry = industriesTree.find((ind: Industry) => ind.id === selectedIndustry);
    const category = industry?.categories.find((cat: Category) => cat.id === selectedCategory);
    const productType = category?.productTypes.find((pt: ProductType) => pt.id === selectedProductType);
    return productType?.productThemes.map((theme: ProductTheme) => ({
      id: theme.id,
      name: theme.name,
      preview: theme.imageUrl,
      backgrounds: theme.productBackgrounds.map((bg: ProductBackground) => ({
        id: bg.id,
        name: bg.name,
        preview: bg.imageUrl,
      })),
    })) || [];
  }, [selectedProductType, selectedIndustry, selectedCategory, industriesTree]);

  const aiFaces = useMemo(() => {
    if (!selectedCategory || !industriesTree || !selectedIndustry) return [];
    const industry = industriesTree.find((ind: Industry) => ind.id === selectedIndustry);
    const category = industry?.categories.find((cat: Category) => cat.id === selectedCategory);
    if (!category) return [];
    const allFaces: AiFace[] = [...category.aiFaces.male, ...category.aiFaces.female];
    return allFaces.map((face: AiFace) => ({
      id: face.id,
      name: face.name,
      preview: face.imageUrl,
    }));
  }, [selectedCategory, selectedIndustry, industriesTree]);

  const availablePoses = useMemo(() => {
    if (!selectedProductType || !industriesTree || !selectedIndustry || !selectedCategory) return [];
    const industry = industriesTree.find((ind: Industry) => ind.id === selectedIndustry);
    const category = industry?.categories.find((cat: Category) => cat.id === selectedCategory);
    const productType = category?.productTypes.find((pt: ProductType) => pt.id === selectedProductType);
    return productType?.productPoses.map((pose: ProductPose) => ({
      id: pose.id,
      name: pose.name,
      preview: pose.imageUrl,
    })) || [];
  }, [selectedProductType, selectedIndustry, selectedCategory, industriesTree]);

  const availableBackgrounds = useMemo(() => {
    if (!selectedTheme) return [];
    const theme = themes.find((t) => t.id === selectedTheme);
    
    // First try theme backgrounds
    if (theme && theme.backgrounds.length > 0) {
      return theme.backgrounds;
    }
    
    // If theme backgrounds are empty, aggregate unique backgrounds from poses
    if (!selectedProductType || !industriesTree || !selectedIndustry || !selectedCategory) return [];
    const industry = industriesTree.find((ind: Industry) => ind.id === selectedIndustry);
    const category = industry?.categories.find((cat: Category) => cat.id === selectedCategory);
    const productType = category?.productTypes.find((pt: ProductType) => pt.id === selectedProductType);
    if (!productType) return [];
    
    const backgroundMap = new Map<string, { id: string; name: string; preview: string }>();
    productType.productPoses.forEach((pose: ProductPose) => {
      pose.productBackgrounds.forEach((bg: ProductBackground) => {
        if (!backgroundMap.has(bg.id)) {
          backgroundMap.set(bg.id, {
            id: bg.id,
            name: bg.name,
            preview: bg.imageUrl,
          });
        }
      });
    });
    
    return Array.from(backgroundMap.values());
  }, [selectedTheme, themes, selectedProductType, industriesTree, selectedIndustry, selectedCategory]);

  // Reset dependent selections when parent changes
  useEffect(() => {
    setSelectedCategory("");
    setSelectedProductType("");
    setSelectedTheme("");
    setSelectedBackground("");
    setSelectedFace("");
    setSelectedPose("");
  }, [selectedIndustry]);

  useEffect(() => {
    setSelectedProductType("");
    setSelectedTheme("");
    setSelectedBackground("");
    setSelectedFace("");
    setSelectedPose("");
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedTheme("");
    setSelectedBackground("");
    setSelectedPose("");
  }, [selectedProductType]);

  useEffect(() => {
    setSelectedBackground("");
  }, [selectedTheme]);

  // Image upload handler with warnings
  const handleImageUpload = useCallback((file: File) => {
    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error("Image size should be less than 10MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload a valid image file");
      return;
    }

    setProductImage(file);
    setProductImagePreview(URL.createObjectURL(file));
    toast.success("Product image uploaded!");
    
    // Show helpful warning toast
    toast.info(
      "Tip: For best results, use a clear, complete image with white or transparent background. Avoid human faces and ensure the product is not cut off.",
      { duration: 6000 }
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        handleImageUpload(acceptedFiles[0]);
      }
    },
    onDropRejected: () => {
      toast.error("Please upload a valid image file (JPG, PNG, or WEBP)");
    }
  });

  // Validation
  const isFormValid = useMemo(() => 
    selectedIndustry && 
    selectedCategory && 
    selectedProductType && 
    selectedTheme && 
    selectedBackground && 
    selectedFace && 
    selectedPose && 
    productImage
  , [selectedIndustry, selectedCategory, selectedProductType, selectedTheme, selectedBackground, selectedFace, selectedPose, productImage]);

  // Generate image
  const handleGenerate = useCallback(async () => {
    if (!isFormValid || !productImage) {
      toast.error("Please complete all required fields");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage("");
    
    try {
      const result = await generateImageFromFormData(
        productImage,
        selectedIndustry,
        selectedCategory,
        selectedProductType,
        selectedPose,
        selectedTheme,
        selectedBackground,
        selectedFace
      );

      if (result.success && result.data?.imageUrl) {
        setGeneratedImage(result.data.imageUrl);
        toast.success("Image generated successfully!");
      } else {
        toast.error(`Failed to generate image: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(`Failed to generate image: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsGenerating(false);
    }
  }, [isFormValid, productImage, selectedIndustry, selectedCategory, selectedProductType, selectedPose, selectedTheme, selectedBackground, selectedFace]);

  // Reset form
  const handleReset = useCallback(() => {
    setSelectedIndustry("");
    setSelectedCategory("");
    setSelectedProductType("");
    setSelectedTheme("");
    setSelectedBackground("");
    setSelectedFace("");
    setSelectedPose("");
    setProductImage(null);
    if (productImagePreview) {
      URL.revokeObjectURL(productImagePreview);
    }
    setProductImagePreview("");
    setGeneratedImage("");
  }, [productImagePreview]);

  // Download image
  const handleDownload = useCallback(() => {
    if (!generatedImage) return;
    window.open(generatedImage, '_blank');
    toast.success("Image opened in new tab. Right-click to save.");
  }, [generatedImage]);

  // Theme change handler
  const handleThemeChange = useCallback((themeId: string) => {
    setSelectedTheme(themeId);
    setSelectedBackground("");
  }, []);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (productImagePreview) {
        URL.revokeObjectURL(productImagePreview);
      }
    };
  }, [productImagePreview]);

  // Loading state
  if (isLoadingIndustries) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-teal-500" />
          <p className="text-slate-600">Loading options...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (industriesError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
          <p className="text-slate-600 mb-4">Failed to load options. Please try again.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  const completedSteps = [
    selectedIndustry,
    selectedCategory,
    selectedProductType,
    selectedTheme,
    selectedBackground,
    selectedFace,
    selectedPose,
    productImage
  ].filter(Boolean).length;

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
        {/* Left Panel - Options */}
        <div className="xl:col-span-3 space-y-4">
          <Card className="border-0 shadow-lg shadow-slate-100/80 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Configure Your Shot
              </h2>
            </div>
            
            <CardContent className="p-6 space-y-6">
              {/* Industry & Category */}
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
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={!selectedIndustry || categories.length === 0}>
                    <SelectTrigger className="w-full h-12 border-slate-200 focus:border-teal-400 focus:ring-teal-400/20 bg-white disabled:opacity-50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-slate-200 shadow-lg z-50">
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Product Type */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Product Type</label>
                <Select value={selectedProductType} onValueChange={setSelectedProductType} disabled={!selectedCategory || productTypes.length === 0}>
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

              {/* Product Theme */}
              {selectedProductType && (
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-3 block">Product Theme</label>
                  {themes.length > 0 ? (
                    <HorizontalCarousel
                      items={themes.map(t => ({ id: t.id, name: t.name, preview: t.preview }))}
                      selectedId={selectedTheme}
                      onSelect={handleThemeChange}
                      itemSize="lg"
                    />
                  ) : (
                    <div className="text-sm text-slate-400 py-4 text-center bg-slate-50 rounded-lg">
                      No themes available for this product type
                    </div>
                  )}
                </div>
              )}

              {/* Background Selection */}
              {selectedTheme && (
                <div className="animate-fade-in">
                  <label className="text-sm font-semibold text-slate-700 mb-3 block">
                    Select Background
                    <span className="ml-2 text-xs font-normal text-slate-400">
                      ({themes.find(t => t.id === selectedTheme)?.name} • {availableBackgrounds.length} options)
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
              {selectedCategory && (
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-3 block flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Select AI Face
                  </label>
                  {aiFaces.length > 0 ? (
                    <HorizontalCarousel
                      items={aiFaces}
                      selectedId={selectedFace}
                      onSelect={setSelectedFace}
                      itemSize="md"
                    />
                  ) : (
                    <div className="text-sm text-slate-400 py-4 text-center bg-slate-50 rounded-lg">
                      No AI faces available for this category
                    </div>
                  )}
                </div>
              )}

              {/* Pose Selection */}
              {selectedProductType && (
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-3 block">
                    Select Pose
                  </label>
                  {availablePoses.length > 0 ? (
                    <HorizontalCarousel
                      items={availablePoses}
                      selectedId={selectedPose}
                      onSelect={setSelectedPose}
                      itemSize="md"
                    />
                  ) : (
                    <div className="text-sm text-slate-400 py-4 text-center bg-slate-50 rounded-lg">
                      No poses available for this product type
                    </div>
                  )}
                </div>
              )}

              {/* Upload Section */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Product Image</label>
                
                {/* Image Upload Guidelines */}
                <div className="mb-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <p className="text-sm font-medium text-blue-900">For best results, please follow these guidelines:</p>
                      <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                        <li>Use a clear, high-quality product image</li>
                        <li>White or transparent background is recommended</li>
                        <li>Avoid including human faces in the product image</li>
                        <li>Ensure the product is well-lit and in focus</li>
                        <li>Image should be complete - product should not be cut off or cropped</li>
                      </ul>
                    </div>
                  </div>
                </div>

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
                    <p className="text-sm text-slate-400">or click to browse • JPG, PNG, WEBP (max 10MB)</p>
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
                        if (productImagePreview) {
                          URL.revokeObjectURL(productImagePreview);
                        }
                        setProductImage(null);
                        setProductImagePreview("");
                      }}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                      aria-label="Remove image"
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
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Image...
                  </>
                ) : (
                  <>
                    Generate Image
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Preview */}
        <div className="xl:col-span-2">
          <Card className="border-0 shadow-lg shadow-slate-100/80 overflow-hidden h-full">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Image className="w-5 h-5" />
                Preview
              </h2>
            </div>

            <CardContent className="p-6">
              {generatedImage ? (
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-lg">
                    <img 
                      src={generatedImage} 
                      alt="Generated product" 
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleDownload} className="flex-1 h-12 bg-teal-500 hover:bg-teal-600">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
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
