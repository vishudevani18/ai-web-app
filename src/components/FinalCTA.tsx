import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-gradient-to-br from-[hsl(var(--orange-accent))]/5 via-background to-[hsl(var(--blue-accent))]/5">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[hsl(var(--accent))]/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[hsl(var(--blue-accent))]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-modern relative z-10">
        <div className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-[hsl(var(--accent))]/20 p-4 rounded-2xl">
              <Sparkles className="w-12 h-12 text-[hsl(var(--orange-accent))]" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Start Your First AI Photoshoot
              <br />
              <span className="text-[hsl(var(--orange-accent))]">Today</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience the fastest, most affordable way to get professional product images. No studio required. No limits.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              onClick={() => navigate("/dashboard/create")}
              variant="hero"
              size="xl"
              className="group shadow-hover"
            >
              Try It Free — Launch in Minutes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card • No setup fees • Instant results
              </p>
            </div>

            {/* Benefits list */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--green-success))]" />
                <span>Zero studio costs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--green-success))]" />
                <span>Unlimited photos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--green-success))]" />
                <span>Instant results</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--green-success))]" />
                <span>Professional quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default FinalCTA;
