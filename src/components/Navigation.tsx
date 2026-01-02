import { useState, useEffect } from "react";
import { Menu, X, Camera, Sparkles, Home, Wand2, CreditCard, Mail, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Home", icon: Home },
    { id: "features", label: "Features", icon: Wand2 },
    { id: "pricing", label: "Pricing", icon: CreditCard },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer to detect active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is in the middle-upper part of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Also observe the hero section when at top
    const handleScrollForHero = () => {
      if (window.scrollY < 100) {
        setActiveSection("hero");
      }
    };
    window.addEventListener("scroll", handleScrollForHero);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollForHero);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg' 
        : 'bg-background/80 backdrop-blur-md border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo - Enhanced - Mobile Responsive */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center gap-2 sm:gap-3 group touch-manipulation">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-lg sm:rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative p-1.5 sm:p-2 bg-gradient-primary rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">
                PhotoAI
              </span>
            </a>
          </div>

          {/* Desktop Navigation - Modern Design */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Navigation Links */}
            <div className="flex items-center gap-1 mr-6">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg group ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-foreground/70 hover:text-foreground hover:bg-primary/5"
                    }`}
                  >
                    <span className="relative z-10">{section.label}</span>
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-primary transition-all duration-300 rounded-full ${
                        isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Auth Buttons - Eye-catching */}
            <div className="flex items-center gap-3 pl-6 border-l border-border/50">
              <Button 
                variant="ghost" 
                asChild 
                className="font-semibold text-foreground/70 hover:text-primary hover:bg-primary/10 rounded-xl px-5 py-2 transition-all duration-200"
              >
                <a href="/auth?mode=signin" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </a>
              </Button>
              <Button 
                asChild 
                className="font-bold bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-lg hover:shadow-glow transition-all duration-300 rounded-xl px-6 py-2.5 group relative overflow-hidden"
              >
                <a href="/auth?mode=register" className="flex items-center gap-2 relative z-10">
                  <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Sign Up</span>
                  <div className="absolute inset-0 bg-gradient-vibrant opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button - Touch Friendly */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground hover:bg-primary/10 rounded-xl w-10 h-10 sm:w-12 sm:h-12 touch-manipulation active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </Button>
        </div>

        {/* Mobile Menu - Enhanced - Touch Friendly */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 sm:py-6 space-y-2 border-t border-border/50 animate-fade-in max-h-[calc(100vh-5rem)] overflow-y-auto">
            {/* Section Links */}
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-3 w-full transition-all duration-200 py-3.5 sm:py-4 px-4 rounded-xl text-sm sm:text-base font-semibold group touch-manipulation active:scale-[0.98] min-h-[44px] ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 active:text-primary active:bg-primary/5"
                  }`}
                >
                  <div
                    className={`p-1.5 sm:p-2 rounded-lg transition-colors flex-shrink-0 ${
                      isActive
                        ? "bg-primary/20"
                        : "bg-primary/10 group-active:bg-primary/20"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  {section.label}
                </button>
              );
            })}

            {/* Mobile Auth Buttons - Touch Friendly */}
            <div className="flex flex-col gap-3 pt-4 sm:pt-6 border-t border-border/50 mt-4">
              <Button 
                variant="outline" 
                asChild 
                className="w-full font-semibold border-border/50 rounded-xl py-4 sm:py-6 hover:bg-primary/5 hover:border-primary/50 transition-all touch-manipulation active:scale-[0.98] min-h-[48px] text-sm sm:text-base"
              >
                <a href="/auth?mode=signin" className="flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  Sign In
                </a>
              </Button>
              <Button 
                asChild 
                className="w-full font-bold bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-lg hover:shadow-glow transition-all rounded-xl py-4 sm:py-6 touch-manipulation active:scale-[0.98] min-h-[48px] text-sm sm:text-base"
              >
                <a href="/auth?mode=register" className="flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                  Sign Up Free
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
