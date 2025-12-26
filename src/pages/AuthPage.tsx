import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthLogo from "@/components/auth/AuthLogo";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import CompleteRegistrationForm, { RegistrationData } from "@/components/auth/CompleteRegistrationForm";
import OTPVerificationForm from "@/components/auth/OTPVerificationForm";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

type AuthView = 
  | "login" 
  | "signup" 
  | "forgot-password" 
  | "reset-password"
  | "complete-registration";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? "signup" : "login";
  
  const [view, setView] = useState<AuthView>(initialMode);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpContext, setOtpContext] = useState<"signup" | "forgot-password">("signup");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock login - accepts any credentials
  const handleLogin = (email: string, password: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      // Store mock user data
      localStorage.setItem("mockUser", JSON.stringify({ email, name: "Demo User" }));
      navigate("/dashboard");
    }, 1000);
  };

  // Mock signup - send OTP
  const handleSignUpSendOTP = (phone: string) => {
    setLoading(true);
    setPhoneNumber(phone);
    setTimeout(() => {
      setLoading(false);
      setOtpContext("signup");
      setShowOTPModal(true);
      toast({
        title: "OTP Sent!",
        description: `OTP sent to +91 ${phone} (Mock: Enter any 6 digits)`,
      });
    }, 1000);
  };

  // Mock forgot password - send OTP
  const handleForgotPasswordSendOTP = (phone: string) => {
    setLoading(true);
    setPhoneNumber(phone);
    setTimeout(() => {
      setLoading(false);
      setOtpContext("forgot-password");
      setShowOTPModal(true);
      toast({
        title: "OTP Sent!",
        description: `OTP sent to +91 ${phone} (Mock: Enter any 6 digits)`,
      });
    }, 1000);
  };

  // Mock OTP verification
  const handleVerifyOTP = (otp: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowOTPModal(false);
      toast({
        title: "OTP Verified!",
        description: "Your phone number has been verified.",
      });
      
      if (otpContext === "signup") {
        setView("complete-registration");
      } else {
        setView("reset-password");
      }
    }, 1000);
  };

  // Mock resend OTP
  const handleResendOTP = () => {
    toast({
      title: "OTP Resent!",
      description: `New OTP sent to +91 ${phoneNumber} (Mock: Enter any 6 digits)`,
    });
  };

  // Mock complete registration
  const handleCompleteRegistration = (data: RegistrationData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Account Created!",
        description: "Your account has been successfully created.",
      });
      // Store mock user data
      localStorage.setItem("mockUser", JSON.stringify({ 
        phone: phoneNumber, 
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        business: data.business
      }));
      navigate("/dashboard");
    }, 1000);
  };

  // Mock reset password
  const handleResetPassword = (password: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Password Reset!",
        description: "Your password has been successfully reset.",
      });
      setView("login");
    }, 1000);
  };

  const getTitle = () => {
    switch (view) {
      case "login":
        return "Welcome Back";
      case "signup":
        return "Create Account";
      case "forgot-password":
        return "Reset Password";
      case "reset-password":
        return "Reset Password";
      case "complete-registration":
        return "Complete Registration";
      default:
        return "";
    }
  };

  const getSubtitle = () => {
    switch (view) {
      case "login":
        return "Log in to transform your products";
      case "signup":
        return "Join PhotoAI and start creating stunning model photos";
      case "forgot-password":
        return "Reset your password to secure your account";
      case "reset-password":
        return "Reset your password to secure your account";
      case "complete-registration":
        return "Set up your account details";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 via-background to-primary/10 p-4">
      <div className="w-full max-w-md">
        {/* Auth Card */}
        <div className="bg-card border border-border rounded-2xl shadow-card p-8 relative">
          {/* Logo */}
          <AuthLogo />
          
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">
              {getTitle()}
            </h1>
            <p className="text-muted-foreground text-sm">
              {getSubtitle()}
            </p>
          </div>

          {/* Forms */}
          {view === "login" && (
            <LoginForm
              onSubmit={handleLogin}
              onForgotPassword={() => setView("forgot-password")}
              onSignUp={() => setView("signup")}
              loading={loading}
            />
          )}

          {view === "signup" && (
            <SignUpForm
              onSubmit={handleSignUpSendOTP}
              onLogin={() => setView("login")}
              loading={loading}
            />
          )}

          {view === "forgot-password" && (
            <ForgotPasswordForm
              onSubmit={handleForgotPasswordSendOTP}
              onBackToLogin={() => setView("login")}
              loading={loading}
            />
          )}

          {view === "reset-password" && (
            <ResetPasswordForm
              onSubmit={handleResetPassword}
              onBackToLogin={() => setView("login")}
              loading={loading}
            />
          )}

          {view === "complete-registration" && (
            <CompleteRegistrationForm
              onSubmit={handleCompleteRegistration}
              onBackToLogin={() => setView("login")}
              loading={loading}
              phoneNumber={phoneNumber}
            />
          )}
        </div>

        {/* OTP Modal */}
        <Dialog open={showOTPModal} onOpenChange={setShowOTPModal}>
          <DialogContent className="sm:max-w-md p-8 relative">
            <AuthLogo />
            <div className="text-center mb-2">
              <h2 className="text-xl font-bold text-primary">
                {otpContext === "signup" ? "Verify Phone" : "Reset Password"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Reset your password to secure your account
              </p>
            </div>
            <OTPVerificationForm
              phone={phoneNumber}
              onVerify={handleVerifyOTP}
              onResend={handleResendOTP}
              onClose={() => setShowOTPModal(false)}
              onBackToLogin={() => {
                setShowOTPModal(false);
                setView("login");
              }}
              loading={loading}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AuthPage;
