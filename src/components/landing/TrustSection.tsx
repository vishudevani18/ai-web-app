import { Users, Star, TrendingUp, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Creators", color: "from-primary to-accent" },
  { icon: Star, value: "4.9/5", label: "User Rating", color: "from-amber-500 to-orange-500" },
  { icon: TrendingUp, value: "3X", label: "More Sales", color: "from-emerald-500 to-teal-500" },
  { icon: Award, value: "50K+", label: "Images Created", color: "from-purple-500 to-pink-500" }
];

const TrustSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-primary/10 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Trusted by <span className="text-gradient-primary">Thousands</span> of Brands
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Join the growing community of sellers who've transformed their product photography
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-card rounded-3xl p-8 shadow-card border border-border/50 text-center card-hover-lift transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex p-4 bg-gradient-to-br ${stat.color} rounded-2xl mb-6 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-black text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonial quote */}
        <div className={`mt-16 max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
          <div className="bg-card rounded-3xl p-10 shadow-card border border-border/50 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-2xl font-serif">"</span>
            </div>
            <p className="text-xl text-foreground leading-relaxed mb-6 italic">
              We reduced our catalog production time from 2 weeks to 2 hours. The AI-generated images look so realistic, our customers can't tell the difference!
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold">
                PS
              </div>
              <div className="text-left">
                <div className="font-bold text-foreground">Priya Sharma</div>
                <div className="text-sm text-muted-foreground">Founder, Ethnic Elegance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
