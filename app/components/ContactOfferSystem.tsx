import React, { useState } from "react";
import { MessageCircle, DollarSign } from "lucide-react";

const ContactOfferSystem = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex space-x-4">
        <button
          onClick={() => setShowContactForm(true)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Contact Seller
        </button>
        <button
          onClick={() => setShowOfferForm(true)}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          <DollarSign className="w-5 h-5 mr-2" />
          Make Offer
        </button>
      </div>

      {showContactForm && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Contact Seller</h3>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows={4}
            placeholder="Type your message here..."
          ></textarea>
          <div className="mt-2 flex justify-end">
            <button
              onClick={() => setShowContactForm(false)}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors mr-2"
            >
              Cancel
            </button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      )}

      {showOfferForm && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Make an Offer</h3>
          <input
            type="number"
            className="w-full p-2 border rounded-lg mb-2"
            placeholder="Enter your offer amount"
          />
          <textarea
            className="w-full p-2 border rounded-lg"
            rows={4}
            placeholder="Add any additional notes or conditions..."
          ></textarea>
          <div className="mt-2 flex justify-end">
            <button
              onClick={() => setShowOfferForm(false)}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors mr-2"
            >
              Cancel
            </button>
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Submit Offer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactOfferSystem;
