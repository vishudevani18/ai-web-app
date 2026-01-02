import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Sparkles, AlertCircle, Download, RefreshCw, Trash2, ChevronRight, Image, Check, ChevronLeft, Users, Loader2, Info } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { fetchIndustriesTree, generateImageFromFormData, type Industry, type Category, type ProductType, type ProductTheme, type ProductPose, type ProductBackground, type AiFace } from "@/lib/api";
import GenerationConfirmModal from "@/components/dashboard/GenerationConfirmModal";

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
    sm: "w-20 h-20 sm:w-24 sm:h-24",
    md: "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32",
    lg: "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40",
  };

  return (
    <div className="relative group">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-card/95 backdrop-blur-sm rounded-full shadow-lg border-2 border-border flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary/10 hover:border-primary/50 -ml-2 sm:-ml-4 touch-manipulation active:scale-95"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2 touch-pan-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex-shrink-0 cursor-pointer rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-200 ${sizeClasses[itemSize]} touch-manipulation active:scale-[0.98] ${
              selectedId === item.id
                ? "border-primary ring-2 ring-primary/20 scale-[1.02]"
                : "border-border/50 hover:border-primary/50 hover:scale-[1.01]"
            }`}
          >
            <div className="relative w-full h-full">
              <img src={item.preview} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2">
                <p className="text-white font-medium text-xs truncate">{item.name}</p>
              </div>
              {selectedId === item.id && (
                <div className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-primary rounded-full flex items-center justify-center shadow-md">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-card/95 backdrop-blur-sm rounded-full shadow-lg border-2 border-border flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary/10 hover:border-primary/50 -mr-2 sm:-mr-4 touch-manipulation active:scale-95"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
      </button>

      <div className="absolute left-0 top-0 bottom-2 w-6 sm:w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-2 w-6 sm:w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
    accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        handleImageUpload(acceptedFiles[0]);
      }
    },
    onDropRejected: () => {
      toast.error("Please upload a valid image file (JPG or PNG)");
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

  // Show confirmation modal
  const handleGenerateClick = useCallback(() => {
    if (!isFormValid || !productImage) {
      toast.error("Please complete all required fields");
      return;
    }
    setShowConfirmModal(true);
  }, [isFormValid, productImage]);

  // Actually generate image (called after confirmation)
  const handleConfirmGenerate = useCallback(async () => {
    if (!isFormValid || !productImage) {
      return;
    }

    setShowConfirmModal(false);
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

  // Get selected items for modal
  const getSelectedItems = useMemo(() => {
    const selectedPoseItem = availablePoses.find(p => p.id === selectedPose);
    const selectedBackgroundItem = availableBackgrounds.find(b => b.id === selectedBackground);
    const selectedThemeItem = themes.find(t => t.id === selectedTheme);
    const selectedFaceItem = aiFaces.find(f => f.id === selectedFace);

    return {
      pose: selectedPoseItem ? { id: selectedPoseItem.id, name: selectedPoseItem.name, preview: selectedPoseItem.preview } : null,
      background: selectedBackgroundItem ? { id: selectedBackgroundItem.id, name: selectedBackgroundItem.name, preview: selectedBackgroundItem.preview } : null,
      theme: selectedThemeItem ? { id: selectedThemeItem.id, name: selectedThemeItem.name, preview: selectedThemeItem.preview } : null,
      face: selectedFaceItem ? { id: selectedFaceItem.id, name: selectedFaceItem.name, preview: selectedFaceItem.preview } : null,
    };
  }, [selectedPose, selectedBackground, selectedTheme, selectedFace, availablePoses, availableBackgrounds, themes, aiFaces]);

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
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-foreground font-semibold">Loading options...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (industriesError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-4 text-destructive" />
          <p className="text-foreground font-semibold mb-4">Failed to load options. Please try again.</p>
          <Button onClick={() => window.location.reload()} className="bg-gradient-primary hover:bg-gradient-primary/90">Retry</Button>
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
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header - Mobile Responsive */}
      <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6 lg:mb-8 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-2 sm:mb-4">
          Create Your <span className="text-gradient-primary">Magic</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
          Upload your product • Choose your style • Get stunning results
        </p>
      </div>

      {/* Progress Indicator - Mobile Responsive */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-4 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
          <div
            key={step}
            className={`h-1.5 sm:h-2 w-6 sm:w-8 md:w-10 rounded-full transition-all duration-300 flex-shrink-0 ${
              step <= completedSteps 
                ? "bg-gradient-primary" 
                : "bg-border/50"
            }`}
          />
        ))}
      </div>


      {/* Main Content - Mobile Responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6">
        {/* Left Panel - Options */}
        <div className="xl:col-span-3 space-y-3 sm:space-y-4">
          <Card className="border-2 border-border/50 shadow-card overflow-hidden">
            <div className="bg-gradient-primary px-4 sm:px-6 py-3 sm:py-5">
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                Configure Your Shot
              </h2>
            </div>
            
            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Industry & Category - Mobile Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-foreground mb-1.5 sm:mb-2 block">Industry</label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="w-full h-11 sm:h-12 border-2 border-border/50 focus:border-primary focus:ring-primary/20 bg-background text-sm sm:text-base touch-manipulation">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-2 border-border shadow-lg z-50">
                      {industries.map((ind) => (
                        <SelectItem key={ind.id} value={ind.id} className="text-sm sm:text-base">{ind.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-bold text-foreground mb-1.5 sm:mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={!selectedIndustry || categories.length === 0}>
                    <SelectTrigger className="w-full h-11 sm:h-12 border-2 border-border/50 focus:border-primary focus:ring-primary/20 bg-background disabled:opacity-50 text-sm sm:text-base touch-manipulation">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-2 border-border shadow-lg z-50">
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id} className="text-sm sm:text-base">{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Product Type - Mobile Responsive */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-foreground mb-1.5 sm:mb-2 block">Product Type</label>
                <Select value={selectedProductType} onValueChange={setSelectedProductType} disabled={!selectedCategory || productTypes.length === 0}>
                  <SelectTrigger className="w-full h-11 sm:h-12 border-2 border-border/50 focus:border-primary focus:ring-primary/20 bg-background disabled:opacity-50 text-sm sm:text-base touch-manipulation">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-2 border-border shadow-lg z-50">
                    {productTypes.map((pt) => (
                      <SelectItem key={pt.id} value={pt.id} className="text-sm sm:text-base">{pt.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product Theme - Mobile Responsive */}
              {selectedProductType && (
                <div>
                  <label className="text-xs sm:text-sm font-bold text-foreground mb-2 sm:mb-3 block">Product Theme</label>
                  {themes.length > 0 ? (
                    <HorizontalCarousel
                      items={themes.map(t => ({ id: t.id, name: t.name, preview: t.preview }))}
                      selectedId={selectedTheme}
                      onSelect={handleThemeChange}
                      itemSize="lg"
                    />
                  ) : (
                    <div className="text-xs sm:text-sm text-muted-foreground py-3 sm:py-4 text-center bg-muted rounded-lg sm:rounded-xl border border-border/50">
                      No themes available for this product type
                    </div>
                  )}
                </div>
              )}

              {/* Background Selection - Mobile Responsive */}
              {selectedTheme && (
                <div className="animate-fade-in">
                  <label className="text-xs sm:text-sm font-bold text-foreground mb-2 sm:mb-3 block">
                    Select Background
                    <span className="ml-1 sm:ml-2 text-xs font-normal text-muted-foreground">
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

              {/* AI Face Selection - Mobile Responsive */}
              {selectedCategory && (
                <div>
                  <label className="text-xs sm:text-sm font-bold text-foreground mb-2 sm:mb-3 block flex items-center gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
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
                    <div className="text-xs sm:text-sm text-muted-foreground py-3 sm:py-4 text-center bg-muted rounded-lg sm:rounded-xl border border-border/50">
                      No AI faces available for this category
                    </div>
                  )}
                </div>
              )}

              {/* Pose Selection - Mobile Responsive */}
              {selectedProductType && (
                <div>
                  <label className="text-xs sm:text-sm font-bold text-foreground mb-2 sm:mb-3 block">
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
                    <div className="text-xs sm:text-sm text-muted-foreground py-3 sm:py-4 text-center bg-muted rounded-lg sm:rounded-xl border border-border/50">
                      No poses available for this product type
                    </div>
                  )}
                </div>
              )}

              {/* Upload Section - Mobile Responsive */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-foreground mb-1.5 sm:mb-2 block">Product Image</label>
                
                {/* Image Upload Guidelines - Mobile Responsive */}
                <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-primary/5 border-2 border-primary/20 rounded-lg sm:rounded-xl">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Info className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-foreground">For best results, please follow these guidelines:</p>
                      <ul className="text-xs text-muted-foreground space-y-0.5 sm:space-y-1 list-disc list-inside">
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
                    className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 touch-manipulation active:scale-[0.98] ${
                      isDragActive 
                        ? "border-primary bg-primary/10" 
                        : "border-border/50 hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-primary/10 flex items-center justify-center">
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    </div>
                    <p className="text-sm sm:text-base text-foreground font-bold mb-1">
                      {isDragActive ? "Drop your image here" : "Drag & drop your product image"}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">or click to browse • JPG, PNG (max 10MB)</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-muted rounded-xl sm:rounded-2xl border-2 border-border/50">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                      <img src={productImagePreview} alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-foreground truncate">{productImage.name}</p>
                      <p className="text-xs text-muted-foreground">{(productImage.size / 1024).toFixed(1)} KB</p>
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
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 w-9 h-9 sm:w-10 sm:h-10 touch-manipulation active:scale-95 flex-shrink-0"
                      aria-label="Remove image"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Generate Button - Mobile Responsive */}
              <Button
                onClick={handleGenerateClick}
                disabled={isGenerating || !isFormValid}
                className="w-full h-12 sm:h-14 text-sm sm:text-base lg:text-lg font-bold bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-lg hover:shadow-glow transition-all disabled:opacity-50 disabled:shadow-none touch-manipulation active:scale-[0.98] min-h-[48px]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                    Generating Image...
                  </>
                ) : (
                  <>
                    Generate Image
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Preview - Mobile Responsive */}
        <div className="xl:col-span-2 order-first xl:order-last">
          <Card className="border-2 border-border/50 shadow-card overflow-hidden h-full">
            <div className="bg-gradient-primary px-4 sm:px-6 py-3 sm:py-5">
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Image className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                Preview
              </h2>
            </div>

            <CardContent className="p-4 sm:p-6">
              {generatedImage ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border-2 border-border/50 shadow-lg">
                    <img 
                      src={generatedImage} 
                      alt="Generated product" 
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button onClick={handleDownload} className="flex-1 h-11 sm:h-12 bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-lg text-sm sm:text-base touch-manipulation active:scale-[0.98] min-h-[44px]">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={handleReset} variant="outline" className="flex-1 h-11 sm:h-12 border-2 border-border text-sm sm:text-base touch-manipulation active:scale-[0.98] min-h-[44px]">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      New
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-[3/4] rounded-xl sm:rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex flex-col items-center justify-center text-center p-4 sm:p-6 lg:p-8 border-2 border-border/50">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-primary/10 shadow-lg flex items-center justify-center mb-4 sm:mb-6">
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-foreground mb-2">
                    Your creation will appear here
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm max-w-[200px]">
                    Configure your options and upload your product image to generate
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Modal */}
      {getSelectedItems.pose && (
        <GenerationConfirmModal
          open={showConfirmModal}
          onOpenChange={setShowConfirmModal}
          onConfirm={handleConfirmGenerate}
          selectedPoses={[getSelectedItems.pose]}
          selectedBackground={getSelectedItems.background}
          selectedTheme={getSelectedItems.theme}
          selectedFace={getSelectedItems.face}
          isGenerating={isGenerating}
          isCatalog={false}
        />
      )}
    </div>
  );
};

export default CreatePage;
