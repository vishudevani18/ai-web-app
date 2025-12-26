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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Email or Mobile Number
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

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Password</label>
        <AuthInput
          icon="lock"
          showPasswordToggle
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
      </div>

      <AuthButton type="submit" loading={loading}>
        Log In
      </AuthButton>

      <button
        type="button"
        onClick={onForgotPassword}
        className="w-full text-center text-primary hover:underline font-medium text-sm"
      >
        Forgot your password?
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSignUp}
          className="text-primary hover:underline font-medium"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
