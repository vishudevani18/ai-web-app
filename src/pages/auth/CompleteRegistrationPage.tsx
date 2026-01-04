import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { completeRegistration } from "@/lib/auth";
import { getSessionToken } from "@/utils/storage";
import AuthLayout from "@/components/auth/AuthLayout";
import CompleteRegistrationForm from "@/components/auth/CompleteRegistrationForm";

const CompleteRegistrationPage = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  // Validate session token exists
  useEffect(() => {
    const sessionToken = getSessionToken();
    if (!sessionToken) {
      // No session token means OTP wasn't verified, redirect to signup
      navigate("/auth/signup", { replace: true });
    }
    // In a real app, you might want to validate the token with the backend
    // For now, we just check if it exists
  }, [navigate]);

  const handleCompleteRegistration = async (data: any) => {
    setLoading(true);
    try {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        navigate("/auth/signup", { replace: true });
        return;
      }

      // Data is already cleaned and filtered in CompleteRegistrationForm
      // Only includes address/business if they have at least one filled field
      await completeRegistration(data);
      // Toast is handled by interceptor
      navigate("/dashboard");
    } catch (error) {
      // Error toast is handled by interceptor
      console.error("Complete registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Complete Registration"
      subtitle="Set up your account details"
      compact={true}
    >
      <CompleteRegistrationForm
        onSubmit={handleCompleteRegistration}
        onBackToLogin={() => navigate("/auth/login")}
        loading={loading}
        phoneNumber={phoneNumber}
      />
    </AuthLayout>
  );
};

export default CompleteRegistrationPage;

