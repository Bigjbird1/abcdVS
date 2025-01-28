import React from "react";
import { Search, Calendar, MapPin, Users, DollarSign, X } from "lucide-react";

interface SavedSearchesProps {
  userType: "buyer" | "seller";
}

const SavedSearches: React.FC<SavedSearchesProps> = ({ userType }) => {
  if (userType === "seller") return null;

  const savedSearches = [
    {
      id: 1,
      name: "Summer Beach Wedding",
      date: "2024-07-01 to 2024-08-31",
      location: "Southern California",
      guests: "100-150",
      budget: "$15,000 - $25,000",
    },
    {
      id: 2,
      name: "Fall Mountain Retreat",
      date: "2024-09-01 to 2024-10-31",
      location: "Colorado",
      guests: "50-100",
      budget: "$10,000 - $20,000",
    },
    // Add more saved searches as needed
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Saved Searches</h2>
      <div className="space-y-4">
        {savedSearches.map((search) => (
          <div
            key={search.id}
            className="bg-white rounded-xl p-4 border flex items-start gap-4"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{search.name}</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{search.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{search.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{search.guests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{search.budget}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedSearches;
