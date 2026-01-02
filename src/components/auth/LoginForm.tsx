import React, { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onSignUp,
  loading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = "Email or mobile number is required";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
          Email or Mobile Number
          <span className="text-destructive">*</span>
        </label>
        <AuthInput
          icon="email"
          type="text"
          placeholder="you@example.com or 9876543210"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
          Password
          <span className="text-destructive">*</span>
        </label>
        <AuthInput
          icon="lock"
          showPasswordToggle
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
      </div>

      <div className="flex items-center justify-end -mt-1">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-xs text-primary hover:text-primary/80 font-semibold transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <AuthButton type="submit" loading={loading}>
        Sign In
      </AuthButton>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground pt-1">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSignUp}
          className="text-primary hover:text-primary/80 font-bold transition-colors"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
