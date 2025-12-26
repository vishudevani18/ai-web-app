import { Card, CardContent } from "@/components/ui/card";
import { 
  CreditCard, 
  Coins, 
  Zap, 
  TrendingUp, 
  Receipt,
  ImageIcon
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
      subtext: "1 Image = 10 Credits",
      icon: ImageIcon,
      iconBg: "bg-teal-500"
    },
  ];

  const systemData = {
    outfitStyles: 4,
    cameraAngles: 11,
    availableCategories: 3
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome Back, User 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Create stunning AI-powered product showcase models
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-5">
              <div className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
              <p className="text-xs text-teal-600 mt-1">{stat.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Categories Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Categories</h2>
        <p className="text-slate-500 text-sm">No generations yet.</p>
      </div>

      {/* System Data Section */}
      <Card className="bg-white border border-slate-200 shadow-sm">
        <CardContent className="p-5">
          <h3 className="font-semibold text-slate-800 mb-4">System Data</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Outfit Styles:</span>
              <span className="text-slate-800 font-medium">{systemData.outfitStyles}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Camera Angles:</span>
              <span className="text-slate-800 font-medium">{systemData.cameraAngles}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Available Categories:</span>
              <span className="text-slate-800 font-medium">{systemData.availableCategories}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
