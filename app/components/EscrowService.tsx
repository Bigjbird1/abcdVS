import React, { useState } from "react";
import { Shield, DollarSign, CheckCircle, AlertCircle } from "lucide-react";

interface EscrowServiceProps {
  listingId: string;
  price: number;
  sellerName: string;
  buyerName: string;
}

const EscrowService: React.FC<EscrowServiceProps> = ({
  listingId,
  price,
  sellerName,
  buyerName,
}) => {
  const [status, setStatus] = useState<
    "pending" | "in_escrow" | "completed" | "refunded"
  >("pending");

  const handleInitiateEscrow = () => {
    // In a real application, this would make an API call to initiate the escrow
    setStatus("in_escrow");
  };

  const handleReleaseEscrow = () => {
    // In a real application, this would make an API call to release the funds
    setStatus("completed");
  };

  const handleRefundEscrow = () => {
    // In a real application, this would make an API call to refund the buyer
    setStatus("refunded");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Shield className="mr-2 text-green-500" />
        Secure Escrow Service
      </h2>
      <div className="mb-4">
        <p className="text-gray-600">Listing ID: {listingId}</p>
        <p className="text-gray-600">Price: ${price.toLocaleString()}</p>
        <p className="text-gray-600">Seller: {sellerName}</p>
        <p className="text-gray-600">Buyer: {buyerName}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Status: {status.replace("_", " ")}
        </h3>
        {status === "pending" && (
          <p className="text-gray-600">
            Initiate the escrow process to securely transfer funds for this
            wedding date.
          </p>
        )}
        {status === "in_escrow" && (
          <p className="text-gray-600">
            Funds are held securely. They will be released to the seller once
            the transfer is confirmed.
          </p>
        )}
        {status === "completed" && (
          <p className="text-green-600 flex items-center">
            <CheckCircle className="mr-2" />
            Transfer completed successfully. Funds have been released to the
            seller.
          </p>
        )}
        {status === "refunded" && (
          <p className="text-orange-600 flex items-center">
            <AlertCircle className="mr-2" />
            Funds have been refunded to the buyer.
          </p>
        )}
      </div>
      {status === "pending" && (
        <button
          onClick={handleInitiateEscrow}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Initiate Escrow
        </button>
      )}
      {status === "in_escrow" && (
        <div className="flex gap-4">
          <button
            onClick={handleReleaseEscrow}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Release Funds
          </button>
          <button
            onClick={handleRefundEscrow}
            className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Refund Buyer
          </button>
        </div>
      )}
    </div>
  );
};

export default EscrowService;
