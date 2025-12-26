import { Button } from "@/components/ui/button";
import beforeProduct from "@/assets/before-product.jpg";
import afterProduct from "@/assets/after-product.jpg";
import { ArrowRight, Star, CheckCircle2 } from "lucide-react";

const BeforeAfter = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 via-background to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block">
            <span className="text-sm font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-2 rounded-full">
              See The Magic
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground">
            The AI Transformation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch how our AI turns simple product shots into professional photoshoots
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto items-center">
          {/* Before/After Images */}
          <div className="space-y-8">
            {/* Before */}
            <div className="relative group animate-fade-in">
              <div className="absolute -inset-2 bg-gradient-to-r from-muted/30 to-muted/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="relative bg-card rounded-3xl p-5 shadow-card hover:shadow-hover transition-all duration-500 border-2 border-border/50">
                <img 
                  src={beforeProduct} 
                  alt="Simple product photo before AI enhancement" 
                  className="w-full h-72 object-cover rounded-2xl"
                />
                <div className="absolute top-9 left-9 bg-background/95 backdrop-blur-sm px-5 py-2.5 rounded-full text-base font-bold shadow-lg border-2 border-border/50">
                  📸 Before
                </div>
              </div>
            </div>

            {/* Arrow indicator for mobile */}
            <div className="flex justify-center lg:hidden">
              <div className="bg-primary/10 p-3 rounded-full">
                <ArrowRight className="w-6 h-6 text-primary rotate-90" />
              </div>
            </div>

            {/* After */}
            <div className="relative group animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="absolute -inset-2 bg-gradient-vibrant rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-card rounded-3xl p-5 shadow-hover border-2 border-primary/20">
                <img 
                  src={afterProduct} 
                  alt="Professional AI-generated product photoshoot" 
                  className="w-full h-72 object-cover rounded-2xl"
                />
                <div className="absolute top-9 left-9 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-base font-bold shadow-xl flex items-center gap-2 border-2 border-primary-foreground/20">
                  <Star className="w-5 h-5 fill-current" />
                  ✨ After AI
                </div>
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="flex flex-col justify-center space-y-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-extrabold text-foreground">
                Professional Results in Seconds
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Transform ordinary product photos into captivating, sales-driving visuals with cutting-edge AI technology. No studio, no models, no hassle.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { text: "Studio-quality lighting & composition", icon: "💡" },
                { text: "Professional model integration", icon: "👗" },
                { text: "Customizable backgrounds & themes", icon: "🎨" },
                { text: "Multiple variations in seconds", icon: "⚡" },
                { text: "Perfect for fashion & apparel", icon: "✨" },
                { text: "No photography skills needed", icon: "🚀" }
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 p-4 bg-card rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 group border border-border/50 hover:border-primary/20"
                >
                  <div className="text-2xl group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <span className="text-foreground font-semibold text-base">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button 
                size="xl"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-7 rounded-xl font-semibold w-full sm:w-auto"
                onClick={() => window.location.href = '/generate'}
              >
                Start Creating Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                No credit card required • Takes less than 60 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;