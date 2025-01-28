import React, { useState } from "react";
import { FileText, Download } from "lucide-react";

interface TransferAgreementGeneratorProps {
  listingId: string;
  venueName: string;
  originalDate: string;
  transferDate: string;
  sellerName: string;
  buyerName: string;
  price: number;
}

const TransferAgreementGenerator: React.FC<TransferAgreementGeneratorProps> = ({
  listingId,
  venueName,
  originalDate,
  transferDate,
  sellerName,
  buyerName,
  price,
}) => {
  const [additionalTerms, setAdditionalTerms] = useState("");

  const generateAgreement = () => {
    const agreement = `
      WEDDING DATE TRANSFER AGREEMENT

      This agreement is made on ${new Date().toLocaleDateString()} between:

      Seller: ${sellerName}
      Buyer: ${buyerName}

      WHEREAS:
      1. The Seller has a confirmed wedding reservation at ${venueName} for ${originalDate}.
      2. The Seller wishes to transfer this reservation to the Buyer for ${transferDate}.

      IT IS AGREED AS FOLLOWS:
      1. The Seller agrees to transfer their wedding reservation at ${venueName} from ${originalDate} to ${transferDate} to the Buyer.
      2. The Buyer agrees to pay the Seller $${price.toLocaleString()} for this transfer.
      3. Both parties agree to cooperate fully with ${venueName} to facilitate this transfer.
      4. This transfer is subject to approval by ${venueName}.

      Additional Terms:
      ${additionalTerms}

      Signed:

      _________________________    _________________________
      ${sellerName} (Seller)        ${buyerName} (Buyer)

      Date: ____________________    Date: ____________________
    `;

    // In a real application, this would generate a PDF
    console.log(agreement);
    alert(
      "Agreement generated! In a real application, this would create a downloadable PDF.",
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FileText className="mr-2 text-blue-500" />
        Transfer Agreement Generator
      </h2>
      <div className="mb-4">
        <p className="text-gray-600">Listing ID: {listingId}</p>
        <p className="text-gray-600">Venue: {venueName}</p>
        <p className="text-gray-600">Original Date: {originalDate}</p>
        <p className="text-gray-600">Transfer Date: {transferDate}</p>
        <p className="text-gray-600">Seller: {sellerName}</p>
        <p className="text-gray-600">Buyer: {buyerName}</p>
        <p className="text-gray-600">Price: ${price.toLocaleString()}</p>
      </div>
      <div className="mb-4">
        <label
          htmlFor="additionalTerms"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Additional Terms (Optional)
        </label>
        <textarea
          id="additionalTerms"
          name="additionalTerms"
          rows={4}
          value={additionalTerms}
          onChange={(e) => setAdditionalTerms(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter any additional terms or conditions..."
        ></textarea>
      </div>
      <button
        onClick={generateAgreement}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        <Download className="mr-2" />
        Generate Agreement
      </button>
    </div>
  );
};

export default TransferAgreementGenerator;
