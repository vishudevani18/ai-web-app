import { useState, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Sparkles, 
  Image, 
  Tag, 
  CreditCard, 
  LogOut, 
  Menu,
  X,
  Camera,
  Zap,
  Layers,
  Settings,
  Brain,
  Wand2,
  Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useUserProfile } from "@/hooks/use-user-profile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "create", label: "Single Generation", icon: Sparkles, path: "/dashboard/create" },
  { id: "catalog", label: "Catalog Generation", icon: Layers, path: "/dashboard/catalog" },
  { id: "gallery", label: "Gallery", icon: Image, path: "/dashboard/gallery" },
  { id: "guidelines", label: "Guidelines", icon: Tag, path: "/dashboard/guidelines" },
  { id: "credits", label: "Credits Buy", icon: CreditCard, path: "/dashboard/credits" },
  { id: "settings", label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: userProfile } = useUserProfile();
  
  // Get credits from React Query user profile
  const credits = userProfile?.credits ?? 0;

  // Memoize current page title to avoid recalculating on every render
  const currentPageTitle = useMemo(() => {
    return navItems.find(item => item.path === location.pathname)?.label || "Dashboard";
  }, [location.pathname]);

  // Memoize logout handler to prevent unnecessary re-renders
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      // Redirect is handled in the logout hook
    } catch (error) {
      // Error toast is handled by interceptor
      console.error("Logout error:", error);
      // Even if logout fails, redirect to auth page
      navigate('/auth/login', { replace: true });
    }
  }, [logout, navigate]);

  // Memoize mobile menu toggle handler
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  // Memoize mobile menu close handler
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero flex w-full relative overflow-hidden">
      {/* Animated AI Background - Enhanced */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large floating orbs */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/20 via-accent/15 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-accent/20 via-primary/15 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(270, 80%, 60% / 0.1), hsl(330, 80%, 65% / 0.05), transparent)'
            }}
          />
          
          {/* Medium floating orbs */}
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-violet/15 to-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-primary/15 to-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(157, 78, 221, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(157, 78, 221, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating AI Icons - Animated */}
        <div className="absolute inset-0">
          {/* Sparkles icons floating */}
          <div className="absolute top-[20%] right-[15%] animate-float" style={{ animationDelay: '0.5s' }}>
            <Sparkles className="w-8 h-8 text-primary/20 animate-pulse-slow" />
          </div>
          <div className="absolute top-[60%] right-[25%] animate-float" style={{ animationDelay: '2.5s' }}>
            <Sparkles className="w-6 h-6 text-accent/20 animate-pulse-slow" />
          </div>
          <div className="absolute bottom-[30%] left-[20%] animate-float" style={{ animationDelay: '1.5s' }}>
            <Sparkles className="w-7 h-7 text-primary/15 animate-pulse-slow" />
          </div>
          
          {/* Brain icons */}
          <div className="absolute top-[40%] left-[10%] animate-float" style={{ animationDelay: '3.5s' }}>
            <Brain className="w-6 h-6 text-violet/20 animate-pulse-slow" />
          </div>
          <div className="absolute bottom-[20%] right-[10%] animate-float" style={{ animationDelay: '4s' }}>
            <Brain className="w-5 h-5 text-accent/15 animate-pulse-slow" />
          </div>
          
          {/* CPU/Chip icons */}
          <div className="absolute top-[15%] left-[30%] animate-float" style={{ animationDelay: '1s' }}>
            <Cpu className="w-5 h-5 text-primary/20 animate-pulse-slow" />
          </div>
          <div className="absolute bottom-[50%] right-[15%] animate-float" style={{ animationDelay: '2s' }}>
            <Cpu className="w-6 h-6 text-accent/15 animate-pulse-slow" />
          </div>
          
          {/* Wand/Magic icons */}
          <div className="absolute top-[70%] left-[25%] animate-float" style={{ animationDelay: '3s' }}>
            <Wand2 className="w-5 h-5 text-primary/20 animate-pulse-slow" />
          </div>
          <div className="absolute top-[25%] right-[35%] animate-float" style={{ animationDelay: '4.5s' }}>
            <Wand2 className="w-6 h-6 text-violet/15 animate-pulse-slow" />
          </div>
          
          {/* Camera icons */}
          <div className="absolute bottom-[15%] left-[15%] animate-float" style={{ animationDelay: '1.5s' }}>
            <Camera className="w-5 h-5 text-accent/20 animate-pulse-slow" />
          </div>
          <div className="absolute top-[50%] right-[40%] animate-float" style={{ animationDelay: '2.5s' }}>
            <Camera className="w-6 h-6 text-primary/15 animate-pulse-slow" />
          </div>
        </div>

        {/* Animated gradient lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-60 animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-60 animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>
      </div>

        {/* Desktop Sidebar - Always Visible */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col bg-gradient-to-b from-foreground/95 via-foreground/98 to-foreground/95 backdrop-blur-xl border-r border-border/50 shadow-xl">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border/30">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-md opacity-50" />
            <div className="relative p-2 bg-gradient-primary rounded-xl shadow-lg">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-white">PhotoAI</span>
            <span className="text-xs text-white/60">Dashboard</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold group",
                  isActive 
                    ? "bg-gradient-primary text-white shadow-lg shadow-primary/30" 
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-white/60 group-hover:text-white")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border/30 mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-semibold rounded-xl w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header - Enhanced - Centered */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-foreground to-foreground/95 border-b border-border/50 shadow-lg">
        <div className="flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3 w-full">
          <div className="flex items-center justify-between w-full max-w-[1920px] mx-auto">
            <Link to="/" className="flex items-center gap-2 touch-manipulation active:scale-95 flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-md opacity-50" />
                <div className="relative p-1.5 bg-gradient-primary rounded-lg">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="text-base sm:text-lg font-black text-white">PhotoAI</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/30 border border-primary/50">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white">{credits}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="text-white hover:bg-white/10 w-9 h-9 sm:w-10 sm:h-10 touch-manipulation active:scale-95"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu - Enhanced */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gradient-to-b from-foreground to-foreground/95 border-t border-border/50 animate-fade-in shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="p-3 sm:p-4 space-y-1.5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold touch-manipulation active:scale-[0.98] min-h-[44px]",
                      isActive 
                        ? "bg-gradient-primary text-white shadow-lg" 
                        : "text-white/70 active:bg-white/10 active:text-white"
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-white/70 active:text-white active:bg-white/10 transition-all text-sm font-semibold rounded-xl w-full mt-4 touch-manipulation active:scale-[0.98] min-h-[44px]"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content - Mobile Responsive */}
      <div className="flex-1 lg:ml-64 relative z-10 flex flex-col w-full h-full overflow-y-auto">
        {/* Desktop Header - Centered and Full Width */}
        <header className="hidden lg:flex sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 items-center justify-center px-6 lg:px-8 py-3 lg:py-4 shadow-sm w-full">
          <div className="flex items-center justify-between w-full max-w-[1920px] mx-auto relative">
            {/* Centered Title */}
            <h1 className="absolute left-1/2 -translate-x-1/2 text-lg lg:text-xl xl:text-2xl font-black text-foreground text-center">
              {currentPageTitle}
            </h1>
            {/* Right side - Credits */}
            <div className="flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-xl border-2 border-primary/30 bg-gradient-primary/10 flex-shrink-0 ml-auto">
              <Zap className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-bold text-foreground">{credits}</span>
              <span className="text-sm text-muted-foreground hidden sm:inline">credits</span>
            </div>
          </div>
        </header>

        {/* Page Content - Mobile Responsive - Full Width Centered */}
        <main className="flex-1 w-full p-3 sm:p-4 lg:p-6 xl:p-8 pt-16 sm:pt-20 lg:pt-8 relative z-10 min-h-0">
          <div className="w-full max-w-[1920px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
