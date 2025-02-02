"use client";
import { useState, useEffect, useCallback } from "react";
import { Mail, Eye, EyeOff, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const { signIn, signUp, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  // Handle escape key press
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        onClose();
      }
    },
    [onClose, isLoading],
  );

  useEffect(() => {
    // Add event listeners
    document.addEventListener("keydown", handleEscapeKey);

    // Prevent scrolling on mount using a better approach
    document.body.style.overflow = "hidden";

    return () => {
      // Clean up event listeners and restore scrolling
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [handleEscapeKey]);

  let debounceTimeout: NodeJS.Timeout | null = null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(async () => {
      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      try {
        if (isSignUp) {
          await signUp(email, password, "buyer");
          // Show success message before closing
          setTimeout(() => {
            onClose();
          }, 1000);
        } else {
          await signIn(email, password);
          onClose();
        }
      } catch (err) {
        if (err instanceof Error) {
          // Convert technical error messages to user-friendly ones
          const errorMessage = err.message.toLowerCase();
          if (errorMessage.includes("invalid login")) {
            setError("Invalid email or password");
          } else if (errorMessage.includes("email already exists")) {
            setError("An account with this email already exists");
          } else if (errorMessage.includes("network")) {
            setError("Network error. Please check your connection");
          } else if (errorMessage.includes("rate limit exceeded")) {
            setError("Too many signup attempts. Please try again in a few minutes");
          } else {
            setError("An error occurred. Please try again");
          }
        } else {
          setError("An unexpected error occurred");
        }
      }
    }, 1000); // 1 second debounce
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
      onTouchMove={(e) => e.preventDefault()}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            {isSignUp ? "Create account" : "Log in to your account"}
          </h2>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <Shield className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 bg-gray-900 text-white rounded-lg transition-opacity ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {isLoading ? "Loading..." : isSignUp ? "Sign up" : "Log in"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-gray-900 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-gray-900 rounded"
              >
                {isSignUp ? "Log in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
