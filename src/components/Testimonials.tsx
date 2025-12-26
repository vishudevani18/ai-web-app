import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Fashion Brand Owner",
    company: "StyleHub",
    content: "This tool saved me ₹15,000 on my last photoshoot! The AI models look so natural with my jewelry pieces. My conversion rates on Myntra increased by 40%.",
    rating: 5,
    image: "👩‍💼"
  },
  {
    name: "Rajesh Kumar",
    role: "Electronics Seller",
    company: "TechMart",
    content: "I uploaded my entire gadget catalog and got professional photos in just 2 hours. What used to take 3 weeks now happens in minutes. Game changer!",
    rating: 5,
    image: "👨‍💻"
  },
  {
    name: "Aisha Patel",
    role: "Home Decor Brand",
    company: "CozySpaces",
    content: "The diverse model selection helped me target different demographics. My Amazon listing photos now look as good as big brands. ROI was immediate.",
    rating: 5,
    image: "👩‍🎨"
  },
  {
    name: "Vikram Singh",
    role: "Fitness Equipment",
    company: "FitGear Pro",
    content: "Before: boring product shots. After: dynamic photos with models demonstrating my products. Sales on Flipkart doubled in the first month!",
    rating: 5,
    image: "💪"
  },
  {
    name: "Meera Joshi",
    role: "Handicrafts Seller",
    company: "ArtisanCrafts",
    content: "As a small business, I couldn't afford professional models. This AI solution gave me high-end product photos that compete with established brands.",
    rating: 5,
    image: "🎨"
  },
  {
    name: "Arjun Reddy",
    role: "Startup Founder",
    company: "InnovateTech",
    content: "Helped me upload my entire inventory to multiple marketplaces with consistent, professional imagery. The time savings alone paid for itself.",
    rating: 5,
    image: "🚀"
  }
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Loved By <span className="text-[hsl(var(--orange-accent))]">200+</span> Brands
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join eCommerce stores, D2C brands, and manufacturers already creating studio-quality product photos with AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`bg-card border border-border rounded-2xl shadow-soft hover:shadow-card transition-all duration-500 hover:scale-[1.02] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-[hsl(var(--orange-accent))]/10 p-2 rounded-lg">
                    <Quote className="w-4 h-4 text-[hsl(var(--orange-accent))]" />
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[hsl(var(--yellow-highlight))] text-[hsl(var(--yellow-highlight))]" />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--orange-accent))]/10 rounded-full flex items-center justify-center text-lg">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div>
            <div className="text-3xl font-bold text-[hsl(var(--orange-accent))]">4.9/5</div>
            <div className="text-muted-foreground text-sm">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[hsl(var(--blue-accent))]">200+</div>
            <div className="text-muted-foreground text-sm">Brands Trust Us</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[hsl(var(--green-success))]">50K+</div>
            <div className="text-muted-foreground text-sm">Images Created</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[hsl(var(--yellow-highlight))]">₹1Cr+</div>
            <div className="text-muted-foreground text-sm">Saved in Costs</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;