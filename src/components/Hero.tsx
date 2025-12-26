import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap, Camera, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import beforeDress from "@/assets/before-dress.jpg";
import afterDress from "@/assets/after-dress.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="space-y-8">
          {/* AI Badge with animation */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-5 py-2.5 backdrop-blur-sm shadow-soft animate-bounce-gentle">
              <Sparkles className="w-4 h-4 text-primary animate-pulse-slow" />
              <span className="text-sm font-bold text-primary tracking-wide">AI-Powered Studio</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] text-foreground max-w-5xl mx-auto tracking-tight">
              Your Products Deserve
              <br />
              <span className="text-gradient-primary">
                Professional Model Shots
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Skip the expensive studio. Upload your product photos and watch our AI create{" "}
              <span className="text-primary font-bold">stunning catalog-ready images</span>{" "}
              with realistic models — in seconds, not days.
            </p>
          </div>

          {/* Feature Pills with stagger animation */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {[
              { icon: Zap, text: "30 Seconds Generation" },
              { icon: Camera, text: "Multiple Angles" },
              { icon: Star, text: "HD Quality Output" }
            ].map((item, index) => (
              <div 
                key={index}
                className="inline-flex items-center gap-2 bg-card border border-border/50 rounded-full px-5 py-2.5 shadow-soft hover:shadow-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Button with glow effect */}
          <div className="pt-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Button
              onClick={() => navigate("/generate")}
              size="xl"
              className="group relative bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-glow transition-all duration-500 text-lg px-10 py-7 rounded-2xl font-bold overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Creating — It's Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                No credit card
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Instant access
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Cancel anytime
              </span>
            </p>
          </div>

          {/* Before/After Showcase with enhanced design */}
          <div className="pt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="relative max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-6 md:gap-10">
                {/* Before Image */}
                <div className="relative group flex-1 max-w-xs card-hover-lift">
                  <div className="absolute -inset-2 bg-gradient-to-r from-muted-foreground/20 to-muted/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="relative bg-card rounded-2xl p-3 shadow-card border border-border/50 overflow-hidden">
                    <img 
                      src={beforeDress} 
                      alt="Product photo before AI enhancement" 
                      className="w-full h-52 md:h-72 object-cover rounded-xl"
                    />
                    <div className="absolute top-5 left-5 bg-foreground/90 text-background px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg">
                      BEFORE
                    </div>
                  </div>
                </div>
                
                {/* Animated Arrow */}
                <div className="hidden sm:flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-slow">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">AI Magic</span>
                </div>
                
                {/* After Image */}
                <div className="relative group flex-1 max-w-xs card-hover-lift">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
                  <div className="relative bg-card rounded-2xl p-3 shadow-hover border border-primary/20 overflow-hidden">
                    <img 
                      src={afterDress} 
                      alt="AI-generated professional product photo" 
                      className="w-full h-52 md:h-72 object-cover rounded-xl"
                    />
                    <div className="absolute top-5 left-5 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      AFTER
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-10 text-lg font-semibold text-foreground">
                From flat product shots to{" "}
                <span className="text-primary">magazine-worthy catalog images</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
