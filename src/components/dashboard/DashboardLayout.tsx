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
  { id: "create", label: "Generate", icon: Sparkles, path: "/dashboard/create" },
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
    <div className="min-h-screen bg-slate-50 flex w-full">
      {/* Desktop Sidebar - Always Visible */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-52 flex-col bg-teal-600">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-teal-500/50">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">PhotoAI</span>
          <span className="text-white/60 ml-auto">«</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm",
                  isActive 
                    ? "bg-teal-500 text-white" 
                    : "text-teal-100 hover:bg-teal-500/50"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Credits Widget */}
        <div className="p-3">
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-600">Credits</span>
              <Zap className="w-3.5 h-3.5 text-teal-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{credits}</div>
            <span className="text-xs text-slate-400">remaining</span>
            <div className="mt-2 pt-2 border-t border-slate-100">
              <span className="text-xs text-teal-600 font-medium">Ready to generate</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-3 border-t border-teal-500/50">
          <button className="flex items-center gap-3 px-3 py-2 text-teal-100 hover:text-white transition-colors text-sm w-full">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-teal-600">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">PhotoAI</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20">
              <Zap className="w-3.5 h-3.5 text-white" />
              <span className="text-sm font-semibold text-white">{credits}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-white/20"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-teal-600 border-t border-teal-500/50 animate-fade-in">
            <nav className="p-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm",
                      isActive 
                        ? "bg-teal-500 text-white" 
                        : "text-teal-100 hover:bg-teal-500/50"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              <button className="flex items-center gap-3 px-3 py-2.5 text-teal-100 hover:text-white transition-colors text-sm w-full mt-4">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 lg:ml-52">
        {/* Desktop Header */}
        <header className="hidden lg:flex sticky top-0 z-30 bg-white border-b border-slate-200 items-center justify-between px-6 py-3">
          <h1 className="text-base font-medium text-teal-600">
            {navItems.find(item => item.path === location.pathname)?.label || "Dashboard"}
          </h1>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50">
            <Zap className="w-3.5 h-3.5 text-teal-500" />
            <span className="text-sm font-medium text-slate-600">{credits}</span>
            <span className="text-sm text-slate-400">credits</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 pt-20 lg:pt-6 min-h-screen bg-gradient-to-br from-teal-50/50 to-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
