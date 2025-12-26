import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const SocialProof = () => {
  const { ref, isVisible } = useScrollAnimation();

  const platforms = [
    "Amazon",
    "Flipkart",
    "Myntra",
    "Meesho",
    "Ajio",
    "Shopify",
    "Nykaa Fashion"
  ];

  return (
    <section 
      ref={ref}
      className={`py-12 bg-muted/30 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider font-medium">
          Upload Your AI-Generated Catalogs To
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {platforms.map((platform, index) => (
            <div
              key={platform}
              className="text-2xl font-bold text-muted-foreground/40 hover:text-foreground transition-colors duration-300"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {platform}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
