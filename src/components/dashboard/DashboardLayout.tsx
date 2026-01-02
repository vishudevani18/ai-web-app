import { useState } from "react";
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
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

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
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const credits = 30;

  return (
    <div className="min-h-screen bg-gradient-hero flex w-full">
        {/* Desktop Sidebar - Always Visible */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col bg-gradient-to-b from-foreground to-foreground/95 border-r border-border/50 shadow-xl">
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
            onClick={() => {
              localStorage.removeItem("mockUser");
              navigate("/");
            }}
            className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-semibold rounded-xl w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header - Enhanced */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-foreground to-foreground/95 border-b border-border/50 shadow-lg">
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3">
          <Link to="/" className="flex items-center gap-2 touch-manipulation active:scale-95">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-md opacity-50" />
              <div className="relative p-1.5 bg-gradient-primary rounded-lg">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-base sm:text-lg font-black text-white">PhotoAI</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/30 border border-primary/50">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-white">{credits}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-white/10 w-9 h-9 sm:w-10 sm:h-10 touch-manipulation active:scale-95"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
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
                    onClick={() => setMobileMenuOpen(false)}
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
                onClick={() => {
                  localStorage.removeItem("mockUser");
                  navigate("/");
                }}
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
      <div className="flex-1 lg:ml-64">
        {/* Desktop Header */}
        <header className="hidden lg:flex sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50 items-center justify-between px-6 lg:px-8 py-3 lg:py-4 shadow-sm">
          <h1 className="text-lg lg:text-xl font-black text-foreground">
            {navItems.find(item => item.path === location.pathname)?.label || "Dashboard"}
          </h1>
          <div className="flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-xl border-2 border-primary/30 bg-gradient-primary/10">
            <Zap className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm font-bold text-foreground">{credits}</span>
            <span className="text-sm text-muted-foreground">credits</span>
          </div>
        </header>

        {/* Page Content - Mobile Responsive */}
        <main className="p-3 sm:p-4 lg:p-6 xl:p-8 pt-16 sm:pt-20 lg:pt-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
