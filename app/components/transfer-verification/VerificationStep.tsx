import React from "react";
import { CheckCircle2, FileText, X, Upload } from "lucide-react";

interface VerificationStepProps {
  title: string;
  description: string;
  status: "pending" | "verified" | "rejected";
  onUpload: () => void;
  onVerify: () => void;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
  title,
  description,
  status,
  onUpload,
  onVerify,
}) => {
  return (
    <div className="p-6 bg-white rounded-xl border mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center
            ${
              status === "verified"
                ? "bg-green-100"
                : status === "rejected"
                  ? "bg-red-100"
                  : "bg-gray-100"
            }`}
          >
            {status === "verified" ? (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            ) : status === "rejected" ? (
              <X className="w-6 h-6 text-red-600" />
            ) : (
              <FileText className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm
          ${
            status === "verified"
              ? "bg-green-100 text-green-800"
              : status === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {status !== "verified" && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={onUpload}
            className="flex-1 px-4 py-3 border-2 border-dashed rounded-lg hover:border-gray-400 flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload Document
          </button>
          <button
            onClick={onVerify}
            className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Verify Now
          </button>
        </div>
      )}
    </div>
  );
};

export default VerificationStep;
