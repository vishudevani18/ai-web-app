import { Wand2, User, Download, Sparkles, ImageIcon, Layout, Zap, IndianRupee } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const features = [
  {
    icon: IndianRupee,
    title: "Only ₹5 per Image",
    description: "Very cheap prices with 50% discount! Get any quality of images for just ₹5 — the most affordable in the market."
  },
  {
    icon: Wand2,
    title: "1-Click Catalog Generation",
    description: "Generate complete product catalogs with a single click. No complex setup, no multiple steps — just instant results."
  },
  {
    icon: User,
    title: "10+ AI Faces",
    description: "Choose from 10+ AI-generated faces based on different categories. Each face looks like a real human, perfectly suited for your brand."
  },
  {
    icon: ImageIcon,
    title: "100+ Backgrounds",
    description: "Massive selection of 100+ high-quality backgrounds with portrait and studio quality. Perfect for any product type."
  },
  {
    icon: Layout,
    title: "Themed Backgrounds",
    description: "Indoor, outdoor, hotel themes — choose from different background categories to match your product's style and mood."
  },
  {
    icon: Sparkles,
    title: "20+ E-Commerce Poses",
    description: "20+ variety of different poses specifically designed and acceptable for e-commerce platforms like Amazon, Myntra, Flipkart.",
    highlight: true
  },
  {
    icon: Download,
    title: "Instant High-Quality Download",
    description: "Download your images instantly in high quality. No waiting, no watermarks — ready to use immediately."
  }
];

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="features" ref={ref} className="py-12 sm:py-16 lg:py-24 bg-gradient-soft relative overflow-hidden">
      {/* Background decoration - Mobile Optimized */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Centered for Consistency - Mobile Responsive */}
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-gradient-primary/10 border-2 border-primary/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 backdrop-blur-sm shadow-soft">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary animate-pulse-slow flex-shrink-0" />
            <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-wider">Powerful Features</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-foreground mb-4 sm:mb-6 leading-tight px-2">
            Everything You Need to Create
            <br />
            <span className="text-gradient-primary">Professional Catalog Images</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Choose from 100+ backgrounds, 10+ AI faces, 20+ poses, and generate catalogs in 1 click — all for just <span className="text-primary font-bold">₹5 per image</span>.
          </p>
        </div>

        {/* Enhanced Grid Layout - Mobile First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHighlight = 'highlight' in feature && feature.highlight;
            
            return (
              <div
                key={index}
                className={`group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 xl:p-10 border-2 transition-all duration-300 flex flex-col h-full cursor-pointer touch-manipulation active:scale-[0.98] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${
                  isHighlight 
                    ? 'bg-gradient-primary text-white border-accent/50 shadow-glow hover:shadow-glow hover:shadow-[0_20px_60px_rgba(157,78,221,0.4)] hover:scale-[1.02]' 
                    : 'bg-card border-border/30 shadow-soft hover:shadow-[0_20px_50px_rgba(157,78,221,0.25)] hover:shadow-[0_0_30px_rgba(157,78,221,0.15)] hover:scale-[1.02] hover:bg-card/50'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Decorative gradient overlay on hover */}
                {!isHighlight && (
                  <div className="absolute inset-0 bg-gradient-primary/0 group-hover:bg-gradient-primary/5 rounded-2xl sm:rounded-3xl transition-all duration-300 -z-0" />
                )}
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container - Enhanced - Mobile Responsive */}
                  <div className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0 w-fit ${
                    isHighlight 
                      ? 'bg-white/20 group-hover:bg-white/30 backdrop-blur-sm' 
                      : 'bg-gradient-primary group-hover:shadow-glow'
                  }`}>
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white`} />
                  </div>
                  
                  {/* Badge for highlighted card - Mobile Responsive */}
                  {isHighlight && (
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-4 sm:mb-5 flex-shrink-0 w-fit">
                      <Sparkles className="w-3 h-3 flex-shrink-0" />
                      Most Popular
                    </span>
                  )}
                  
                  {/* Title - Better Typography - Mobile Responsive */}
                  <h3 className={`text-lg sm:text-xl lg:text-2xl font-black mb-3 sm:mb-4 transition-colors flex-shrink-0 leading-tight ${
                    isHighlight ? 'text-white' : 'text-foreground group-hover:text-primary'
                  }`}>
                    {feature.title}
                  </h3>
                  
                  {/* Description - Better Readability - Mobile Responsive */}
                  <p className={`leading-relaxed text-sm sm:text-base lg:text-lg flex-grow ${
                    isHighlight 
                      ? 'text-white/95' 
                      : 'text-muted-foreground group-hover:text-foreground/80'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
