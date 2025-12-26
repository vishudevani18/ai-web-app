import { CheckCircle2 } from "lucide-react";

const features = [
  {
    title: "Ready to export in under 5 minutes",
    description: "From upload to download, get professional photos faster than making coffee"
  },
  {
    title: "Pick proven formats like lifestyle, catalog, social",
    description: "Pre-designed templates that work across all marketplaces and platforms"
  },
  {
    title: "Turn any photo into smooth high-quality images",
    description: "AI upscaling and enhancement ensures marketplace-ready quality every time"
  },
  {
    title: "Smart AI: product → model → background → pose",
    description: "Intelligent composition that understands fashion and product photography"
  },
  {
    title: "Consistent model selection across all shots",
    description: "Maintain brand identity with the same model across different poses and settings"
  },
  {
    title: "No photography skills required",
    description: "Professional results without expensive equipment or photography knowledge"
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block">
            <span className="text-sm font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-2 rounded-full">
              Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground">
            Everything You Need to Create<br />Professional Product Photos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful AI technology meets simple, intuitive design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card p-8 rounded-2xl shadow-card hover:shadow-hover transition-all duration-500 border-2 border-border/50 group-hover:border-primary/20 h-full flex flex-col">
                <div className="mb-6">
                  <div className="inline-flex p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to transform your product photography?
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
            <span className="text-sm font-bold text-primary">🚀 Start creating in less than 60 seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
