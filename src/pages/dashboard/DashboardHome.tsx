import { Card, CardContent } from "@/components/ui/card";
import { 
  CreditCard, 
  Coins, 
  Zap, 
  TrendingUp, 
  Receipt,
  ImageIcon,
  Sparkles
} from "lucide-react";

const DashboardHome = () => {
  const stats = [
    {
      label: "Purchased Credits",
      value: "0",
      subtext: "+30 FREE BONUS CREDITS",
      icon: CreditCard,
      iconBg: "bg-teal-500"
    },
    {
      label: "Total Credits",
      value: "30",
      subtext: "All Credits Combined",
      icon: Coins,
      iconBg: "bg-teal-500"
    },
    {
      label: "Remaining Credits",
      value: "30",
      subtext: "Credits Left",
      icon: Zap,
      iconBg: "bg-teal-500"
    },
    {
      label: "Used Credits",
      value: "0",
      subtext: "Used Till Now",
      icon: TrendingUp,
      iconBg: "bg-teal-500"
    },
    {
      label: "Total Paid Amount",
      value: "₹0",
      subtext: "Premium User",
      icon: Receipt,
      iconBg: "bg-teal-500"
    },
    {
      label: "Total Generated Images",
      value: "0",
      subtext: "1 Image = 5 Credits",
      icon: ImageIcon,
      iconBg: "bg-teal-500"
    },
  ];

  const systemData = [
    { label: "AI Faces", value: "10" },
    { label: "Backgrounds", value: "20" },
    { label: "Different Themes", value: "4" },
    { label: "Total Different Poses", value: "50" },
    { label: "Categories", value: "3" },
    { label: "Industries", value: "1" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in">
      {/* Welcome Section - Mobile Responsive */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-2 sm:mb-3">
          Welcome Back! 👋
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
          Create stunning AI-powered product showcase models in seconds
        </p>
      </div>

      {/* Stats Grid - Mobile Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="bg-card border-2 border-border/50 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-[1.02] group touch-manipulation active:scale-[0.98]"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-gradient-primary rounded-lg sm:rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-1.5 sm:mb-2">{stat.label}</p>
              <p className="text-2xl sm:text-3xl font-black text-foreground mb-1.5 sm:mb-2">{stat.value}</p>
              <p className="text-xs text-primary font-bold">{stat.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions - Mobile Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Categories Section - Mobile Responsive */}
        <Card className="bg-card border-2 border-border/50 shadow-card">
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-black text-foreground mb-3 sm:mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              Categories
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">No generations yet. Start creating your first image!</p>
          </CardContent>
        </Card>

        {/* System Data Section - Mobile Responsive */}
        <Card className="bg-card border-2 border-border/50 shadow-card">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-black text-foreground mb-3 sm:mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              System Data
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {systemData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2.5 sm:p-3 bg-primary/5 rounded-lg sm:rounded-xl">
                  <span className="text-xs sm:text-sm font-semibold text-foreground">{item.label}:</span>
                  <span className="text-xs sm:text-sm font-black text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
