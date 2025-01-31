import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface ListingDetails {
  id: string;
  title: string;
  date: string;
  price: number;
  venue?: string;
  capacity?: number;
  amenities?: string[];
  cancellationPolicy?: string;
  description?: string;
}

export const ComparisonTool = () => {
  const [selectedListings, setSelectedListings] = useState<ListingDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ListingDetails[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }

    const searchListings = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('id, title, date, price, venue, capacity, amenities, cancellationPolicy, description')
        .ilike('title', `%${searchTerm}%`)
        .limit(5);

      if (error) {
        console.error('Error searching listings:', error);
        return;
      }

      setSearchResults(data || []);
    };

    const debounce = setTimeout(searchListings, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const addToComparison = (listing: ListingDetails) => {
    if (selectedListings.length < 3) {
      setSelectedListings([...selectedListings, listing]);
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const removeFromComparison = (listingId: string) => {
    setSelectedListings(selectedListings.filter(listing => listing.id !== listingId));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Compare Listings</h3>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search listings to compare..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={selectedListings.length >= 3}
          />
          {searchResults.length > 0 && searchTerm && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
              {searchResults.map((listing) => (
                <button
                  key={listing.id}
                  onClick={() => addToComparison(listing)}
                  className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0"
                >
                  <div className="font-medium">{listing.title}</div>
                  <div className="text-sm text-gray-600">
                    {formatDate(listing.date)} - {formatPrice(listing.price)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedListings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left bg-gray-50 border"></th>
                {selectedListings.map((listing) => (
                  <th key={listing.id} className="p-3 text-left bg-gray-50 border min-w-[250px]">
                    <div className="flex justify-between items-center">
                      <span>{listing.title}</span>
                      <button
                        onClick={() => removeFromComparison(listing.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-medium">Date</td>
                {selectedListings.map((listing) => (
                  <td key={listing.id} className="p-3 border">
                    {formatDate(listing.date)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border font-medium">Price</td>
                {selectedListings.map((listing) => (
                  <td key={listing.id} className="p-3 border">
                    {formatPrice(listing.price)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border font-medium">Venue</td>
                {selectedListings.map((listing) => (
                  <td key={listing.id} className="p-3 border">
                    {listing.venue || 'N/A'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border font-medium">Capacity</td>
                {selectedListings.map((listing) => (
                  <td key={listing.id} className="p-3 border">
                    {listing.capacity || 'N/A'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border font-medium">Amenities</td>
                {selectedListings.map((listing) => (
                  <td key={listing.id} className="p-3 border">
                    {listing.amenities ? (
                      <ul className="list-disc list-inside">
                        {listing.amenities.map((amenity, index) => (
                          <li key={index}>{amenity}</li>
                        ))}
                      </ul>
                    ) : (
                      'N/A'
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border font-medium">Cancellation Policy</td>
                {selectedListings.map((listing) => (
                  <td key={listing.id} className="p-3 border">
                    {listing.cancellationPolicy || 'N/A'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            Search and select up to 3 listings to compare their details side by side
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparisonTool;
