import { useState } from "react";
import { Image, Download, X, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const GalleryPage = () => {
  const navigate = useNavigate();
  const [showPolicy, setShowPolicy] = useState(true);
  
  // Mock data for gallery - empty for now to show empty state
  // In production, this would filter images created within last 24 hours
  const images: { id: number; name: string; date: string; imageUrl?: string }[] = [];

  const totalCreations = images.length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Your Gallery</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {totalCreations} of {totalCreations} creations
        </p>
      </div>

      {/* Auto Deletion Policy Notice */}
      {showPolicy && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 relative">
          <button 
            onClick={() => setShowPolicy(false)}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-primary text-sm">Auto Deletion Policy</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Your generated images are automatically deleted after <strong>24 hours</strong> for privacy and storage optimization.
              </p>
              <p className="text-muted-foreground text-sm">
                Please download your favorites before they expire!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Content */}
      {images.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group rounded-lg overflow-hidden bg-muted aspect-[3/4]"
              >
                {image.imageUrl ? (
                  <img 
                    src={image.imageUrl} 
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-12 h-12 text-muted-foreground/50" />
                  </div>
                )}
                
                {/* Date overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="text-white text-xs font-medium">{image.date}</span>
                </div>

                {/* Hover overlay with download button */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" variant="secondary" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* All images loaded message */}
          <div className="text-center mt-8 text-muted-foreground text-sm">
            <Sparkles className="w-4 h-4 inline-block mr-1 text-yellow-500" />
            All images loaded! You've seen everything.
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Image className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No images in the last 24 hours
          </h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Your generated images expire after 24 hours. Start creating stunning AI product photos now!
          </p>
          <Button 
            onClick={() => navigate('/dashboard/create')}
            className="bg-primary hover:bg-primary/90"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate New Images
          </Button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
