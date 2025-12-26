import { Upload, Users, ImageIcon, Sparkles, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Product Photo",
    description: "Just upload your product photo — taken with any camera or phone. No professional equipment needed. Our AI handles everything else.",
  },
  {
    icon: Users,
    title: "Choose Your Model",
    description: "Select from diverse professional models that match your brand. Pick the perfect look to showcase your product authentically.",
  },
  {
    icon: ImageIcon,
    title: "Pick Background & Pose",
    description: "Choose from studio, lifestyle, or minimalist backgrounds. Select proven poses that drive engagement and conversions.",
  },
  {
    icon: Sparkles,
    title: "Generate & Download Instantly",
    description: "AI creates your professional product photo in high resolution within minutes. Download and use immediately — marketplace ready.",
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block">
            <span className="text-sm font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-2 rounded-full">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground">
            From Product to Perfection in 4 Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No complicated setup. No technical knowledge required. Just stunning results.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-6xl mx-auto mb-24">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" 
               style={{ top: "6rem" }} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative group">
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative bg-card p-8 rounded-3xl shadow-card hover:shadow-hover transition-all duration-500 border-2 border-border/50 group-hover:border-primary/30 h-full">
                      {/* Step Number Badge */}
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300">
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Icon */}
                      <div className="mb-6 mt-4 flex justify-center">
                        <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-10 h-10 text-primary" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-foreground mb-3 text-center">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed text-center">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Perfect For Section */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-2xl" />
          <div className="relative bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm p-12 rounded-3xl border-2 border-primary/20 shadow-hover">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Perfect For Every Fashion Business
              </h3>
              <p className="text-lg text-muted-foreground">
                Trusted by brands of all sizes, from startups to enterprises
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: "eCommerce Brands", desc: "Scale your product catalog instantly" },
                { title: "Fashion Designers", desc: "Showcase collections professionally" },
                { title: "D2C Startups", desc: "Launch with stunning visuals" }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center gap-3 p-6 bg-background/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 group border border-border/50"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-foreground text-lg block mb-1">{item.title}</span>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center pt-6 border-t border-border/50">
              <p className="text-xl font-semibold text-foreground mb-2">
                ⚡ Generate unlimited photos • 🎨 Infinite creative control • 💰 Zero per-photo cost
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;