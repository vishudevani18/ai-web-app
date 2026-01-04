import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getProfile, updateProfile, changePassword, UpdateProfileData, ChangePasswordData, UserProfile } from "@/lib/auth";
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
import { Eye, EyeOff, Loader2, User, MapPin, Building, Lock, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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

type TabType = "profile" | "address" | "business" | "password";

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Store the original profile data to merge with updates
  const [originalProfile, setOriginalProfile] = useState<UserProfile | null>(null);

  // Profile fields
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Address fields
  const [addressType, setAddressType] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");

  // Business fields
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessSegment, setBusinessSegment] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [businessLogo, setBusinessLogo] = useState("");

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setFetching(true);
        const profile = await getProfile();
        
        // Store original profile for merging updates
        setOriginalProfile(profile);
        
        // Set profile fields
        setEmail(profile.email || "");
        setFirstName(profile.firstName || "");
        setLastName(profile.lastName || "");

        // Set address fields
        if (profile.address) {
          setAddressType(profile.address.addressType ?? "");
          setStreet(profile.address.street ?? "");
          setCity(profile.address.city ?? "");
          setState(profile.address.state ?? "");
          setZipcode(profile.address.zipcode ?? "");
          setCountry(profile.address.country ?? "");
        }

        // Set business fields
        if (profile.business) {
          setBusinessName(profile.business.businessName ?? "");
          setBusinessType(profile.business.businessType ?? "");
          setBusinessSegment(profile.business.businessSegment ?? "");
          setBusinessDescription(profile.business.businessDescription ?? "");
          setGstNumber(profile.business.gstNumber ?? "");
          setWebsiteUrl(profile.business.websiteUrl ?? "");
          setBusinessLogo(profile.business.businessLogo ?? "");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const validateProfile = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/.test(newPassword)) {
      newErrors.newPassword = "Must include uppercase, lowercase, number, and special character";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper to check if address has any filled fields
  const hasAddressData = (): boolean => {
    return !!(
      addressType.trim() ||
      street.trim() ||
      city.trim() ||
      state.trim() ||
      zipcode.trim() ||
      country.trim()
    );
  };

  // Helper to check if business has any filled fields
  const hasBusinessData = (): boolean => {
    return !!(
      businessName.trim() ||
      businessType ||
      businessSegment ||
      businessDescription.trim() ||
      gstNumber.trim() ||
      websiteUrl.trim() ||
      businessLogo.trim()
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

  // Helper function to build complete profile update object
  // Sends complete address/business objects with all form values
  // Backend will update whatever is sent, so we send all current form values
  const buildCompleteProfileData = (): UpdateProfileData => {
    const data: UpdateProfileData = {
      firstName: firstName.trim(),
      lastName: lastName.trim() || undefined,
    };

    // Build complete address object with all form values
    // If user updates only zipcode, we still send all other fields from the form
    if (hasAddressData() || originalProfile?.address) {
      const addressData: any = {};
      
      // Include all address fields from form (even if empty, to preserve existing values)
      // Use original value if form field is empty and original exists
      const originalAddress = originalProfile?.address || {};
      
      addressData.addressType = addressType.trim() || originalAddress.addressType || undefined;
      addressData.street = street.trim() || originalAddress.street || undefined;
      addressData.city = city.trim() || originalAddress.city || undefined;
      addressData.state = state.trim() || originalAddress.state || undefined;
      addressData.zipcode = zipcode.trim() || originalAddress.zipcode || undefined;
      addressData.country = country.trim() || originalAddress.country || undefined;

      // Remove undefined values
      Object.keys(addressData).forEach(key => {
        if (addressData[key] === undefined) {
          delete addressData[key];
        }
      });

      // Only add address if it has at least one field
      if (Object.keys(addressData).length > 0) {
        data.address = addressData;
      }
    }

    // Build complete business object with all form values
    // If user updates only businessName, we still send all other fields from the form
    if (hasBusinessData() || originalProfile?.business) {
      const businessData: any = {};
      const originalBusiness = originalProfile?.business || {};
      
      // Include all business fields from form
      businessData.businessName = businessName.trim() || originalBusiness.businessName || undefined;
      businessData.businessType = businessType || originalBusiness.businessType || undefined;
      businessData.businessSegment = businessSegment || originalBusiness.businessSegment || undefined;
      businessData.businessDescription = businessDescription.trim() || originalBusiness.businessDescription || undefined;
      businessData.gstNumber = gstNumber.trim() || originalBusiness.gstNumber || undefined;
      
      // Validate URLs if provided
      const websiteUrlValue = websiteUrl.trim() || originalBusiness.websiteUrl || "";
      if (websiteUrlValue) {
        if (!isValidUrl(websiteUrlValue)) {
          throw new Error("Website URL must be a valid URL format");
        }
        businessData.websiteUrl = websiteUrlValue;
      }
      
      const businessLogoValue = businessLogo.trim() || originalBusiness.businessLogo || "";
      if (businessLogoValue) {
        if (!isValidUrl(businessLogoValue)) {
          throw new Error("Business Logo URL must be a valid URL format");
        }
        businessData.businessLogo = businessLogoValue;
      }

      // Remove undefined values
      Object.keys(businessData).forEach(key => {
        if (businessData[key] === undefined) {
          delete businessData[key];
        }
      });

      // Only add business if it has at least one field
      if (Object.keys(businessData).length > 0) {
        data.business = businessData;
      }
    }

    return data;
  };

  const handleSaveProfile = async () => {
    if (!validateProfile()) return;

    setLoading(true);
    try {
      const updateData = buildCompleteProfileData();
      await updateProfile(updateData);
      // Toast is handled by axios interceptor
    } catch (error) {
      // Only show toast for validation errors (not API errors - those are handled by interceptor)
      if (error instanceof Error && error.message.includes("URL must be a valid")) {
        toast.error(error.message);
      }
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAddress = async () => {
    setLoading(true);
    try {
      const updateData = buildCompleteProfileData();
      await updateProfile(updateData);
      // Toast is handled by axios interceptor
    } catch (error) {
      // Only show toast for validation errors (not API errors - those are handled by interceptor)
      if (error instanceof Error && error.message.includes("URL must be a valid")) {
        toast.error(error.message);
      }
      console.error("Failed to update address:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBusiness = async () => {
    setLoading(true);
    try {
      const updateData = buildCompleteProfileData();
      await updateProfile(updateData);
      // Toast is handled by axios interceptor
    } catch (error) {
      // Only show toast for validation errors (not API errors - those are handled by interceptor)
      if (error instanceof Error && error.message.includes("URL must be a valid")) {
        toast.error(error.message);
      }
      console.error("Failed to update business:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;

    setLoading(true);
    try {
      const passwordData: ChangePasswordData = {
        currentPassword,
        newPassword,
        confirmPassword,
      };

      await changePassword(passwordData);
      // Clear password fields on success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // Toast is handled by interceptor
    } catch (error) {
      console.error("Failed to change password:", error);
      // Error toast is handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "address" as TabType, label: "Address", icon: MapPin },
    { id: "business" as TabType, label: "Business", icon: Building },
    { id: "password" as TabType, label: "Password", icon: Lock },
  ];

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px",
                activeTab === tab.id
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-6 lg:p-8">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className={cn("h-11", errors.email && "border-destructive")}
                  maxLength={150}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-semibold">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
                    }}
                    className={cn("h-11", errors.firstName && "border-destructive")}
                    maxLength={50}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
                    }}
                    className={cn("h-11", errors.lastName && "border-destructive")}
                    maxLength={50}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Phone Number</Label>
                <Input
                  type="text"
                  value={user?.phone || ""}
                  disabled
                  className="h-11 bg-muted"
                />
                <p className="text-xs text-muted-foreground">Phone number cannot be changed</p>
              </div>
            </div>

            <Button
              onClick={handleSaveProfile}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        )}

        {/* Address Tab */}
        {activeTab === "address" && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Update your address information. All fields are optional.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="addressType" className="text-sm font-semibold">Address Type</Label>
                  <Input
                    id="addressType"
                    type="text"
                    placeholder="Home / Office"
                    value={addressType}
                    onChange={(e) => setAddressType(e.target.value)}
                    className="h-11"
                    maxLength={50}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipcode" className="text-sm font-semibold">PIN Code</Label>
                  <Input
                    id="zipcode"
                    type="text"
                    placeholder="395001"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    className="h-11"
                    maxLength={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="street" className="text-sm font-semibold">Street / Area</Label>
                <Input
                  id="street"
                  type="text"
                  placeholder="Enter street address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="h-11"
                  maxLength={255}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-semibold">City</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Surat"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="h-11"
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-semibold">State</Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="Gujarat"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="h-11"
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-semibold">Country</Label>
                <Input
                  id="country"
                  type="text"
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-11"
                  maxLength={100}
                />
              </div>
            </div>

            <Button
              onClick={handleSaveAddress}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Address
                </>
              )}
            </Button>
          </div>
        )}

        {/* Business Tab */}
        {activeTab === "business" && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Update your business information. All fields are optional.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-sm font-semibold">Business Name</Label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="ABC Enterprises"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="h-11"
                  maxLength={150}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessType" className="text-sm font-semibold">Business Type</Label>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUSINESS_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessSegment" className="text-sm font-semibold">Business Segment</Label>
                  <Select value={businessSegment} onValueChange={setBusinessSegment}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select segment" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUSINESS_SEGMENTS.map((segment) => (
                        <SelectItem key={segment.value} value={segment.value}>
                          {segment.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessDescription" className="text-sm font-semibold">Business Description</Label>
                <Textarea
                  id="businessDescription"
                  placeholder="Describe your business..."
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gstNumber" className="text-sm font-semibold">GST Number</Label>
                <Input
                  id="gstNumber"
                  type="text"
                  placeholder="27ABCDE1234F1Z5"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  className="h-11"
                  maxLength={20}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteUrl" className="text-sm font-semibold">Website URL</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  placeholder="https://www.example.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessLogo" className="text-sm font-semibold">Business Logo URL</Label>
                <Input
                  id="businessLogo"
                  type="url"
                  placeholder="https://www.example.com/logo.png"
                  value={businessLogo}
                  onChange={(e) => setBusinessLogo(e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            <Button
              onClick={handleSaveBusiness}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Business
                </>
              )}
            </Button>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Change your password. Make sure it's strong and secure.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-semibold">
                  Current Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      if (errors.currentPassword) setErrors((prev) => ({ ...prev, currentPassword: "" }));
                    }}
                    className={cn("h-11 pr-10", errors.currentPassword && "border-destructive")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="text-sm text-destructive">{errors.currentPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-semibold">
                  New Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: "" }));
                    }}
                    className={cn("h-11 pr-10", errors.newPassword && "border-destructive")}
                    maxLength={18}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-sm text-destructive">{errors.newPassword}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  8-18 characters with uppercase, lowercase, number, and special character
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold">
                  Confirm New Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                    }}
                    className={cn("h-11 pr-10", errors.confirmPassword && "border-destructive")}
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

            <Button
              onClick={handleChangePassword}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Changing...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;

