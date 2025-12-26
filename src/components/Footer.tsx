import { Camera, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, Home, Wand2, CreditCard } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  const sections = [
    { id: "hero", label: "Home", icon: Home },
    { id: "features", label: "Features", icon: Wand2 },
    { id: "pricing", label: "Pricing", icon: CreditCard },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Refund Policy", href: "#" }
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
    <footer className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <a href="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                <Camera className="w-8 h-8" />
              </div>
              <span className="text-3xl font-black tracking-tight">PhotoAI</span>
            </a>
            <p className="text-primary-foreground/80 leading-relaxed max-w-md text-lg">
              Transform your product photos into stunning catalog images with the power of AI. Professional results in seconds.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <a href="mailto:hello@photoai.in" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Mail className="w-5 h-5" />
                <span>hello@photoai.in</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Phone className="w-5 h-5" />
                <span>+91 98765 43210</span>
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5" />
                <span>Surat, Gujarat, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Same as sidebar */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <li key={index}>
                    <button 
                      onClick={() => scrollToSection(section.id)}
                      className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {section.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} PhotoAI. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Made with ❤️ in India • Powered by Advanced AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
