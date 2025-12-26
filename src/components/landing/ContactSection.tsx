import { MessageCircle, Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@photoai.in", href: "mailto:hello@photoai.in" },
    { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: MapPin, label: "Location", value: "Surat, Gujarat", href: "#" }
  ];

  return (
    <section id="contact" ref={ref} className="py-24 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left Side - Contact Info */}
          <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-10 lg:p-12 text-primary-foreground relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-5 py-2.5 mb-8 backdrop-blur-sm">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wide">Get In Touch</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black mb-4">
                Let's Talk
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-12 max-w-md">
                Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-5 p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-colors group"
                  >
                    <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-primary-foreground/70">{item.label}</div>
                      <div className="font-semibold text-lg">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className={`bg-card rounded-3xl p-10 lg:p-12 shadow-card border border-border/50 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Send us a message</h3>
              <p className="text-muted-foreground">Fill out the form below and we'll get back to you soon.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-14 rounded-xl border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-14 rounded-xl border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-36 rounded-xl border-border/50 bg-background resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-7 text-lg font-bold group shadow-lg hover:shadow-glow transition-all duration-300 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
