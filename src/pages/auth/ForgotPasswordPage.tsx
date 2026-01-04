import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetOTP, verifyPasswordResetOTP, resendOTP } from "@/lib/auth";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthLogo from "@/components/auth/AuthLogo";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import OTPVerificationForm from "@/components/auth/OTPVerificationForm";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const navigate = useNavigate();

  const handleForgotPasswordSendOTP = async (phone: string) => {
    setLoading(true);
    setPhoneNumber(phone);
    try {
      await sendPasswordResetOTP(phone);
      // Toast is handled by interceptor
      setShowOTPModal(true);
    } catch (error) {
      // Error toast is handled by interceptor
      console.error("Send password reset OTP error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    setLoading(true);
    try {
      await verifyPasswordResetOTP(phoneNumber, otp);
      // Session token is stored by verifyPasswordResetOTP function
      // Toast is handled by interceptor
      setShowOTPModal(false);
      navigate("/auth/reset-password");
    } catch (error) {
      // Error toast is handled by interceptor
      console.error("Verify OTP error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await resendOTP(phoneNumber, "reset_password");
      // Toast is handled by interceptor
    } catch (error) {
      // Error toast is handled by interceptor
      console.error("Resend OTP error:", error);
    }
  };

  return (
    <>
      <AuthLayout
        title="Reset Password"
        subtitle="Reset your password to secure your account"
      >
        <ForgotPasswordForm
          onSubmit={handleForgotPasswordSendOTP}
          onBackToLogin={() => navigate("/auth/login")}
          loading={loading}
        />
      </AuthLayout>

      {/* OTP Modal */}
      <Dialog open={showOTPModal} onOpenChange={setShowOTPModal}>
        <DialogContent className="sm:max-w-md p-4 sm:p-6 md:p-8 bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl sm:rounded-3xl shadow-2xl w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-md max-h-[90vh] overflow-y-auto !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2">
          <div className="mb-3 sm:mb-4 md:mb-6">
            <AuthLogo />
          </div>
          <OTPVerificationForm
            phone={phoneNumber}
            onVerify={handleVerifyOTP}
            onResend={handleResendOTP}
            onClose={() => setShowOTPModal(false)}
            onBackToLogin={() => {
              setShowOTPModal(false);
              navigate("/auth/login");
            }}
            loading={loading}
            otpContext="forgot-password"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ForgotPasswordPage;

