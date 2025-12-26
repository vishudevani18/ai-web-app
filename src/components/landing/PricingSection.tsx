import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Crown, Zap, Image, Sparkles, CheckCircle, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const plans = [
  {
    name: "Starter",
    price: 199,
    credits: 210,
    bonus: 11,
    images: "~20",
    description: "Perfect for trying out AI photoshoots",
    popular: false,
  },
  {
    name: "Pro",
    price: 499,
    credits: 550,
    bonus: 51,
    images: "~60",
    description: "Best value for growing businesses",
    popular: true,
  },
];

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="pricing" className="section-padding relative overflow-hidden bg-background">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      
      <div className="container-modern relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 mb-4">
            <Gift className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-700">Get bonus credits on every purchase</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Simple </span>
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">Pricing</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            1 Credit = ₹1 • 1 Image = 10 Credits
          </p>
        </div>

        {/* Pricing Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-0 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                plan.popular 
                  ? "shadow-xl shadow-teal-500/20 ring-2 ring-teal-500" 
                  : "shadow-lg shadow-slate-100/80 hover:shadow-slate-200"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-emerald-500 text-center py-2">
                  <span className="text-xs font-bold text-white flex items-center justify-center gap-1">
                    <Crown className="w-3.5 h-3.5" />
                    BEST VALUE
                  </span>
                </div>
              )}
              
              <CardContent className={`p-8 ${plan.popular ? "pt-14" : ""}`}>
                {/* Plan Name & Description */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-foreground">
                    <span className="text-5xl font-bold">₹{plan.price}</span>
                  </div>
                  
                  {/* Bonus Badge */}
                  <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                    <Gift className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-700">
                      Get {plan.credits} credits (+{plan.bonus} bonus)
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-border mb-6" />
                
                {/* Features */}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-foreground">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-3.5 h-3.5 text-teal-600" />
                    </div>
                    <span className="font-medium">{plan.credits} Credits</span>
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Image className="w-3.5 h-3.5 text-teal-600" />
                    </div>
                    <span>Create <span className="font-semibold">{plan.images} images</span></span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                    </div>
                    <span>All models, poses & backgrounds</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    </div>
                    <span>High-quality 4K images</span>
                  </li>
                </ul>
                
                {/* CTA Button */}
                <Button 
                  className={`w-full h-12 text-base font-bold transition-all duration-300 ${
                    plan.popular 
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-teal-500/30" 
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                  asChild
                >
                  <a href="/auth?mode=register">
                    Get Started
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-card border border-border rounded-full inline-flex items-center gap-3 px-8 py-4 shadow-soft">
            <Shield className="w-5 h-5 text-emerald-500" />
            <span className="font-semibold text-foreground">Secure payment • Instant credit delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
