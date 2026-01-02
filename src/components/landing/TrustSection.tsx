import { Users, IndianRupee, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const stats = [
  { icon: Users, value: "1000", label: "Active Users", color: "from-primary to-accent" },
  { icon: IndianRupee, value: "80%", label: "Cost Savings", color: "from-accent to-primary" },
  { icon: Award, value: "10K+", label: "Images Created", color: "from-primary to-violet-accent" }
];

const TrustSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Background pattern - more subtle - Mobile Optimized */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] border border-primary/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] border border-primary/10 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-3 sm:mb-4 px-2">
            Trusted by <span className="text-gradient-primary">Growing</span> Brands
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4">
            Join the community of sellers who've transformed their product photography
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-card border border-border/50 text-center card-hover-lift transition-all duration-500 touch-manipulation active:scale-[0.98] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex p-3 sm:p-4 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-foreground mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonial quote - Mobile Responsive */}
        <div className={`mt-8 sm:mt-12 lg:mt-16 max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
          <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card border border-border/50 relative">
            <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-xl sm:text-2xl font-serif">"</span>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-foreground leading-relaxed mb-4 sm:mb-6 italic px-2">
              We reduced our catalog production time from 2 weeks to 2 hours. The AI-generated images look so realistic, our customers can't tell the difference!
            </p>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm sm:text-base">
                PS
              </div>
              <div className="text-left">
                <div className="font-bold text-sm sm:text-base text-foreground">Priya Sharma</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Founder, Ethnic Elegance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
