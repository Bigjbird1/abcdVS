'use client'

import React, { useState } from 'react';
import { Search, Calendar, MapPin, Package, ShoppingBag, ArrowRight, Gift, Heart, ArrowLeftRight } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NewsletterSignup from './components/NewsletterSignup';

const Homepage = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState('dates'); // 'dates' or 'marketplace'
  const { } = useAuth();

  const router = useRouter();

  const handleSearch = (type: 'dates' | 'marketplace') => {
    if (type === 'marketplace') {
      router.push('/marketplace');
    } else {
      router.push(`/search?type=${type}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Tabs */}
      <div className="relative pt-16 pb-24 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="mb-6 leading-tight tracking-tight">
            <span className="block text-5xl sm:text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              Your Perfect Wedding
            </span>
            <span className="block font-light text-4xl sm:text-5xl mt-4 bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Dates · Decor · Dreams
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Find your perfect wedding date or shop pre-loved treasures
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setActiveTab('dates')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-lg transition-all ${
                activeTab === 'dates' 
                  ? 'bg-gray-900 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Find Dates
            </button>
            <button 
              onClick={() => setActiveTab('marketplace')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-lg transition-all ${
                activeTab === 'marketplace' 
                  ? 'bg-gray-900 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Marketplace
            </button>
          </div>
        </div>

        {/* Search Components */}
        {activeTab === 'dates' ? (
          <div className={`relative max-w-3xl mx-auto ${isSearchFocused ? 'shadow-2xl' : 'shadow-lg'} transition-shadow duration-200`}>
            <div className="bg-white rounded-full p-2 flex items-center">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="When's your perfect date?"
                  className="w-full py-3 focus:outline-none text-gray-900 placeholder-gray-500 text-lg font-light"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex-1 flex items-center gap-2 px-4">
                <MapPin className="h-5 w-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Where?"
                  className="w-full py-3 focus:outline-none text-gray-900 placeholder-gray-500 text-lg font-light"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
              <button 
                onClick={() => handleSearch('dates')}
                className="bg-gradient-to-r from-rose-500 to-purple-600 text-white p-4 rounded-full hover:opacity-90 transition-opacity"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className={`relative max-w-3xl mx-auto ${isSearchFocused ? 'shadow-2xl' : 'shadow-lg'} transition-shadow duration-200`}>
            <div className="bg-white rounded-full p-2 flex items-center">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Search className="h-5 w-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search dresses, decor, and more..."
                  className="w-full py-3 focus:outline-none text-gray-900 placeholder-gray-500 text-lg font-light"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
              <button 
                onClick={() => handleSearch('marketplace')}
                className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Search Items
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Content Section */}
      {activeTab === 'dates' ? (
        /* Featured Dates Section */
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">Featured dates</h2>
              <Link href="/search" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                View all dates
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <Link href={`/listing/${item}`} key={item} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="aspect-[16/9] relative">
                    <img 
                      src={`/placeholder.svg?height=450&width=800&text=Luxury-Venue-${item}`}
                      alt="Venue"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2 py-1 bg-black/30 rounded-full text-sm text-white backdrop-blur-sm">
                        32% off
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">Garden Wedding Package</h3>
                        <p className="text-gray-600">San Francisco, CA</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">$15,000</div>
                        <div className="text-sm text-gray-500 line-through">$22,000</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">Sep 24, 2024</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">150 guests</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Featured Marketplace Items Section */
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { name: "Wedding Dresses", icon: Heart, color: "bg-rose-50 text-rose-500" },
                { name: "Decor & Flowers", icon: Gift, color: "bg-purple-50 text-purple-500" },
                { name: "Accessories", icon: Package, color: "bg-blue-50 text-blue-500" },
                { name: "View All", icon: ArrowRight, color: "bg-gray-50 text-gray-500" }
              ].map((category, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    router.push('/marketplace', undefined, { scroll: false });
                    window.scrollTo(0, 0);
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div className={`w-10 h-10 ${category.color} rounded-full flex items-center justify-center`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <Link href={`/marketplace/${item}`} key={item} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="aspect-square relative">
                    <img 
                      src={`/placeholder.svg?height=400&width=400&text=Item-${item}`}
                      alt="Marketplace item"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Vintage Wedding Dress</h3>
                        <p className="text-sm text-gray-600">Size 6-8, Worn Once</p>
                      </div>
                      <div className="text-right font-medium">$899</div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">Like New</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Free Shipping</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trust/Benefits Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="font-medium mb-2">Flexible Dates</h3>
              <p className="text-gray-600 text-sm">Find and transfer wedding dates that work for you</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-medium mb-2">Verified Items</h3>
              <p className="text-gray-600 text-sm">Shop with confidence from verified sellers</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-medium mb-2">Secure Transactions</h3>
              <p className="text-gray-600 text-sm">Protected payments and verified transfers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <NewsletterSignup />

    </div>
  );
};

export default Homepage;



