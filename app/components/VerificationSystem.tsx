import React, { useState } from "react";
import { Check, X, Upload, Shield } from "lucide-react";

interface VerificationSystemProps {
  userType: "venue" | "user";
  id: string;
}

const VerificationSystem: React.FC<VerificationSystemProps> = ({
  userType,
  id,
}) => {
  const [verificationStatus, setVerificationStatus] = useState<
    "unverified" | "pending" | "verified"
  >("unverified");
  const [documents, setDocuments] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setDocuments(Array.from(event.target.files));
    }
  };

  const handleSubmitVerification = () => {
    // In a real application, this would upload the documents and initiate the verification process
    setVerificationStatus("pending");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Shield className="mr-2 text-blue-500" />
        Verification System
      </h2>
      <p className="mb-4 text-gray-600">
        {userType === "venue"
          ? "Verify your venue to increase trust and visibility on our platform."
          : "Verify your account to unlock all features and build trust with other users."}
      </p>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Status: {verificationStatus}
        </h3>
        {verificationStatus === "unverified" && (
          <p className="text-gray-600">
            Please upload the required documents to start the verification
            process.
          </p>
        )}
        {verificationStatus === "pending" && (
          <p className="text-blue-600">
            Your documents are being reviewed. This process may take 1-3
            business days.
          </p>
        )}
        {verificationStatus === "verified" && (
          <p className="text-green-600 flex items-center">
            <Check className="mr-2" />
            Your {userType} is verified. Thank you for helping to keep our
            platform safe and trustworthy.
          </p>
        )}
      </div>
      {verificationStatus === "unverified" && (
        <>
          <div className="mb-4">
            <label
              htmlFor="document-upload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Verification Documents
            </label>
            <input
              id="document-upload"
              type="file"
              multiple
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <button
            onClick={handleSubmitVerification}
            disabled={documents.length === 0}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            Submit for Verification
          </button>
        </>
      )}
    </div>
  );
};

export default VerificationSystem;
