import { Zap, TrendingUp, DollarSign, Users } from "lucide-react";

const stats = [
  {
    icon: Zap,
    value: "500+",
    label: "Active Brands",
    description: "Fashion brands trust our AI"
  },
  {
    icon: Users,
    value: "100K+",
    label: "Images Created",
    description: "Professional photos generated"
  },
  {
    icon: DollarSign,
    value: "90%",
    label: "Cost Savings",
    description: "Compared to traditional shoots"
  },
  {
    icon: TrendingUp,
    value: "10X",
    label: "Faster",
    description: "Than booking a studio"
  }
];

const TrustStats = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 via-background to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powering thousands of product photoshoots daily
          </h2>
          <p className="text-lg text-muted-foreground">
            Join the brands transforming their visual content with AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-card p-8 rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 border border-border/50 hover:border-primary/20 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="inline-flex p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-base font-bold text-foreground uppercase tracking-wide">
                      {stat.label}
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
