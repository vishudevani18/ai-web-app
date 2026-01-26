import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap, Users, Palette, IndianRupee, ShoppingBag, CheckCircle2, User, ImageIcon, Layout, Wand2, ShoppingCart, Store, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  // Unique features highlighting customization
  const uniqueFeatures = [
    {
      icon: User,
      title: "Your Own AI Faces",
      description: "Choose and maintain consistent AI faces across all your product catalogs"
    },
    {
      icon: ImageIcon,
      title: "Custom Backgrounds",
      description: "Select from thousands of backgrounds or upload your own"
    },
    {
      icon: Layout,
      title: "Poses & Styles",
      description: "Choose from multiple poses, styles, and compositions"
    },
    {
      icon: Wand2,
      title: "Background Themes",
      description: "Apply consistent themes across your entire catalog"
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      {/* AI-Themed Animated Background - Light Version */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base gradient background - Very light */}
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        
        {/* Neural Network Pattern Background - Light */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(157, 78, 221, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(247, 37, 133, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(157, 78, 221, 0.15) 0%, transparent 70%),
              linear-gradient(135deg, transparent 0%, rgba(157, 78, 221, 0.1) 50%, transparent 100%)
            `,
            backgroundSize: '200% 200%, 150% 150%, 100% 100%, 100% 100%',
            animation: 'neuralNetwork 20s ease-in-out infinite',
          }}
        />
        
        {/* Circuit/Grid Pattern - Light */}
        <div 
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `
              linear-gradient(rgba(157, 78, 221, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(157, 78, 221, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(247, 37, 133, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(247, 37, 133, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 100px 100px, 50px 50px, 50px 50px',
            backgroundPosition: '0 0, 0 0, 25px 25px, 25px 25px',
            animation: 'gridMove 30s linear infinite',
          }}
        />
        
        {/* AI Nodes/Connections - Animated SVG - Light */}
        <svg className="absolute inset-0 w-full h-full opacity-12" style={{ filter: 'blur(0.5px)' }}>
          <defs>
            <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(157, 78, 221, 0.15)" />
              <stop offset="100%" stopColor="rgba(247, 37, 133, 0.15)" />
            </linearGradient>
          </defs>
          {/* Neural network connections */}
          {[...Array(12)].map((_, i) => {
            const x1 = 10 + (i % 4) * 30;
            const y1 = 15 + Math.floor(i / 4) * 30;
            const x2 = 20 + ((i + 2) % 4) * 30;
            const y2 = 25 + Math.floor((i + 2) / 4) * 30;
            return (
              <line
                key={`line-${i}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#nodeGradient)"
                strokeWidth="2"
                opacity="0.15"
                style={{
                  animation: `pulseLine ${3 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            );
          })}
          {/* Neural network nodes */}
          {[...Array(20)].map((_, i) => {
            const cx = 10 + (i % 5) * 22.5;
            const cy = 10 + Math.floor(i / 5) * 25;
            return (
              <circle
                key={`node-${i}`}
                cx={`${cx}%`}
                cy={`${cy}%`}
                r="8"
                fill="url(#nodeGradient)"
                style={{
                  animation: `pulseNode ${2 + (i % 4)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            );
          })}
        </svg>
        
        {/* Geometric AI Shapes - Light */}
        <div className="absolute inset-0">
          {/* Hexagons - AI/Tech representation */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`hex-${i}`}
              className="absolute opacity-10"
              style={{
                left: `${20 + (i * 30)}%`,
                top: `${25 + (i % 2) * 40}%`,
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.2), rgba(247, 37, 133, 0.2))',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                animation: `rotateHex ${10 + i * 2}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
                filter: 'blur(1px)',
              }}
            />
          ))}
          
          {/* Triangles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`triangle-${i}`}
              className="absolute opacity-8"
              style={{
                left: `${10 + (i * 20)}%`,
                top: `${15 + (i % 3) * 30}%`,
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.18), rgba(247, 37, 133, 0.18))',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                animation: `rotateHex ${8 + i * 1.5}s linear infinite`,
                animationDelay: `${i * 0.4}s`,
                filter: 'blur(1px)',
              }}
            />
          ))}
          
          {/* Pentagons */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`pentagon-${i}`}
              className="absolute opacity-7"
              style={{
                left: `${25 + (i * 25)}%`,
                top: `${30 + (i % 2) * 35}%`,
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, rgba(247, 37, 133, 0.18), rgba(157, 78, 221, 0.18))',
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                animation: `rotateHex ${12 + i * 2}s linear infinite`,
                animationDelay: `${i * 0.6}s`,
                filter: 'blur(1px)',
              }}
            />
          ))}
          
          {/* Octagons */}
          {[...Array(2)].map((_, i) => (
            <div
              key={`octagon-${i}`}
              className="absolute opacity-6"
              style={{
                left: `${30 + (i * 40)}%`,
                top: `${25 + (i * 50)}%`,
                width: '65px',
                height: '65px',
                background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.15), rgba(247, 37, 133, 0.15))',
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                animation: `rotateHex ${14 + i * 2}s linear infinite`,
                animationDelay: `${i * 0.7}s`,
                filter: 'blur(1px)',
              }}
            />
          ))}
          
          {/* Floating geometric shapes */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`shape-${i}`}
              className="absolute opacity-12"
              style={{
                left: `${8 + (i * 8)}%`,
                top: `${12 + (i % 4) * 22}%`,
                width: `${40 + (i % 3) * 20}px`,
                height: `${40 + (i % 3) * 20}px`,
                background: i % 2 === 0 
                  ? 'linear-gradient(45deg, rgba(157, 78, 221, 0.2), transparent)'
                  : 'linear-gradient(45deg, rgba(247, 37, 133, 0.2), transparent)',
                borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '20%' : '0%',
                transform: `rotate(${i * 45}deg)`,
                animation: `floatShape ${6 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                filter: 'blur(2px)',
              }}
            />
          ))}
        </div>
        
        {/* E-commerce Brand Elements - Very Light */}
        <div className="absolute inset-0 opacity-5">
          {/* Myntra Brand Element */}
          <div
            className="absolute animate-float"
            style={{
              left: '12%',
              top: '40%',
              animationDelay: '0s',
              animationDuration: '6s',
            }}
          >
            <div className="flex items-center gap-1 bg-primary/5 backdrop-blur-sm rounded-lg px-2 py-1 border border-primary/10">
              <ShoppingBag className="w-4 h-4 text-primary/20" />
              <span className="text-xs font-bold text-primary/20">Myntra</span>
            </div>
          </div>
          
          {/* Ajio Brand Element */}
          <div
            className="absolute animate-float"
            style={{
              left: '88%',
              top: '45%',
              animationDelay: '2s',
              animationDuration: '7s',
            }}
          >
            <div className="flex items-center gap-1 bg-accent/5 backdrop-blur-sm rounded-lg px-2 py-1 border border-accent/10">
              <Store className="w-4 h-4 text-accent/20" />
              <span className="text-xs font-bold text-accent/20">Ajio</span>
            </div>
          </div>
          
          {/* Meesho Brand Element */}
          <div
            className="absolute animate-float"
            style={{
              left: '50%',
              top: '80%',
              animationDelay: '1s',
              animationDuration: '5.5s',
            }}
          >
            <div className="flex items-center gap-1 bg-primary/5 backdrop-blur-sm rounded-lg px-2 py-1 border border-primary/10">
              <Package className="w-4 h-4 text-primary/20" />
              <span className="text-xs font-bold text-primary/20">Meesho</span>
            </div>
          </div>
          
          {/* Amazon Brand Element */}
          <div
            className="absolute animate-float"
            style={{
              left: '5%',
              top: '60%',
              animationDelay: '3s',
              animationDuration: '6.5s',
            }}
          >
            <div className="flex items-center gap-1 bg-accent/5 backdrop-blur-sm rounded-lg px-2 py-1 border border-accent/10">
              <ShoppingCart className="w-4 h-4 text-accent/20" />
              <span className="text-xs font-bold text-accent/20">Amazon</span>
            </div>
          </div>
        </div>
        
        {/* Animated gradient orbs - Light */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/8 to-primary/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-primary/5 via-accent/4 to-transparent rounded-full" />
        </div>
        
        {/* Data stream effect - Light */}
        <div className="absolute inset-0 opacity-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={`stream-${i}`}
              className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"
              style={{
                left: `${20 + i * 20}%`,
                animation: `dataStream ${3 + i}s linear infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content - Compact Centered Layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16 w-full">
        <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-5 lg:space-y-6">
          {/* AI Badge */}
          <div className="animate-fade-in">
            <div className="relative inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border-2 border-primary/50 rounded-full px-4 py-2 shadow-lg group hover:shadow-[0_0_20px_rgba(157,78,221,0.4)] hover:border-primary/70 transition-all duration-300">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-primary/20 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2 z-10">
                <div className="p-1 bg-gradient-primary rounded-full flex-shrink-0 group-hover:animate-icon-rotate group-hover:scale-110 transition-all duration-300">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-black text-foreground tracking-wider uppercase">AI-Powered E-Commerce Studio</span>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-3 sm:space-y-4 animate-slide-up w-full" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
              <span className="text-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]">Create Catalog Images</span>
              <br />
              <span className="relative inline-block">
                <span className="text-gradient-primary drop-shadow-[0_2px_8px_rgba(157,78,221,0.5)]">Your Way</span>
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-primary/30 blur-xl -z-10" />
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 relative py-1">
              <div className="h-0.5 flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-r from-transparent via-primary/60 to-primary/80 rounded-full" />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground font-black whitespace-nowrap px-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
                In 10 Seconds
              </span>
              <div className="h-0.5 flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-l from-transparent via-primary/60 to-primary/80 rounded-full" />
            </div>
          </div>
          
        
          
          {/* Combined Description & Platform Info */}
          <div className="space-y-3 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
              The only platform where you choose{" "}
              <span className="text-primary font-bold drop-shadow-[0_1px_4px_rgba(157,78,221,0.3)]">your own AI faces, backgrounds, poses, and themes</span>
            </p>
            <div className="flex items-center justify-center gap-2 sm:gap-3 bg-white/15 backdrop-blur-md border border-primary/30 rounded-xl px-4 py-2.5 shadow-lg animate-scale-in-bounce hover:border-primary/50 hover:shadow-[0_0_20px_rgba(157,78,221,0.3)] transition-all duration-300" style={{ animationDelay: "0.2s" }}>
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 animate-icon-pulse" />
              <p className="text-sm sm:text-base text-foreground/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                Ready to upload to{" "}
                <span className="text-primary font-bold drop-shadow-[0_1px_3px_rgba(157,78,221,0.3)] inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">Myntra, Amazon, Meesho, Ajio</span> & more
              </p>
            </div>
          </div>

          {/* Compact Features Grid - 4 columns on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-4xl mx-auto w-full">
            {uniqueFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/15 backdrop-blur-md border border-primary/30 rounded-lg p-2.5 sm:p-3 shadow-lg hover:shadow-[0_20px_50px_rgba(157,78,221,0.35)] hover:shadow-[0_0_30px_rgba(157,78,221,0.2)] hover:border-primary/50 hover:scale-105 hover:-translate-y-1 transition-all duration-300 touch-manipulation active:scale-[0.98] animate-slide-in-up"
                  style={{ 
                    animationDelay: `${0.25 + index * 0.1}s`,
                    opacity: 0,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2">
                    <div className="p-1.5 bg-gradient-primary rounded-lg flex-shrink-0 hover:animate-glow-pulse transition-all duration-300">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-foreground mb-0.5 leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.05)]">{feature.title}</h3>
                      <p className="text-[10px] sm:text-xs text-foreground/80 leading-tight line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Combined Benefits & Stats - Horizontal Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto w-full">
            {/* Cost Savings */}
            <div 
              className="flex items-center gap-3 bg-white/15 backdrop-blur-md border border-primary/30 rounded-xl p-3 sm:p-4 shadow-lg hover:border-primary/50 hover:shadow-[0_0_25px_rgba(157,78,221,0.3)] hover:scale-105 transition-all duration-300 animate-slide-in-left"
              style={{ 
                animationDelay: "0.35s",
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              <div className="p-2 bg-gradient-primary rounded-lg flex-shrink-0 animate-icon-pulse hover:animate-glow-pulse transition-all duration-300">
                <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-lg sm:text-xl font-black text-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.05)]">₹5 per Image</div>
                <div className="text-xs text-foreground/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">Save 50% on catalog costs</div>
              </div>
            </div>

            {/* Stats Combined */}
            <div 
              className="flex items-center gap-2 sm:gap-3 bg-white/15 backdrop-blur-md border border-primary/30 rounded-xl p-3 sm:p-4 shadow-lg hover:border-primary/50 hover:shadow-[0_0_25px_rgba(157,78,221,0.3)] hover:scale-105 transition-all duration-300 animate-slide-in-right"
              style={{ 
                animationDelay: "0.4s",
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              <div className="flex items-center gap-2 flex-1">
                <div className="p-1.5 bg-gradient-primary rounded-lg flex-shrink-0 hover:animate-glow-pulse transition-all duration-300">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-base sm:text-lg font-black text-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.05)]">10 sec</div>
                  <div className="text-[10px] sm:text-xs text-foreground/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">Generation</div>
                </div>
              </div>
              <div className="h-8 w-px bg-primary/30" />
              <div className="flex items-center gap-2 flex-1">
                <div className="p-1.5 bg-gradient-primary rounded-lg flex-shrink-0 hover:animate-glow-pulse transition-all duration-300">
                  <Users className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-base sm:text-lg font-black text-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.05)]">1000+</div>
                  <div className="text-[10px] sm:text-xs text-foreground/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">Users</div>
                </div>
              </div>
              <div className="h-8 w-px bg-primary/30" />
              <div className="flex items-center gap-2 flex-1">
                <div className="p-1.5 bg-gradient-primary rounded-lg flex-shrink-0 hover:animate-glow-pulse transition-all duration-300">
                  <Palette className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-base sm:text-lg font-black text-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.05)]">100%</div>
                  <div className="text-[10px] sm:text-xs text-foreground/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">Custom</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <Button
              onClick={() => navigate("/generate")}
              size="xl"
              className="group relative bg-gradient-primary text-white shadow-lg hover:shadow-[0_0_50px_rgba(157,78,221,0.7)] transition-all duration-500 text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-6 rounded-xl font-black overflow-hidden touch-manipulation active:scale-[0.95] animate-scale-in-bounce hover:scale-110 hover:-translate-y-1"
              style={{ 
                animationDelay: "0.5s",
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              {/* Animated gradient shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent via-primary to-accent bg-[length:200%_auto] animate-shimmer opacity-60" />
              
              {/* Pulsing glow effect */}
              <div className="absolute inset-0 bg-gradient-primary rounded-xl animate-glow-pulse opacity-80" />
              
              {/* Main content */}
              <span className="relative z-10 flex items-center justify-center gap-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                Start Creating Free
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-all duration-300 group-hover:scale-110 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
              </span>
              
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-vibrant opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              {/* Shine sweep effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
