"use client";

import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import {
  Camera,
  Upload,
  Phone,
  Globe,
  Calendar,
  Shield,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { useAuth } from "../context/AuthContext";
import { z } from "zod";
import { createBrowserClient } from "@supabase/ssr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation schemas
type BuyerFormData = z.infer<typeof buyerSchema>;
type SellerFormData = z.infer<typeof sellerSchema>;

const buyerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Invalid phone number"),
  location: z.string().min(2, "Location is required"),
  preferredStartDate: z.string(),
  preferredEndDate: z.string(),
  guestCount: z.number().min(1, "Guest count must be at least 1"),
});

const sellerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Invalid phone number"),
  location: z.string().min(2, "Location is required"),
  governmentId: z.instanceof(File),
  venueContract: z.instanceof(File),
});

export default function ProfileSetup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  if (!user) {
    throw new Error("User must be authenticated");
  }
  const userType = user.userType || "buyer";
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BuyerFormData | SellerFormData>({
    resolver: zodResolver(userType === "buyer" ? buyerSchema : sellerSchema),
  });

  // Type guards
  const isBuyerData = (
    data: BuyerFormData | SellerFormData,
  ): data is BuyerFormData => {
    return userType === "buyer";
  };

  const isSellerData = (
    data: BuyerFormData | SellerFormData,
  ): data is SellerFormData => {
    return userType === "seller";
  };

  const onSubmit: SubmitHandler<BuyerFormData | SellerFormData> = async (
    data,
  ) => {
    setLoading(true);
    setError("");

    try {
      if (isBuyerData(data)) {
        // Save buyer profile
        const { error } = await supabase.from("profiles").upsert({
          id: user.id,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          location: data.location,
          preferredStartDate: data.preferredStartDate,
          preferredEndDate: data.preferredEndDate,
          guestCount: data.guestCount,
          profile_complete: true,
        });

        if (error) throw error;
      } else if (isSellerData(data)) {
        // Upload seller documents
        const [governmentIdUrl, venueContractUrl] = await Promise.all([
          uploadFile(data.governmentId),
          uploadFile(data.venueContract),
        ]);

        // Save seller profile
        const { error } = await supabase.from("profiles").upsert({
          id: user.id,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          location: data.location,
          government_id_url: governmentIdUrl,
          venue_contract_url: venueContractUrl,
          profile_complete: true,
          verification_status: "pending",
        });

        if (error) throw error;
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const { data, error } = await supabase.storage
      .from("verification-documents")
      .upload(`${user.id}/${file.name}`, file);

    if (error) throw error;
    return data.path;
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto relative">
                <button className="absolute bottom-0 right-0 p-2 bg-gray-900 rounded-full text-white hover:bg-gray-800">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h1 className="text-xl font-semibold">Complete your profile</h1>
            <p className="text-gray-600 mt-1">
              Help others get to know you better
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1.5"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your first name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1.5"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your last name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium mb-1.5"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="phoneNumber"
                  className="w-full px-3 py-2 pl-10 border rounded-lg"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-1.5"
              >
                Location
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  className="w-full px-3 py-2 pl-10 border rounded-lg"
                  placeholder="Enter your city"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800"
          >
            Continue
          </button>
        </div>
      );
    }

    if (step === 2 && userType === "seller") {
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Verify your identity</h1>
            <p className="text-gray-600 mt-1">
              Help us maintain a secure marketplace
            </p>
          </div>

          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              To protect our community, we require sellers to verify their
              identity before listing.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="governmentId"
                className="block text-sm font-medium mb-1.5"
              >
                Government ID
              </label>
              <input
                type="file"
                id="governmentId"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setValue("governmentId", e.target.files[0]);
                  }
                }}
              />
              <label
                htmlFor="governmentId"
                className="w-full p-4 border-2 border-dashed rounded-lg hover:border-gray-400 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Upload a photo of your ID
                  </span>
                </div>
              </label>
              {userType === "seller" &&
                "governmentId" in errors &&
                errors.governmentId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.governmentId.message}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor="venueContract"
                className="block text-sm font-medium mb-1.5"
              >
                Venue Contract
              </label>
              <input
                type="file"
                id="venueContract"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setValue("venueContract", e.target.files[0]);
                  }
                }}
              />
              <label
                htmlFor="venueContract"
                className="w-full p-4 border-2 border-dashed rounded-lg hover:border-gray-400 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Upload your venue contract
                  </span>
                </div>
              </label>
              {userType === "seller" &&
                "venueContract" in errors &&
                errors.venueContract && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.venueContract.message}
                  </p>
                )}
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-600">
                Your information is encrypted and securely stored. We'll review
                your documents within 24 hours.
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit for verification"}
          </button>
        </form>
      );
    }

    if (step === 2 && userType === "buyer") {
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Set your preferences</h1>
            <p className="text-gray-600 mt-1">
              Help us find your perfect wedding date
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="preferredStartDate"
                className="block text-sm font-medium mb-1.5"
              >
                Preferred Date Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    id="preferredStartDate"
                    className="w-full px-3 py-2 pl-10 border rounded-lg"
                    {...register("preferredStartDate")}
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    id="preferredEndDate"
                    className="w-full px-3 py-2 pl-10 border rounded-lg"
                    {...register("preferredEndDate")}
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="guestCount"
                className="block text-sm font-medium mb-1.5"
              >
                Guest Count
              </label>
              <input
                type="number"
                id="guestCount"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter guest count"
                {...register("guestCount", { valueAsNumber: true })}
              />
              {userType === "buyer" &&
                "guestCount" in errors &&
                errors.guestCount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.guestCount.message}
                  </p>
                )}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Preferences"}
          </button>
        </form>
      );
    }
    return null;
  };

  return <div className="p-6">{renderStep()}</div>;
}
