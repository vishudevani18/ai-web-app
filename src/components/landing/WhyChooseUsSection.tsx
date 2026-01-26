import { 
  Palette, 
  User, 
  Heart, 
  Zap, 
  Sparkles, 
  Award, 
  Layout,
  CheckCircle2,
  Image as ImageIcon,
  ArrowRight
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/ui/Logo";

const benefits = [
  {
    icon: Palette,
    title: "Exact Same Clothes, No Color Variations",
    description: "Generate multiple images of the same product with perfect color consistency. No unexpected color shifts or variations — your product looks exactly the same across all images.",
    highlight: true
  },
  {
    icon: User,
    title: "AI Face Consistency Across Multiple Images",
    description: "Maintain the same AI model face across your entire catalog. Create a consistent brand identity with uniform model appearance in every image.",
  },
  {
    icon: Heart,
    title: "Real Human Touch",
    description: "Our AI-generated models look and feel like real humans with natural expressions, authentic poses, and lifelike features that connect with your customers.",
  },
  {
    icon: Zap,
    title: "Easy to Generate",
    description: "Create professional catalog images in just 10 seconds. Simple interface, one-click generation — no technical skills required.",
  },
  {
    icon: Sparkles,
    title: "Unlimited Variety for Your Unique Brand",
    description: "Choose from countless combinations of faces, poses, backgrounds, and themes. Create a unique visual identity that stands out and represents your brand perfectly.",
  },
  {
    icon: Award,
    title: "No Compromise on Quality",
    description: "Every image is generated with the highest quality standards. Professional-grade results ready for e-commerce platforms — no watermarks, no compromises.",
  },
  {
    icon: Layout,
    title: "Expert-Selected Poses & Backgrounds",
    description: "All poses and backgrounds are carefully selected by industry experts. Tested and approved for major e-commerce platforms like Amazon, Myntra, Meesho, and Ajio.",
  },
];

const WhyChooseUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();

  return (
    <section id="why-choose-us" ref={ref} className="py-12 sm:py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Background decoration - Enhanced */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-gradient-to-tr from-accent/15 to-primary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(270, 80%, 60% / 0.05), hsl(330, 80%, 65% / 0.03), transparent)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Centered - Mobile Responsive */}
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-gradient-primary/10 border-2 border-primary/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 backdrop-blur-sm shadow-soft">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary animate-pulse-slow flex-shrink-0" />
            <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-wider">Why Choose Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-foreground mb-4 sm:mb-6 leading-tight px-2">
            Why Brands Choose
            <br />
            <div className="inline-flex items-center justify-center mt-2 sm:mt-3">
              <Logo variant="text" size="lg" className="mx-auto" />
            </div>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Experience the difference with our advanced AI technology and industry expertise. 
            Create professional catalog images that elevate your brand.
          </p>
        </div>

        {/* Benefits Grid - Mobile First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isHighlight = 'highlight' in benefit && benefit.highlight;
            
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
                  {/* Icon Container - Enhanced */}
                  <div className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0 w-fit ${
                    isHighlight 
                      ? 'bg-white/20 group-hover:bg-white/30 backdrop-blur-sm' 
                      : 'bg-gradient-primary group-hover:shadow-glow'
                  }`}>
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white`} />
                  </div>
                  
                  {/* Badge for highlighted card */}
                  {isHighlight && (
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-4 sm:mb-5 flex-shrink-0 w-fit">
                      <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                      Key Feature
                    </span>
                  )}
                  
                  {/* Title */}
                  <h3 className={`text-lg sm:text-xl lg:text-2xl font-black mb-3 sm:mb-4 transition-colors flex-shrink-0 leading-tight ${
                    isHighlight ? 'text-white' : 'text-foreground group-hover:text-primary'
                  }`}>
                    {benefit.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={`leading-relaxed text-sm sm:text-base lg:text-lg flex-grow ${
                    isHighlight 
                      ? 'text-white/95' 
                      : 'text-muted-foreground group-hover:text-foreground/80'
                  }`}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className={`mt-12 sm:mt-16 lg:mt-20 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Button
            onClick={() => navigate("/generate")}
            size="xl"
            className="group relative bg-gradient-primary text-white shadow-lg hover:shadow-[0_0_50px_rgba(157,78,221,0.7)] transition-all duration-500 text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-6 rounded-xl font-black overflow-hidden touch-manipulation active:scale-[0.95] hover:scale-110 hover:-translate-y-1"
          >
            {/* Animated gradient shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent via-primary to-accent bg-[length:200%_auto] animate-shimmer opacity-60" />
            
            {/* Pulsing glow effect */}
            <div className="absolute inset-0 bg-gradient-primary rounded-xl animate-glow-pulse opacity-80" />
            
            {/* Main content */}
            <span className="relative z-10 flex items-center justify-center gap-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
              <span>Ready to create your perfect catalog? Start generating now!</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
            </span>
            
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-vibrant opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
            
            {/* Shine sweep effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

