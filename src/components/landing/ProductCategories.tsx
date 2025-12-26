import { Shirt, CheckCircle2, ArrowUpRight, Sparkles, TrendingUp, Clock, ImageIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProductCategories = () => {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();

  const benefits = [
    { icon: Sparkles, text: "AI-Powered Styling" },
    { icon: Clock, text: "Ready in 30 Seconds" },
    { icon: ImageIcon, text: "4K Resolution" },
    { icon: TrendingUp, text: "Boost Conversions 3X" }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border-2 border-primary/20 rounded-full animate-float opacity-50" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-primary/20 rounded-full animate-float opacity-30" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-5 py-2.5 mb-6">
            <Shirt className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Built for Fashion</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Made for <span className="text-gradient-primary">Apparel Brands</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From kurtas to sarees, our AI understands Indian fashion. Create stunning catalog images that resonate with your customers.
          </p>
        </div>

        <div className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          <div className="bg-card rounded-3xl p-10 shadow-card border border-border/50 relative overflow-hidden group card-hover-lift">
            {/* Gradient accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full" />
            
            <div className="flex items-start justify-between mb-8 relative z-10">
              <div className="inline-flex p-5 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
                <Shirt className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-foreground">1000+</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Products Styled Daily</div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-3">Women's Fashion</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
              Kurtas, sarees, dresses, tops — our AI creates realistic model shots with perfect draping, fit, and styling that showcase your products beautifully.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                  <benefit.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => navigate("/generate")}
              className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-2xl py-7 text-lg font-bold group/btn shadow-lg hover:shadow-xl transition-all"
            >
              Try It Free — No Credit Card
              <ArrowUpRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
