import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "@/lib/auth";
import { getSessionToken } from "@/utils/storage";
import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validate session token exists
  useEffect(() => {
    const sessionToken = getSessionToken();
    if (!sessionToken) {
      // No session token means OTP wasn't verified, redirect to forgot password
      navigate("/auth/forgot-password", { replace: true });
    }
    // In a real app, you might want to validate the token with the backend
    // For now, we just check if it exists
  }, [navigate]);

  const handleResetPassword = async (newPassword: string, confirmPassword: string) => {
    setLoading(true);
    try {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        navigate("/auth/forgot-password", { replace: true });
        return;
      }

      await resetPassword(newPassword, confirmPassword);
      // Toast is handled by interceptor
      navigate("/auth/login");
    } catch (error) {
      // Error toast is handled by interceptor
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Reset your password to secure your account"
    >
      <ResetPasswordForm
        onSubmit={handleResetPassword}
        onBackToLogin={() => navigate("/auth/login")}
        loading={loading}
      />
    </AuthLayout>
  );
};

export default ResetPasswordPage;

