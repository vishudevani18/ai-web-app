import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap, Users, Palette, IndianRupee, ShoppingBag, CheckCircle2, User, ImageIcon, Layout, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import image1 from "@/assets/image1.jpeg";
import image2 from "@/assets/image2.jpeg";
import VerticalSlider from "@/components/landing/VerticalSlider";

const Hero = () => {
  const navigate = useNavigate();

  // Images for vertical slider
  // Add more images here as you upload them
  const sliderImages = [
    image1,
    image2,
    image1, // Will be replaced when you add image3
    image2, // Will be replaced when you add image4
    image1, // Will be replaced when you add image5
  ];

  // Unique features highlighting customization
  const uniqueFeatures = [
    {
      icon: User,
      title: "Your Own AI Faces",
      description: "Choose and maintain consistent AI faces across all your product catalogs"
    },
    {
      icon: ImageIcon,
      title: "Custom Backgrounds",
      description: "Select from thousands of backgrounds or upload your own"
    },
    {
      icon: Layout,
      title: "Poses & Styles",
      description: "Choose from multiple poses, styles, and compositions"
    },
    {
      icon: Wand2,
      title: "Background Themes",
      description: "Apply consistent themes across your entire catalog"
    }
  ];

  // E-commerce platforms
  const platforms = ["Myntra", "Amazon", "Meesho", "Ajio"];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/15 to-primary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-primary/5 via-accent/3 to-transparent rounded-full" />
      </div>

      {/* Content - Redesigned Layout - Mobile First */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Main Content (spans 7 columns) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 flex flex-col justify-center">
            {/* AI Badge - Enhanced - Mobile Responsive */}
            <div className="animate-fade-in">
              <div className="relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-primary/15 border-2 border-primary/40 rounded-full px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-md shadow-lg group hover:shadow-glow transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-primary/20 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative flex items-center gap-2 sm:gap-3">
                  <div className="p-1 sm:p-1.5 bg-gradient-primary rounded-full flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse-slow" />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-primary tracking-wider uppercase">AI-Powered E-Commerce Studio</span>
                </div>
              </div>
            </div>

            {/* Main Headline - Enhanced Typography - Mobile Responsive */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-[1.1] sm:leading-[1.05] text-foreground tracking-tight">
                  Create Catalog Images
                  <br />
                  <span className="relative inline-block">
                    <span className="text-gradient-primary">Your Way</span>
                    <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-gradient-primary/20 blur-xl -z-10" />
                  </span>
                </h1>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-primary font-black whitespace-nowrap">In 10 Seconds</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/30 to-transparent" />
                </div>
              </div>
              
              {/* Enhanced Description - Mobile Responsive */}
              <div className="space-y-3 sm:space-y-4 max-w-2xl">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed font-medium">
                  The only platform where you choose{" "}
                  <span className="relative">
                    <span className="text-primary font-bold">your own AI faces, backgrounds, poses, and themes</span>
                    <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-1.5 sm:h-2 bg-primary/20 -z-10" />
                  </span>
                </p>
                <div className="flex items-start gap-2 sm:gap-3 bg-gradient-accent/5 border-l-4 border-accent rounded-r-xl sm:rounded-r-2xl p-3 sm:p-4">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                    Images are <span className="text-foreground font-semibold">ready to upload directly</span> to{" "}
                    <span className="text-primary font-bold">Myntra, Amazon, Meesho, Ajio</span> & more.
                  </p>
                </div>
              </div>
            </div>

            {/* Unique Features Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {uniqueFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-soft hover:shadow-card hover:border-primary/50 transition-all duration-300 touch-manipulation active:scale-[0.98]"
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-gradient-primary rounded-lg sm:rounded-xl flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs sm:text-sm font-bold text-foreground mb-1">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground leading-tight">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Key Benefits - Mobile Responsive */}
            <div className="space-y-3 sm:space-y-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {/* Cost Savings */}
              <div className="flex items-center gap-3 sm:gap-4 bg-gradient-primary/5 border border-primary/20 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                <div className="p-2 sm:p-3 bg-gradient-primary rounded-lg sm:rounded-xl flex-shrink-0">
                  <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xl sm:text-2xl font-black text-foreground">₹5 per Image</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Half the market price • Save 50% on catalog costs</div>
                </div>
              </div>

              {/* E-commerce Ready */}
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-soft">
                <div className="p-2 sm:p-3 bg-gradient-accent rounded-lg sm:rounded-xl flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base sm:text-lg font-bold text-foreground mb-2">Ready for E-Commerce</div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {platforms.map((platform, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold"
                      >
                        <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                        <span className="whitespace-nowrap">{platform}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row - Mobile Responsive */}
            <div className="flex flex-wrap gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {[
                { icon: Zap, value: "10 sec", label: "Generation" },
                { icon: Users, value: "1000", label: "Active Users" },
                { icon: Palette, value: "100%", label: "Customizable" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 shadow-soft flex-1 sm:flex-initial min-w-[120px] sm:min-w-0"
                >
                  <div className="p-1.5 sm:p-2 bg-gradient-primary rounded-lg sm:rounded-xl flex-shrink-0">
                    <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg sm:text-xl font-black text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground font-medium truncate">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section - Mobile Responsive */}
            <div className="pt-2 sm:pt-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <Button
                onClick={() => navigate("/generate")}
                size="xl"
                className="group relative bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-lg hover:shadow-glow transition-all duration-500 text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 rounded-xl sm:rounded-2xl font-bold overflow-hidden w-full sm:w-auto touch-manipulation active:scale-[0.98] min-h-[48px] sm:min-h-0"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Creating Free
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-vibrant opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </div>

          {/* Right Column - Vertical Slider (spans 5 columns) - Mobile Responsive */}
          <div className="lg:col-span-5 animate-fade-in order-first lg:order-last" style={{ animationDelay: "0.4s" }}>
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20">
              <VerticalSlider
                images={sliderImages}
                scrollSpeed={12}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
