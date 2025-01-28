import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation

const Navbar = () => {
  const router = useRouter(); // Initialize the router

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              VowSwap
            </div>
            <div className="flex items-center gap-6">
              {/* Removed the "Date Trading" button */}
              {/* <button className="text-gray-500 hover:text-gray-900 transition-colors">
                List your date
              </button> */}
              <button 
                className="text-gray-500 hover:text-gray-900 transition-colors"
                onClick={() => router.push('/marketplace')} // Navigate to Marketplace
              >
                Shop
              </button>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar; 