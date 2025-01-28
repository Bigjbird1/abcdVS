import React from "react";
import { CheckCircle2 } from "lucide-react";

interface ProgressTrackerProps {
  currentStep: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep }) => {
  const steps = [
    { num: 1, label: "Document Collection" },
    { num: 2, label: "Venue Verification" },
    { num: 3, label: "Final Review" },
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2
              ${
                currentStep === step.num
                  ? "bg-gray-900 text-white"
                  : currentStep > step.num
                    ? "bg-green-500 text-white"
                    : "border-2 text-gray-400"
              }`}
            >
              {currentStep > step.num ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                step.num
              )}
            </div>
            <span
              className={`text-sm whitespace-nowrap ${
                currentStep === step.num ? "font-medium" : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-24 h-1 bg-gray-200 mx-6 mt--4">
              <div
                className={`h-full transition-all ${
                  currentStep > step.num ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;
