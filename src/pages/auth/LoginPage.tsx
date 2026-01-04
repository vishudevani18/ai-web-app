import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: loginWithAuth } = useAuth();

  const handleLogin = async (emailOrPhone: string, password: string) => {
    setLoading(true);
    try {
      await loginWithAuth(emailOrPhone, password);
      // Toast is handled by interceptor
      navigate("/dashboard");
    } catch (error) {
      // Error toast is handled by interceptor
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      <LoginForm
        onSubmit={handleLogin}
        onForgotPassword={() => navigate("/auth/forgot-password")}
        onSignUp={() => navigate("/auth/signup")}
        loading={loading}
      />
    </AuthLayout>
  );
};

export default LoginPage;

