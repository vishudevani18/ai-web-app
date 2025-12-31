import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import HowItWorksPage from "./pages/HowItWorksPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

// Dashboard pages
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CreatePage from "./pages/dashboard/CreatePage";
import CatalogPage from "./pages/dashboard/CatalogPage";
import GuidelinesPage from "./pages/dashboard/GuidelinesPage";
import CreditsPage from "./pages/dashboard/CreditsPage";
import GalleryPage from "./pages/dashboard/GalleryPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Redirect /generate to dashboard */}
          <Route path="/generate" element={<Navigate to="/dashboard/create" replace />} />
          
{/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
          <Route path="/dashboard/create" element={<DashboardLayout><CreatePage /></DashboardLayout>} />
          <Route path="/dashboard/catalog" element={<DashboardLayout><CatalogPage /></DashboardLayout>} />
          <Route path="/dashboard/gallery" element={<DashboardLayout><GalleryPage /></DashboardLayout>} />
          <Route path="/dashboard/guidelines" element={<DashboardLayout><GuidelinesPage /></DashboardLayout>} />
          <Route path="/dashboard/credits" element={<DashboardLayout><CreditsPage /></DashboardLayout>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
