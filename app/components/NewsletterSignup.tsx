"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">You're all set!</h3>
          <p className="text-gray-600">
            Thank you for subscribing. We'll keep you updated with the latest
            deals and wedding dates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Stay Updated</h2>
        <p className="text-gray-600 mb-8">
          Get notified about new dates, special offers, and wedding planning
          tips
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={status === "loading"}
                required
              />
              {status === "loading" && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Popular Topics */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            "Wedding Planning Tips",
            "Venue Guides",
            "Budget Advice",
            "Style Inspiration",
          ].map((topic) => (
            <span
              key={topic}
              className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm"
            >
              {topic}
            </span>
          ))}
        </div>

        {status === "error" && (
          <Alert className="mt-4 max-w-md mx-auto">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Trust indicators */}
        <div className="mt-8 text-sm text-gray-500">
          Join 5,000+ subscribers. Unsubscribe at any time.
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
