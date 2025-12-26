import { Wand2, Users, Download, Sparkles, ShoppingBag, IndianRupee } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const features = [
  {
    icon: Wand2,
    title: "One-Click Catalogs Generation",
    description: "Simply upload your product and let our AI do the heavy lifting. No editing skills needed — just stunning results."
  },
  {
    icon: Users,
    title: "Multiple Pose Variations",
    description: "Standing, walking, sitting, dynamic — generate your product on different model poses from a single photo."
  },
  {
    icon: Download,
    title: "Ready in Seconds",
    description: "Download high-resolution images instantly. Perfect for marketplaces, social media, and your online store."
  },
  {
    icon: Sparkles,
    title: "Studio-Grade Quality",
    description: "Our AI perfects lighting, shadows, and composition automatically. Every image looks professionally shot."
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce Ready Collection",
    description: "20+ model poses • 10+ stunning themes • Endless backgrounds — everything you need for Amazon, Flipkart, Myntra catalogs.",
    highlight: true
  },
  {
    icon: IndianRupee,
    title: "80% Cost Savings",
    description: "Skip expensive studio rentals and photographer fees. Get professional catalog images at a fraction of the cost."
  }
];

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="features" ref={ref} className="py-24 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-5 py-2.5 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
            Everything You Need to Create
            <br />
            <span className="text-gradient-primary">Scroll-Stopping Product Photos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful AI meets intuitive design. No learning curve, no expensive equipment — just results that sell.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHighlight = 'highlight' in feature && feature.highlight;
            return (
              <div
                key={index}
                className={`group rounded-3xl p-8 shadow-soft border card-hover-lift transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${
                  isHighlight 
                    ? 'bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground border-primary/50 shadow-glow' 
                    : 'bg-card border-border/50'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex p-4 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-all duration-300 ${
                  isHighlight 
                    ? 'bg-white/20 group-hover:bg-white/30' 
                    : 'bg-gradient-to-br from-primary to-accent group-hover:shadow-glow'
                }`}>
                  <Icon className={`w-7 h-7 ${isHighlight ? 'text-white' : 'text-primary-foreground'}`} />
                </div>
                {isHighlight && (
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-xl font-bold mb-3 transition-colors ${
                  isHighlight ? 'text-white' : 'text-foreground group-hover:text-primary'
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${isHighlight ? 'text-white/90' : 'text-muted-foreground'}`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
