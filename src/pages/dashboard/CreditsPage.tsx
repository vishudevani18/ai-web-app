import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Image, Gift, ArrowRight } from "lucide-react";

const CreditsPage = () => {
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

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-black text-foreground mb-4">
          Buy <span className="text-gradient-primary">Credits</span>
        </h1>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary/10 border border-primary/30 rounded-full mb-4">
          <span className="text-base font-semibold text-foreground">
            1 Credit = ₹1 • 1 Image = 5 Credits
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative border-2 overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
              plan.popular 
                ? "border-primary shadow-xl shadow-primary/20 ring-2 ring-primary/30 hover:shadow-[0_25px_60px_rgba(157,78,221,0.35)]" 
                : "border-border/50 shadow-soft hover:shadow-[0_20px_50px_rgba(157,78,221,0.25)] hover:shadow-[0_0_30px_rgba(157,78,221,0.15)]"
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-primary text-white px-4 py-1.5 rounded-bl-2xl text-xs font-bold">
                POPULAR
              </div>
            )}
            
            <CardContent className={`p-8 ${plan.popular ? "pt-12" : ""}`}>
              {/* Plan Name & Description */}
              <div className="mb-6">
                <h3 className="text-2xl font-black text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
              </div>
              
              {/* Price */}
              <div className="mb-8 pb-6 border-b-2 border-border/30">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-5xl font-black text-foreground">₹{plan.price}</span>
                </div>
                
                {/* Credits Info */}
                <div className="flex items-center gap-2 text-foreground">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-lg font-bold">{plan.credits} Credits</span>
                </div>
              </div>
              
              {/* Features */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-foreground">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm"><span className="font-semibold">{plan.images} images</span> (5 credits per image)</span>
                </li>
                <li className="flex items-start gap-3 text-foreground">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">High-quality images</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <Check className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Auto delete after 24 hours</span>
                </li>
              </ul>
              
              {/* CTA Button */}
              <Button 
                className={`w-full h-12 text-base font-bold transition-all duration-300 rounded-xl ${
                  plan.popular 
                    ? "bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-lg hover:shadow-glow" 
                    : "bg-secondary hover:bg-primary/10 text-foreground border-2 border-border hover:shadow-[0_10px_30px_rgba(157,78,221,0.2)]"
                }`}
              >
                Buy Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Secure payment • Instant credit delivery</p>
      </div>
    </div>
  );
};

export default CreditsPage;
