import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import HowItWorksPage from "./pages/HowItWorksPage";
import NotFound from "./pages/NotFound";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import CompleteRegistrationPage from "./pages/auth/CompleteRegistrationPage";

// Dashboard pages
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CreatePage from "./pages/dashboard/CreatePage";
import CatalogPage from "./pages/dashboard/CatalogPage";
import GuidelinesPage from "./pages/dashboard/GuidelinesPage";
import CreditsPage from "./pages/dashboard/CreditsPage";
import GalleryPage from "./pages/dashboard/GalleryPage";
import SettingsPage from "./pages/dashboard/SettingsPage";

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
          
          {/* Auth Routes */}
          <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/complete-registration" element={<CompleteRegistrationPage />} />
          
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          
          {/* Redirect /generate to dashboard */}
          <Route path="/generate" element={<Navigate to="/dashboard/create" replace />} />
          
          {/* Dashboard Routes - Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardHome />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/create"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreatePage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/catalog"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CatalogPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/gallery"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <GalleryPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/guidelines"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <GuidelinesPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/credits"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreditsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
