import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, ImageIcon, Layout, Palette, IndianRupee, CheckCircle2, X } from "lucide-react";

interface GenerationConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  selectedPoses: Array<{ id: string; name: string; preview: string }>;
  selectedBackground: { id: string; name: string; preview: string } | null;
  selectedTheme: { id: string; name: string; preview: string } | null;
  selectedFace: { id: string; name: string; preview: string } | null;
  isGenerating?: boolean;
  isCatalog?: boolean;
}

const GenerationConfirmModal = ({
  open,
  onOpenChange,
  onConfirm,
  selectedPoses,
  selectedBackground,
  selectedTheme,
  selectedFace,
  isGenerating = false,
  isCatalog = false,
}: GenerationConfirmModalProps) => {
  const imageCount = selectedPoses.length;
  const creditsPerImage = 5;
  const totalCredits = imageCount * creditsPerImage;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-lg p-4 sm:p-5 md:p-6 overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col rounded-xl sm:rounded-2xl">
        <DialogHeader className="pb-2 sm:pb-3">
          <DialogTitle className="text-sm sm:text-base md:text-lg font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
            <span className="break-words">Confirm {isCatalog ? "Catalog" : "Image"} Generation</span>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm mt-1">
            Review selections and credit usage
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 py-1 sm:py-2 flex-1 overflow-y-auto min-h-0">
          {/* Credit Cost Summary - Responsive */}
          <div className="bg-gradient-primary/10 border border-primary/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-gradient-primary rounded-lg flex-shrink-0">
                  <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-bold text-foreground">Credit Cost</h3>
                  <p className="text-xs text-muted-foreground break-words">
                    {imageCount} image{imageCount > 1 ? 's' : ''} × {creditsPerImage} credits
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right flex-shrink-0">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-primary">{totalCredits}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">credits</div>
              </div>
            </div>
          </div>

          {/* Selected Options - Responsive Grid */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5 sm:gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              Selected Options
            </h3>

            {/* Responsive Grid: 1 column on mobile, 2 columns on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {/* Selected Poses */}
              <div className="bg-card border border-border/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <Layout className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                    {isCatalog ? "Poses" : "Pose"} ({selectedPoses.length})
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedPoses.map((pose) => (
                    <div
                      key={pose.id}
                      className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-md sm:rounded-lg overflow-hidden border border-primary/50 flex-shrink-0 touch-manipulation"
                      title={pose.name}
                    >
                      <img 
                        src={pose.preview} 
                        alt={pose.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Background */}
              {selectedBackground && (
                <div className="bg-card border border-border/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground">Background</h4>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-md sm:rounded-lg overflow-hidden border border-primary/50 mx-auto sm:mx-0">
                      <img 
                        src={selectedBackground.preview} 
                        alt={selectedBackground.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p 
                      className="text-xs sm:text-sm font-medium text-foreground text-center sm:text-left truncate" 
                      title={selectedBackground.name}
                    >
                      {selectedBackground.name}
                    </p>
                  </div>
                </div>
              )}

              {/* Selected Theme */}
              {selectedTheme && (
                <div className="bg-card border border-border/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground">Theme</h4>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-md sm:rounded-lg overflow-hidden border border-primary/50 mx-auto sm:mx-0">
                      <img 
                        src={selectedTheme.preview} 
                        alt={selectedTheme.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p 
                      className="text-xs sm:text-sm font-medium text-foreground text-center sm:text-left truncate" 
                      title={selectedTheme.name}
                    >
                      {selectedTheme.name}
                    </p>
                  </div>
                </div>
              )}

              {/* Selected AI Face */}
              {selectedFace && (
                <div className="bg-card border border-border/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground">AI Face</h4>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-md sm:rounded-lg overflow-hidden border border-primary/50 mx-auto sm:mx-0">
                      <img 
                        src={selectedFace.preview} 
                        alt={selectedFace.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p 
                      className="text-xs sm:text-sm font-medium text-foreground text-center sm:text-left truncate" 
                      title={selectedFace.name}
                    >
                      {selectedFace.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-3 pt-3 sm:pt-4 flex-col sm:flex-row mt-auto">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isGenerating}
            className="w-full sm:flex-1 h-11 sm:h-10 text-sm sm:text-base border border-border touch-manipulation active:scale-[0.98]"
          >
            <X className="w-4 h-4 sm:w-3.5 sm:h-3.5 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isGenerating}
            className="w-full sm:flex-1 h-11 sm:h-10 text-sm sm:text-base bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-lg hover:shadow-glow touch-manipulation active:scale-[0.98]"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 sm:w-3.5 sm:h-3.5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 sm:w-3.5 sm:h-3.5 mr-2" />
                Confirm & Generate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerationConfirmModal;

