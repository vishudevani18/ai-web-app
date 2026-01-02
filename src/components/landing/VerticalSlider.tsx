import { cn } from "@/lib/utils";

interface VerticalSliderProps {
  images: string[];
  scrollSpeed?: number; // Duration in seconds for one full cycle
  className?: string;
}

const VerticalSlider = ({
  images,
  scrollSpeed = 12, // 12 seconds for full cycle (faster, more dynamic)
  className,
}: VerticalSliderProps) => {
  // Duplicate images to create seamless infinite loop
  // We need at least 2 sets for seamless scrolling
  const duplicatedImages = [...images, ...images];
  
  // Calculate animation - scroll through one set of images
  const scrollDistance = 100 / duplicatedImages.length * images.length; // Scroll one set (50% for 2 sets)

  return (
    <div
      className={cn("relative w-full h-full overflow-hidden rounded-3xl", className)}
    >
      <div
        className="flex flex-col w-full"
        style={{
          animation: `verticalRoll ${scrollSpeed}s linear infinite`,
          height: `${duplicatedImages.length * (100 / images.length)}%`,
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="flex-shrink-0 w-full flex items-center justify-center bg-gradient-to-b from-primary/5 to-accent/5"
            style={{
              height: `${100 / images.length}%`,
              minHeight: `${100 / images.length}%`,
            }}
          >
            <img
              src={image}
              alt={`Slide ${(index % images.length) + 1}`}
              className="w-full h-full object-contain"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
              }}
              loading={index < images.length ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
      
      {/* CSS Animation for continuous rolling */}
      <style>{`
        @keyframes verticalRoll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-${scrollDistance}%);
          }
        }
      `}</style>
    </div>
  );
};

export default VerticalSlider;

