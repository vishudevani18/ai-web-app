import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, Home, Wand2, CreditCard, MessageCircle, Sparkles, ArrowRight, Award } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  const sections = [
    { id: "hero", label: "Home", icon: Home },
    { id: "why-choose-us", label: "Why Choose Us", icon: Award },
    { id: "features", label: "Features", icon: Wand2 },
    { id: "pricing", label: "Pricing", icon: CreditCard },
    { id: "contact", label: "Contact", icon: MessageCircle },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-foreground to-foreground/95 text-white relative overflow-hidden border-t border-border/50">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        {/* Main Footer Content - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 mb-8 sm:mb-12">
          {/* Brand Section - Mobile Responsive */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6">
            <a href="/" className="inline-flex items-center gap-2 sm:gap-3 group touch-manipulation active:scale-95">
              <Logo variant="horizontal" size="md" theme="dark" className="text-white" />
            </a>
            <div className="space-y-2">
              <p className="text-primary font-bold text-sm sm:text-base">
                Studio-Quality Fashions
              </p>
              <p className="text-white/60 text-xs sm:text-sm font-medium mb-2">
                Where Fashions Meets AI
              </p>
              <p className="text-white/80 leading-relaxed max-w-md text-sm sm:text-base">
                The only platform where you choose your own AI faces, backgrounds, poses, and themes. Generate e-commerce ready catalog images in 10 seconds for just ₹5 per image.
              </p>
            </div>
            
            {/* Contact Info - Mobile Responsive */}
            <div className="space-y-2 sm:space-y-3 pt-2">
              <a href="mailto:hello@garmentoai.com" className="flex items-center gap-2 sm:gap-3 text-white/80 hover:text-white active:text-white transition-colors group touch-manipulation min-h-[44px]">
                <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-primary/30 transition-colors flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-sm truncate">hello@garmentoai.com</span>
              </a>
              <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-2 sm:gap-3 text-white/80 hover:text-white active:text-white transition-colors group touch-manipulation min-h-[44px]">
                <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-primary/30 transition-colors flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-sm">+91 XXXXX XXXXX</span>
              </a>
              <div className="flex items-center gap-2 sm:gap-3 text-white/80">
                <div className="p-1.5 bg-white/10 rounded-lg flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-sm">Your City, State, Country</span>
              </div>
            </div>

            {/* Social Links - Mobile Responsive */}
            <div className="flex gap-2 sm:gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/10 hover:bg-primary/30 active:bg-primary/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-lg group touch-manipulation"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Mobile Responsive */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="font-black text-base sm:text-lg text-white mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <li key={index}>
                    <button 
                      onClick={() => scrollToSection(section.id)}
                      className="flex items-center gap-2 sm:gap-2.5 text-white/70 hover:text-primary active:text-primary transition-colors group text-xs sm:text-sm font-medium touch-manipulation active:scale-95 min-h-[44px]"
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                      {section.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal Links - Mobile Responsive */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="font-black text-base sm:text-lg text-white mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-2 sm:space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-primary active:text-primary transition-colors text-xs sm:text-sm font-medium inline-flex items-center gap-2 group touch-manipulation active:scale-95 min-h-[44px]"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section - Mobile Responsive */}
        <div className="bg-gradient-primary/20 backdrop-blur-sm border border-primary/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black text-white">Ready to Transform Your Product Images?</h3>
              </div>
              <p className="text-white/80 text-xs sm:text-sm">
                Start creating professional catalog images in just 10 seconds. Only ₹5 per image.
              </p>
            </div>
            <Button
              onClick={() => scrollToSection("hero")}
              className="bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-lg hover:shadow-glow transition-all duration-300 rounded-lg sm:rounded-xl px-6 sm:px-8 py-4 sm:py-6 font-bold group w-full md:w-auto touch-manipulation active:scale-[0.98] min-h-[48px] text-sm sm:text-base"
            >
              Get Started Free
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Bottom Bar - Mobile Responsive */}
        <div className="pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex justify-center items-center text-xs sm:text-sm text-white/60 px-4">
            <p className="text-center">
              © {new Date().getFullYear()} GarmentoAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
