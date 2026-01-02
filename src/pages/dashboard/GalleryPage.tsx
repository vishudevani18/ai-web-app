import { useState } from "react";
import { Image, Download, X, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const GalleryPage = () => {
  const navigate = useNavigate();
  const [showPolicy, setShowPolicy] = useState(true);
  
  // Mock data for gallery - empty for now to show empty state
  // In production, this would filter images created within last 24 hours
  const images: { id: number; name: string; date: string; imageUrl?: string }[] = [];

  const totalCreations = images.length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-black text-foreground mb-3">
          Your <span className="text-gradient-primary">Gallery</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          {totalCreations} of {totalCreations} creations
        </p>
      </div>

      {/* Auto Deletion Policy Notice */}
      {showPolicy && (
        <Card className="bg-gradient-primary/10 border-2 border-primary/30 shadow-card relative">
          <CardContent className="p-6">
            <button 
              onClick={() => setShowPolicy(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-4 pr-8">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-black text-foreground text-lg mb-2">Auto Deletion Policy</h3>
                <p className="text-muted-foreground mb-2">
                  Your generated images are automatically deleted after <strong className="text-foreground">24 hours</strong> for privacy and storage optimization.
                </p>
                <p className="text-sm text-primary font-semibold">
                  Please download your favorites before they expire!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gallery Content */}
      {images.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {images.map((image) => (
              <Card
                key={image.id}
                className="relative group rounded-2xl overflow-hidden border-2 border-border/50 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-[1.02] aspect-[3/4]"
              >
                {image.imageUrl ? (
                  <img 
                    src={image.imageUrl} 
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Image className="w-12 h-12 text-muted-foreground/50" />
                  </div>
                )}
                
                {/* Date overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                  <span className="text-white text-xs font-bold">{image.date}</span>
                </div>

                {/* Hover overlay with download button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    size="sm" 
                    className="bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-lg gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* All images loaded message */}
          <div className="text-center mt-8 text-muted-foreground text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            All images loaded! You've seen everything.
          </div>
        </>
      ) : (
        /* Empty State */
        <Card className="bg-card border-2 border-border/50 shadow-card">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-primary/10 flex items-center justify-center mx-auto mb-6">
              <Image className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-black text-foreground mb-3">
              No images in the last 24 hours
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Your generated images expire after 24 hours. Start creating stunning AI product photos now!
            </p>
            <Button 
              onClick={() => navigate('/dashboard/create')}
              className="bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-lg hover:shadow-glow px-8 py-6 text-base font-bold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate New Images
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GalleryPage;
