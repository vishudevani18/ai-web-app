import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Image, CheckCircle, Shield, Clock, IndianRupee } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const plans = [
  {
    name: "Try Out",
    price: 99,
    credits: 100,
    images: 20,
    description: "Best to try out & explore. Perfect for small businesses.",
    popular: false,
  },
  {
    name: "Standard",
    price: 199,
    credits: 200,
    images: 40,
    description: "Great for regular use and growing businesses.",
    popular: true,
  },
];

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="pricing" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden bg-gradient-soft">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Simple and Clean - Mobile Responsive */}
        <div className={`mb-8 sm:mb-12 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 px-2">
            <span className="text-foreground">Simple, </span>
            <span className="text-gradient-primary">Transparent Pricing</span>
          </h2>
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-primary/10 border border-primary/30 rounded-full">
            <span className="text-xs sm:text-sm md:text-base font-semibold text-foreground">
              1 Credit = ₹1 • 1 Image = 5 Credits
            </span>
          </div>
        </div>

        {/* Pricing Cards - Redesigned - Mobile First */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-2 overflow-hidden transition-all duration-300 hover:scale-[1.02] touch-manipulation active:scale-[0.98] ${
                plan.popular 
                  ? "border-primary shadow-xl shadow-primary/20 ring-2 ring-primary/30 hover:shadow-[0_25px_60px_rgba(157,78,221,0.35)]" 
                  : "border-border/50 shadow-soft hover:shadow-[0_20px_50px_rgba(157,78,221,0.25)] hover:shadow-[0_0_30px_rgba(157,78,221,0.15)]"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-primary text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl sm:rounded-bl-2xl text-xs font-bold">
                  POPULAR
                </div>
              )}
              
              <CardContent className={`p-5 sm:p-6 lg:p-8 ${plan.popular ? "pt-10 sm:pt-12" : ""}`}>
                {/* Plan Name & Description - Mobile Responsive */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-black text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                </div>
                
                {/* Price - Clean and Prominent - Mobile Responsive */}
                <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-border/30">
                  <div className="flex items-baseline gap-2 mb-2 sm:mb-3">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground">₹{plan.price}</span>
                  </div>
                  
                  {/* Credits Info */}
                  <div className="flex items-center gap-2 text-foreground">
                    <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <span className="text-base sm:text-lg font-bold">{plan.credits} Credits</span>
                  </div>
                </div>
                
                {/* Features - Simple List - Mobile Responsive */}
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <li className="flex items-start gap-2 sm:gap-3 text-foreground">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm"><span className="font-semibold">{plan.images} images</span> (5 credits per image)</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-foreground">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">All AI faces, backgrounds & poses</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-foreground">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">High-quality images</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-muted-foreground">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">Auto delete after 24 hours</span>
                  </li>
                </ul>
                
                {/* CTA Button - Mobile Responsive */}
                <Button 
                  className={`w-full h-11 sm:h-12 text-sm sm:text-base font-bold transition-all duration-300 rounded-xl touch-manipulation active:scale-[0.98] min-h-[44px] ${
                    plan.popular 
                      ? "bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-lg hover:shadow-glow" 
                      : "bg-secondary hover:bg-primary/10 text-foreground border-2 border-border hover:border-primary/50"
                  }`}
                  asChild
                >
                  <a href="/auth/signup">
                    Get Started
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Footer - Simple - Mobile Responsive */}
        <div className={`mt-8 sm:mt-12 text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground px-4">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>Secure payment • Instant credit delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
