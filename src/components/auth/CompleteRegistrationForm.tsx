import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CompleteRegistrationFormProps {
  onSubmit: (data: any) => void;
  onBackToLogin: () => void;
  loading?: boolean;
  phoneNumber?: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  address?: {
    addressType?: string;
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
  };
  business?: {
    businessName?: string;
    businessType?: string;
    businessSegment?: string;
    businessDescription?: string;
    gstNumber?: string;
    websiteUrl?: string;
    businessLogo?: string;
  };
}

const STEPS = [
  { id: "ACCOUNT", label: "Account", description: "Account credentials" },
  { id: "PROFILE", label: "Profile", description: "Personal information" },
  { id: "ADDRESS", label: "Address", description: "Primary address (optional)" },
  { id: "BUSINESS", label: "Business", description: "Business details (optional)" },
];

const BUSINESS_TYPES = [
  { label: "Manufacturer", value: "manufacturer" },
  { label: "Reseller", value: "reseller" },
  { label: "Wholesaler", value: "wholesaler" },
  { label: "Other", value: "other" },
];

const BUSINESS_SEGMENTS = [
  { label: "Clothing", value: "clothing" },
  { label: "Accessories", value: "accessories" },
  { label: "Furniture", value: "furniture" },
  { label: "Electronics", value: "electronics" },
  { label: "Other", value: "other" },
];

const CompleteRegistrationForm = ({
  onSubmit,
  onBackToLogin,
  loading = false,
  phoneNumber = "",
}: CompleteRegistrationFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<RegistrationData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: {
      addressType: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
    business: {
      businessName: "",
      businessType: "",
      businessSegment: "",
      businessDescription: "",
      gstNumber: "",
      websiteUrl: "",
      businessLogo: "",
    },
  });

  const updateField = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof RegistrationData] as Record<string, string>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      // Account validation
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/.test(formData.password)) {
        newErrors.password = "Must include uppercase, lowercase, number, and special character";
      }
      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (step === 1) {
      // Profile validation
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      // lastName is optional, no validation needed
    }

    // Address and Business steps are optional, no validation required

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper to check if address has any filled fields
  const hasAddressData = (): boolean => {
    const addr = formData.address;
    return !!(
      addr.addressType?.trim() ||
      addr.street?.trim() ||
      addr.city?.trim() ||
      addr.state?.trim() ||
      addr.zipcode?.trim() ||
      addr.country?.trim()
    );
  };

  // Helper to check if business has any filled fields
  const hasBusinessData = (): boolean => {
    const bus = formData.business;
    return !!(
      bus.businessName?.trim() ||
      bus.businessType ||
      bus.businessSegment ||
      bus.businessDescription?.trim() ||
      bus.gstNumber?.trim() ||
      bus.websiteUrl?.trim() ||
      bus.businessLogo?.trim()
    );
  };

  // Helper to validate URL format
  const isValidUrl = (url: string): boolean => {
    if (!url.trim()) return true; // Empty is valid (optional field)
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Build clean registration data (only include address/business if they have data)
  const buildRegistrationData = (): Omit<RegistrationData, 'address' | 'business'> & {
    address?: Partial<RegistrationData['address']>;
    business?: Partial<RegistrationData['business']>;
  } => {
    const data: any = {
      email: formData.email.trim(),
      password: formData.password,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim() || undefined,
    };

    // Only include address if it has at least one filled field
    if (hasAddressData()) {
      const address: any = {};
      if (formData.address.addressType?.trim()) address.addressType = formData.address.addressType.trim();
      if (formData.address.street?.trim()) address.street = formData.address.street.trim();
      if (formData.address.city?.trim()) address.city = formData.address.city.trim();
      if (formData.address.state?.trim()) address.state = formData.address.state.trim();
      if (formData.address.zipcode?.trim()) address.zipcode = formData.address.zipcode.trim();
      if (formData.address.country?.trim()) address.country = formData.address.country.trim();
      
      // Only add address if it has at least one field
      if (Object.keys(address).length > 0) {
        data.address = address;
      }
    }

    // Only include business if it has at least one filled field
    if (hasBusinessData()) {
      const business: any = {};
      if (formData.business.businessName?.trim()) business.businessName = formData.business.businessName.trim();
      if (formData.business.businessType) business.businessType = formData.business.businessType;
      if (formData.business.businessSegment) business.businessSegment = formData.business.businessSegment;
      if (formData.business.businessDescription?.trim()) business.businessDescription = formData.business.businessDescription.trim();
      if (formData.business.gstNumber?.trim()) business.gstNumber = formData.business.gstNumber.trim();
      if (formData.business.websiteUrl?.trim()) {
        if (!isValidUrl(formData.business.websiteUrl)) {
          throw new Error("Website URL must be a valid URL format");
        }
        business.websiteUrl = formData.business.websiteUrl.trim();
      }
      if (formData.business.businessLogo?.trim()) {
        if (!isValidUrl(formData.business.businessLogo)) {
          throw new Error("Business Logo URL must be a valid URL format");
        }
        business.businessLogo = formData.business.businessLogo.trim();
      }
      
      // Only add business if it has at least one field
      if (Object.keys(business).length > 0) {
        data.business = business;
      }
    }

    return data;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        try {
          const cleanData = buildRegistrationData();
          onSubmit(cleanData);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Invalid form data";
          setErrors({ submit: errorMessage });
          toast.error(errorMessage);
        }
      }
    }
  };

  const isStepValid = () => {
    if (currentStep === 0) {
      // Account step
      return (
        formData.email.trim().length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
        formData.password.length >= 8 &&
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/.test(formData.password) &&
        confirmPassword === formData.password
      );
    }
    if (currentStep === 1) {
      // Profile step - lastName is optional
      return formData.firstName.trim().length > 0;
    }
    // Address and Business steps are optional, so always valid
    return true;
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-3 sm:mb-4 md:mb-6">
      {STEPS.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1 max-w-[50px] sm:max-w-[60px] md:max-w-none">
          <div className="flex flex-col items-center flex-1">
            <div
              className={cn(
                "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-medium transition-colors",
                index < currentStep
                  ? "bg-primary text-primary-foreground"
                  : index === currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index < currentStep ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" /> : index + 1}
            </div>
            <span className={cn(
              "text-[9px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 text-center hidden md:block truncate w-full",
              index === currentStep ? "text-primary font-medium" : "text-muted-foreground"
            )}>
              {step.label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={cn(
                "w-1.5 sm:w-2 md:w-6 h-0.5 mx-0.5 sm:mx-1 flex-1 hidden md:block",
                index < currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderAccountStep = () => (
    <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
        <Label htmlFor="email" className="text-xs sm:text-sm">Email Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={cn("h-9 sm:h-10 text-sm", errors.email ? "border-destructive" : "")}
          maxLength={150}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
        <Label htmlFor="password" className="text-xs sm:text-sm">Password *</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            className={cn("h-9 sm:h-10 text-sm pr-10", errors.password ? "border-destructive" : "")}
            maxLength={18}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password}</p>
        )}
        <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">
          8-18 chars: uppercase, lowercase, number, special char
        </p>
      </div>

      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
        <Label htmlFor="confirmPassword" className="text-xs sm:text-sm">Confirm Password *</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.confirmPassword;
                  return newErrors;
                });
              }
            }}
            className={cn("h-9 sm:h-10 text-sm pr-10", errors.confirmPassword ? "border-destructive" : "")}
            maxLength={18}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );

  const renderProfileStep = () => (
    <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
        <Label htmlFor="firstName" className="text-xs sm:text-sm">First Name *</Label>
        <Input
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
          className={cn("h-9 sm:h-10 text-sm", errors.firstName ? "border-destructive" : "")}
          maxLength={50}
        />
        {errors.firstName && (
          <p className="text-sm text-destructive">{errors.firstName}</p>
        )}
      </div>

      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
        <Label htmlFor="lastName" className="text-xs sm:text-sm">Last Name</Label>
        <Input
          id="lastName"
          type="text"
          placeholder="Enter your last name (optional)"
          value={formData.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
          className="h-9 sm:h-10 text-sm"
          maxLength={50}
        />
      </div>
    </div>
  );

  const renderAddressStep = () => (
    <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
      <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1.5 sm:mb-2 md:mb-3">
        This step is optional. You can skip it and complete later.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
          <Label htmlFor="addressType" className="text-xs sm:text-sm">Address Type</Label>
          <Input
            id="addressType"
            type="text"
            placeholder="Home / Office"
            value={formData.address.addressType}
            onChange={(e) => updateField("address.addressType", e.target.value)}
            className="h-9 sm:h-10 text-sm"
            maxLength={50}
          />
        </div>

        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
          <Label htmlFor="zipcode" className="text-xs sm:text-sm">PIN Code</Label>
          <Input
            id="zipcode"
            type="text"
            placeholder="400001"
            value={formData.address.zipcode}
            onChange={(e) => updateField("address.zipcode", e.target.value)}
            className="h-9 sm:h-10 text-sm"
            maxLength={20}
          />
        </div>
      </div>

      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
        <Label htmlFor="street" className="text-xs sm:text-sm">Street / Area</Label>
        <Input
          id="street"
          type="text"
          placeholder="Enter street address"
          value={formData.address.street}
          onChange={(e) => updateField("address.street", e.target.value)}
          className="h-9 sm:h-10 text-sm"
          maxLength={255}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
          <Label htmlFor="city" className="text-xs sm:text-sm">City</Label>
          <Input
            id="city"
            type="text"
            placeholder="Enter city"
            value={formData.address.city}
            onChange={(e) => updateField("address.city", e.target.value)}
            className="h-9 sm:h-10 text-sm"
            maxLength={100}
          />
        </div>

        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
          <Label htmlFor="state" className="text-xs sm:text-sm">State</Label>
          <Input
            id="state"
            type="text"
            placeholder="Enter state"
            value={formData.address.state}
            onChange={(e) => updateField("address.state", e.target.value)}
            className="h-9 sm:h-10 text-sm"
            maxLength={100}
          />
        </div>
      </div>

      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
        <Label htmlFor="country" className="text-xs sm:text-sm">Country</Label>
        <Input
          id="country"
          type="text"
          placeholder="Enter country"
          value={formData.address.country}
          onChange={(e) => updateField("address.country", e.target.value)}
          className="h-9 sm:h-10 text-sm"
          maxLength={100}
        />
      </div>
    </div>
  );

  const renderBusinessStep = () => (
    <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
      <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1.5 sm:mb-2 md:mb-3">
        This step is optional. You can skip it and complete later.
      </p>

      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
        <Label htmlFor="businessName" className="text-xs sm:text-sm">Business Name</Label>
        <Input
          id="businessName"
          type="text"
          placeholder="Enter business name"
          value={formData.business.businessName}
          onChange={(e) => updateField("business.businessName", e.target.value)}
          className="h-9 sm:h-10 text-sm"
          maxLength={150}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
          <Label htmlFor="businessType" className="text-xs sm:text-sm">Business Type</Label>
          <Select
            value={formData.business.businessType}
            onValueChange={(value) => updateField("business.businessType", value)}
          >
            <SelectTrigger className="h-9 sm:h-10 text-sm">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-background border">
              {BUSINESS_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
          <Label htmlFor="businessSegment" className="text-xs sm:text-sm">Business Segment</Label>
          <Select
            value={formData.business.businessSegment}
            onValueChange={(value) => updateField("business.businessSegment", value)}
          >
            <SelectTrigger className="h-9 sm:h-10 text-sm">
              <SelectValue placeholder="Select segment" />
            </SelectTrigger>
            <SelectContent className="bg-background border">
              {BUSINESS_SEGMENTS.map((segment) => (
                <SelectItem key={segment.value} value={segment.value}>
                  {segment.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
        <Label htmlFor="businessDescription" className="text-xs sm:text-sm">Business Description</Label>
        <Textarea
          id="businessDescription"
          placeholder="Describe your business..."
          value={formData.business.businessDescription}
          onChange={(e) => updateField("business.businessDescription", e.target.value)}
          className="min-h-[60px] sm:min-h-[80px] text-sm"
          rows={2}
        />
      </div>

      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
        <Label htmlFor="gstNumber" className="text-xs sm:text-sm">GST Number</Label>
        <Input
          id="gstNumber"
          type="text"
          placeholder="Enter GST number (e.g., 27ABCDE1234F1Z5)"
          value={formData.business.gstNumber}
          onChange={(e) => updateField("business.gstNumber", e.target.value)}
          className="h-9 sm:h-10 text-sm"
          maxLength={20}
        />
      </div>

      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
        <Label htmlFor="websiteUrl" className="text-xs sm:text-sm">Website URL</Label>
        <Input
          id="websiteUrl"
          type="url"
          placeholder="https://www.yourwebsite.com"
          value={formData.business.websiteUrl}
          onChange={(e) => updateField("business.websiteUrl", e.target.value)}
          className="h-9 sm:h-10 text-sm"
        />
      </div>

      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
        <Label htmlFor="businessLogo" className="text-xs sm:text-sm">Business Logo URL</Label>
        <Input
          id="businessLogo"
          type="url"
          placeholder="https://www.yourwebsite.com/logo.png"
          value={formData.business.businessLogo}
          onChange={(e) => updateField("business.businessLogo", e.target.value)}
        />
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderAccountStep();
      case 1:
        return renderProfileStep();
      case 2:
        return renderAddressStep();
      case 3:
        return renderBusinessStep();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {renderStepIndicator()}

      <div className="text-center mb-3 sm:mb-4 md:mb-5">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground">
          {STEPS[currentStep].label}
        </h3>
        <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5">
          {STEPS[currentStep].description}
        </p>
      </div>

      <div className="max-h-[calc(95vh-200px)] sm:max-h-[calc(95vh-250px)] md:max-h-[calc(95vh-300px)] lg:max-h-none overflow-y-auto lg:overflow-visible pr-0.5 -mr-0.5">
        {renderCurrentStep()}
      </div>

      <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-3 md:pt-4 border-t border-border/50 mt-2 sm:mt-3 md:mt-4">
        {currentStep > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex-1 text-sm sm:text-base py-2 sm:py-2.5"
            disabled={loading}
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
            Back
          </Button>
        )}

        <Button
          type="button"
          onClick={handleNext}
          className="flex-1 text-sm sm:text-base py-2 sm:py-2.5"
          disabled={!isStepValid() || loading}
        >
          {loading ? (
            "Processing..."
          ) : currentStep === STEPS.length - 1 ? (
            <>
              Complete
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
            </>
          ) : (
            <>
              {currentStep >= 2 ? "Skip" : "Continue"}
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
            </>
          )}
        </Button>
      </div>

      <div className="text-center pt-1 sm:pt-2">
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-xs sm:text-sm text-primary hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default CompleteRegistrationForm;
