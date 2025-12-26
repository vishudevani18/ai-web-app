import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Image, Gift, ArrowRight } from "lucide-react";

const CreditsPage = () => {
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

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 mb-4">
          <Gift className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-medium text-amber-700">Get bonus credits on every purchase</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">Buy </span>
          <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">Credits</span>
        </h1>
        <p className="text-slate-500 text-lg">
          1 Credit = ₹1 • 1 Image = 10 Credits
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative border-0 overflow-hidden transition-all duration-300 hover:shadow-2xl ${
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
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-500">{plan.description}</p>
              </div>
              
              {/* Price */}
              <div className="text-center mb-6">
                <div className="text-slate-800">
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
              <div className="h-px bg-slate-100 mb-6" />
              
              {/* Features */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  <span className="font-medium">{plan.credits} Credits</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Image className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  <span>Create <span className="font-semibold">{plan.images} images</span></span>
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <span>High quality AI photos</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <span>Credits never expire</span>
                </li>
              </ul>
              
              {/* CTA Button */}
              <Button 
                className={`w-full h-12 font-semibold transition-all ${
                  plan.popular 
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-lg shadow-teal-500/25" 
                    : "bg-slate-800 hover:bg-slate-900 text-white"
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
      <div className="text-center text-sm text-slate-500">
        <p>Secure payment via Razorpay • Instant credit delivery</p>
      </div>
    </div>
  );
};

export default CreditsPage;
