import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Sparkles, Upload, Wand2, Download, Image, Users, Palette, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const HowItWorksPage = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation();
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
  
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Product",
      description: "Simply upload a photo of your product - whether it's a saree, kurti, dress, or any fashion item. No professional equipment needed, just use your phone camera.",
      details: [
        "Supports JPEG, PNG formats",
        "No size restrictions",
        "Works with any lighting",
        "Flat lay or hanger shots accepted"
      ],
      gradient: "from-rose-400 to-pink-500"
    },
    {
      icon: Users,
      title: "Choose Your Model",
      description: "Select from our diverse collection of professional models. Pick the perfect model that represents your target audience and brand aesthetic.",
      details: [
        "25+ diverse models",
        "Various ages and ethnicities",
        "Male and female options",
        "Professional expressions"
      ],
      gradient: "from-purple-400 to-indigo-500"
    },
    {
      icon: Palette,
      title: "Select Background & Style",
      description: "Choose from studio, lifestyle, or custom backgrounds. Pick a pose that showcases your product beautifully and matches your brand vibe.",
      details: [
        "20+ curated backgrounds",
        "Studio, outdoor, and lifestyle settings",
        "Professional poses library",
        "Customizable lighting effects"
      ],
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: Wand2,
      title: "AI Does the Magic",
      description: "Our advanced AI technology seamlessly places your product on the model, adjusts lighting, shadows, and creates a photorealistic result.",
      details: [
        "Automatic fit adjustment",
        "Natural draping simulation",
        "Shadow and lighting optimization",
        "Professional color correction"
      ],
      gradient: "from-amber-400 to-orange-500"
    },
    {
      icon: Download,
      title: "Download & Use",
      description: "Get your professional product photo in 4K resolution, ready to use on your e-commerce store, social media, or marketing materials.",
      details: [
        "4K high resolution output",
        "Multiple format options",
        "Instant download",
        "Commercial use license"
      ],
      gradient: "from-green-400 to-emerald-500"
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional photos in under 2 minutes",
      stat: "2 min"
    },
    {
      icon: Image,
      title: "Studio Quality",
      description: "4K resolution images ready for any platform",
      stat: "4K"
    },
    {
      icon: Sparkles,
      title: "Cost Effective",
      description: "90% cheaper than traditional photoshoots",
      stat: "90%"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="container-modern relative z-10">
          <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 glass-card px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">Transform Products into Professional Photos</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              How <span className="text-[hsl(var(--orange-accent))]">It</span> Works
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Five simple steps to transform your product photos into stunning, professional images. 
              No expensive cameras, no professional models, no studio rental needed.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section ref={stepsRef} className="section-padding bg-background">
        <div className="container-modern">
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center transition-all duration-1000 ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`bg-gradient-to-r ${step.gradient} p-4 rounded-2xl`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground">
                      Step {index + 1}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">{step.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
                  
                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1">
                          <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-foreground/80">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex-1">
                  <div className="bg-card border border-border rounded-2xl shadow-soft p-8 h-80 flex items-center justify-center">
                    <step.icon className="w-32 h-32 text-muted-foreground/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="section-padding bg-muted/30">
        <div className="container-modern">
          <div className={`text-center mb-16 transition-all duration-1000 ${benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">Why Choose Us?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional results without the professional hassle or cost
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`bg-card border border-border rounded-2xl shadow-soft p-8 text-center hover:shadow-card hover:scale-[1.02] transition-all duration-500 ${benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div className="inline-flex p-4 rounded-2xl bg-[hsl(var(--orange-accent))]/10 mb-6">
                  <benefit.icon className="w-12 h-12 text-[hsl(var(--orange-accent))]" />
                </div>
                <div className="text-5xl font-bold text-[hsl(var(--orange-accent))] mb-4">{benefit.stat}</div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="section-padding bg-background">
        <div className="container-modern">
          <div className={`bg-gradient-to-br from-[hsl(var(--orange-accent))]/90 to-[hsl(var(--blue-accent))]/90 rounded-3xl shadow-card p-12 text-center text-white transition-all duration-1000 ${ctaVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Transform Your Products?</h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join 200+ brands creating stunning product photos with AI
            </p>
            <Button size="xl" variant="secondary" className="text-lg shadow-hover" onClick={() => window.location.href = '/'}>
              Start Free Trial
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
