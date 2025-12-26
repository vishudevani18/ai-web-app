import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Image, Sparkles, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Dashboard = () => {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: actionsRef, isVisible: actionsVisible } = useScrollAnimation();
  const { ref: recentRef, isVisible: recentVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Create stunning AI photoshoots in minutes
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-700 ${
            statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card className="border-border bg-card hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Photoshoots
              </CardTitle>
              <Camera className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">0</div>
              <p className="text-xs text-muted-foreground mt-1">
                Start your first photoshoot
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Images Generated
              </CardTitle>
              <Image className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">0</div>
              <p className="text-xs text-muted-foreground mt-1">
                Unlimited generation available
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Credits Saved
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">$0</div>
              <p className="text-xs text-muted-foreground mt-1">
                vs traditional photography
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                AI Models Used
              </CardTitle>
              <Sparkles className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">0</div>
              <p className="text-xs text-muted-foreground mt-1">
                Choose from 12+ models
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div
          ref={actionsRef}
          className={`mb-12 transition-all duration-700 delay-150 ${
            actionsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card hover:shadow-elegant transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Start New Photoshoot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Upload your product images and create stunning AI-powered photoshoots instantly
                </p>
                <Button className="w-full">
                  Create Photoshoot
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-elegant transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5 text-primary" />
                  Browse Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View and manage all your generated images in one place
                </p>
                <Button variant="outline" className="w-full">
                  View Gallery
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div
          ref={recentRef}
          className={`transition-all duration-700 delay-300 ${
            recentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
          <Card className="border-border bg-card">
            <CardContent className="py-12">
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No activity yet. Start your first photoshoot to see it here!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
