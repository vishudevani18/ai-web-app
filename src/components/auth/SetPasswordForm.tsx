import React, { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

interface SetPasswordFormProps {
  onSubmit: (name: string, password: string) => void;
  onBackToLogin: () => void;
  loading?: boolean;
}

const SetPasswordForm: React.FC<SetPasswordFormProps> = ({
  onSubmit,
  onBackToLogin,
  loading,
}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; password?: string; confirmPassword?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; password?: string; confirmPassword?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(name, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Full Name <span className="text-destructive">*</span>
        </label>
        <AuthInput
          icon="user"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Password <span className="text-destructive">*</span>
        </label>
        <AuthInput
          icon="lock"
          showPasswordToggle
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Confirm Password <span className="text-destructive">*</span>
        </label>
        <AuthInput
          icon="lock"
          showPasswordToggle
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
      </div>

      <AuthButton type="submit" loading={loading}>
        Create Account
      </AuthButton>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-primary hover:underline font-medium"
        >
          Log In
        </button>
      </p>
    </form>
  );
};

export default SetPasswordForm;
