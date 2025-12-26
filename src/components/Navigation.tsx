import { useState } from "react";
import { Menu, X, Camera, ChevronDown, Sparkles, Home, Wand2, CreditCard, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const sections = [
    { id: "hero", label: "Home", icon: Home },
    { id: "features", label: "Features", icon: Wand2 },
    { id: "pricing", label: "Pricing", icon: CreditCard },
    { id: "contact", label: "Contact", icon: Mail },
  ];

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
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-soft">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="p-1.5 bg-primary rounded-lg group-hover:scale-110 transition-transform">
                <Camera className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-black text-foreground tracking-tight">PhotoAI</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground/70 hover:text-primary transition-colors text-sm font-semibold">
                <span>Products</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border/50 shadow-card rounded-xl z-50">
                <DropdownMenuItem className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-lg">
                  <a href="#kurti" className="w-full py-1">Kurti Photoshoot</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-lg">
                  <a href="#saree" className="w-full py-1">Saree Photoshoot</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button 
              onClick={() => scrollToSection("features")}
              className="text-foreground/70 hover:text-primary transition-colors text-sm font-semibold"
            >
              Features
            </button>
            
            <button 
              onClick={() => scrollToSection("pricing")}
              className="text-foreground/70 hover:text-primary transition-colors text-sm font-semibold"
            >
              Pricing
            </button>
            
            
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-foreground/70 hover:text-primary transition-colors text-sm font-semibold"
            >
              Contact
            </button>

            <div className="flex items-center gap-3 ml-4">
              <Button variant="ghost" asChild className="font-semibold hover:text-primary hover:bg-primary/10">
                <a href="/auth?mode=signin">Sign In</a>
              </Button>
              <Button asChild className="font-bold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-glow transition-all">
                <a href="/auth?mode=register" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground hover:bg-primary/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-1 border-t border-border/50 animate-fade-in">
            {/* Section Links */}
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="flex items-center gap-3 w-full text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors py-3 px-2 rounded-lg text-sm font-semibold"
                >
                  <Icon className="w-5 h-5" />
                  {section.label}
                </button>
              );
            })}


            <div className="flex flex-col gap-3 pt-4 border-t border-border/50 mt-2">
              <Button variant="outline" asChild className="w-full font-semibold border-border/50">
                <a href="/auth?mode=signin">Sign In</a>
              </Button>
              <Button asChild className="w-full font-bold bg-primary hover:bg-primary/90 shadow-lg">
                <a href="/auth?mode=register" className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get Started Free
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
