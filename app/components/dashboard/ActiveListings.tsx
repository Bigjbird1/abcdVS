import React from 'react';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';

interface ActiveListingsProps {
  userType: 'buyer' | 'seller';
}

const ActiveListings: React.FC<ActiveListingsProps> = ({ userType }) => {
  const listings = [
    {
      id: 1,
      title: 'Garden Wedding Package',
      date: '2024-09-24',
      location: 'San Francisco, CA',
      guests: 150,
      price: 15000,
      image: '/placeholder.svg?height=400&width=600&text=Garden-Wedding'
    },
    {
      id: 2,
      title: 'Beach Resort Wedding',
      date: '2024-07-15',
      location: 'Malibu, CA',
      guests: 100,
      price: 18000,
      image: '/placeholder.svg?height=400&width=600&text=Beach-Wedding'
    },
    // Add more listings as needed
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {userType === 'seller' ? 'Your Active Listings' : 'Recommended Listings'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(listing.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Up to {listing.guests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>${listing.price.toLocaleString()}</span>
                </div>
              </div>
              {userType === 'buyer' && (
                <button className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800">
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveListings;

