import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Shield, Sparkles, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const plans = [
  {
    name: "Free Trial",
    price: "₹0",
    period: "forever",
    description: "Perfect for testing our AI capabilities",
    features: [
      "5 image generations",
      "Basic model selection", 
      "Standard backgrounds",
      "720p resolution",
      "Email support"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "outline" as const,
    popular: false,
    gradient: "from-gray-400 to-gray-600"
  },
  {
    name: "Starter",
    price: "₹999",
    period: "/month", 
    description: "Ideal for small businesses and individual sellers",
    features: [
      "100 image generations",
      "All 10+ models",
      "All backgrounds & poses",
      "4K resolution",
      "Priority support",
      "Commercial license",
      "Batch processing"
    ],
    buttonText: "Start Starter Plan",
    buttonVariant: "default" as const,
    popular: true,
    gradient: "from-primary to-blue-500"
  },
  {
    name: "Pro", 
    price: "₹2,999",
    period: "/month",
    description: "For growing businesses with higher volume needs",
    features: [
      "500 image generations",
      "All premium features", 
      "Custom model training",
      "API access",
      "White-label solution",
      "Dedicated support",
      "Advanced analytics",
      "Team collaboration"
    ],
    buttonText: "Start Pro Plan",
    buttonVariant: "default" as const,
    popular: false,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large teams and enterprises", 
    features: [
      "Unlimited generations",
      "Custom integrations",
      "On-premise deployment", 
      "SLA guarantee",
      "Custom model development",
      "24/7 phone support",
      "Training & onboarding",
      "Account manager"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false,
    gradient: "from-emerald-500 to-teal-500"
  }
];

const Pricing = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="pricing" className="section-padding relative overflow-hidden bg-background">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      
      <div className="container-modern relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Pricing Plans</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Simple, <span className="text-[hsl(var(--orange-accent))]">Transparent</span> Pricing
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start free, scale as you grow. No hidden fees, no surprises — just professional product photos at your fingertips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className="bg-[hsl(var(--orange-accent))] text-white border-0 px-4 py-2 shadow-soft animate-pulse">
                    <Star className="w-3 h-3 mr-1 fill-white" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {/* Glow effect for popular plan */}
              {plan.popular && (
                <div className="absolute -inset-1 bg-[hsl(var(--orange-accent))]/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-all duration-500" />
              )}
              
              <Card className={`bg-card border border-border rounded-2xl shadow-soft h-full hover:shadow-card transition-all duration-300 hover:scale-[1.02] relative ${plan.popular ? 'border-[hsl(var(--orange-accent))]/50' : ''}`}>
                <CardHeader className="text-center pb-8 relative">
                  {/* Plan icon */}
                  <div className={`bg-gradient-to-r ${plan.gradient} p-3 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}>
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl mb-4">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-lg">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.buttonVariant}
                    className="w-full"
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-card border border-border rounded-full inline-flex items-center gap-3 px-8 py-4 shadow-soft">
            <Shield className="w-5 h-5 text-[hsl(var(--green-success))]" />
            <span className="font-semibold text-foreground">30-day money-back guarantee on all paid plans</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;