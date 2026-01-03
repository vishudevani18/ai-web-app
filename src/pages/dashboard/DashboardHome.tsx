import { Card, CardContent } from "@/components/ui/card";
import { 
  CreditCard, 
  Coins, 
  Zap, 
  TrendingUp, 
  Receipt,
  ImageIcon,
  Sparkles,
  Loader2,
  AlertCircle,
  Layers
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSystemData } from "@/lib/api";
import { Button } from "@/components/ui/button";

// Helper function to format key names (e.g., "aiFaces" -> "AI Faces")
const formatKeyName = (key: string): string => {
  // Convert camelCase to Title Case
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .trim();
};

const DashboardHome = () => {
  // Fetch system data from API
  const { data: systemData, isLoading: isLoadingSystemData, error: systemDataError } = useQuery({
    queryKey: ['system-data'],
    queryFn: fetchSystemData,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  // Static generation statistics (will be replaced with API call later)
  const generationStats = {
    singleGenerationCount: 0,
    singleGenerationImages: 0,
    catalogGenerationCount: 0,
    catalogGenerationImages: 0,
    totalImages: 0
  };

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

  // Convert system data object to array format for display
  const systemDataArray = systemData 
    ? Object.entries(systemData).map(([key, value]) => ({
        label: formatKeyName(key),
        value: value.toString()
      }))
    : [];

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
        {/* Generation Statistics Section - Mobile Responsive */}
        <Card className="bg-card border-2 border-border/50 shadow-card">
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-black text-foreground mb-3 sm:mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              Generation Statistics
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {/* Single Generation Stats */}
              <div className="p-3 sm:p-4 bg-gradient-primary/5 border-2 border-primary/20 rounded-lg sm:rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 bg-gradient-primary rounded-lg">
                      <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-foreground">Single Generation</span>
                  </div>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Generations:</span>
                    <span className="text-xs sm:text-sm font-black text-primary">{generationStats.singleGenerationCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Images Generated:</span>
                    <span className="text-xs sm:text-sm font-black text-primary">{generationStats.singleGenerationImages}</span>
                  </div>
                </div>
              </div>

              {/* Catalog Generation Stats */}
              <div className="p-3 sm:p-4 bg-gradient-primary/5 border-2 border-primary/20 rounded-lg sm:rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 bg-gradient-primary rounded-lg">
                      <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-foreground">Catalog Generation</span>
                  </div>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Generations:</span>
                    <span className="text-xs sm:text-sm font-black text-primary">{generationStats.catalogGenerationCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Images Generated:</span>
                    <span className="text-xs sm:text-sm font-black text-primary">{generationStats.catalogGenerationImages}</span>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="pt-2 border-t border-border/50">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-bold text-foreground">Total Images:</span>
                  <span className="text-sm sm:text-base font-black text-primary">{generationStats.totalImages}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Data Section - Mobile Responsive */}
        <Card className="bg-card border-2 border-border/50 shadow-card">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-black text-foreground mb-3 sm:mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              System Data
            </h3>
            {isLoadingSystemData ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">Loading system data...</span>
              </div>
            ) : systemDataError ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <AlertCircle className="w-6 h-6 text-destructive mb-2" />
                <p className="text-sm text-muted-foreground mb-4">
                  Failed to load system data. Please try again.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  Retry
                </Button>
              </div>
            ) : systemDataArray.length > 0 ? (
              <div className="space-y-2 sm:space-y-3">
                {systemDataArray.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2.5 sm:p-3 bg-primary/5 rounded-lg sm:rounded-xl">
                    <span className="text-xs sm:text-sm font-semibold text-foreground">{item.label}:</span>
                    <span className="text-xs sm:text-sm font-black text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No system data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
