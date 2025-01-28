'use client';
import React, { useState } from 'react';
import { Search, Calendar, MapPin, Heart, ArrowRight, ShoppingBag, Sparkles, Shield } from 'lucide-react';

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('shop');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 leading-tight tracking-tight">
            <span className="block text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              {activeTab === 'shop' ? 'Wedding Items' : 'Wedding Dates'}
            </span>
            <span className="block text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              Made Simple
            </span>
            <span className="block font-light text-4xl mt-4 bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              {activeTab === 'shop' ? 'Shop Pre-loved · Save Up to 60%' : 'Buy With Confidence · Sell With Ease'}
            </span>
            <div className="mt-8 text-gray-600 text-xl">
              <p>Your perfect wedding dates, dreams, decor</p>
              <p className="mt-2">Find your perfect wedding dates or shop pre-loved items</p>
            </div>
          </h1>

          <div className={`relative ${isSearchFocused ? 'shadow-2xl' : 'shadow-lg'}`}>
            <div className="bg-white rounded-xl p-4">
              <div className="flex gap-4 mb-4 justify-center">
                <button 
                  onClick={() => setActiveTab('shop')}
                  className={`pb-2 px-4 font-medium transition-colors ${
                    activeTab === 'shop' 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 border-b-2 border-rose-500' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Shop Items
                </button>
                <button 
                  onClick={() => setActiveTab('dates')}
                  className={`pb-2 px-4 font-medium transition-colors ${
                    activeTab === 'dates' 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 border-b-2 border-rose-500' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Wedding Dates
                </button>
              </div>

              {activeTab === 'shop' ? (
                <div className="bg-white rounded-full p-2 flex items-center">
                  <div className="flex-1 flex items-center gap-2 px-4">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input 
                      type="text"
                      placeholder="Search dresses, decor, and more..."
                      className="w-full py-3 focus:outline-none text-gray-900 placeholder-gray-500 text-lg font-light"
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      name="searchQuery"
                    />
                  </div>
                  <button 
                    className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      const query = document.querySelector('input[name="searchQuery"]').value;
                      window.location.href = `/marketplace?query=${encodeURIComponent(query)}`;
                    }}
                  >
                    Search Items
                  </button>
                </div>
              ) : (
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
                  <button className="bg-gradient-to-r from-rose-500 to-purple-600 text-white p-4 rounded-full hover:opacity-90 transition-opacity">
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-3">BROWSE BY CATEGORY</div>
              <h2 className="text-3xl font-bold">Popular Categories</h2>
            </div>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              View all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Wedding Dresses", details: "Save up to 60%" },
              { name: "Decor", details: "From $20" },
              { name: "Accessories", details: "Like-new condition" },
              { name: "Wedding Dates", details: "Browse Dates" }
            ].map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative rounded-xl overflow-hidden">
                  <img 
                    src={`/api/placeholder/400/400?text=${item.name}`}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-medium text-lg">{item.name}</h3>
                    <p className="text-white/90 text-sm">{item.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Items */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-3">FEATURED ITEMS</div>
              <h2 className="text-3xl font-bold">Popular Right Now</h2>
            </div>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              View all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                  <img 
                    src={`/api/placeholder/400/400?text=Item-${item}`}
                    alt="Item"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <h3 className="font-medium">Vera Wang Wedding Dress</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-medium">$1,200</span>
                    <span className="text-sm text-gray-500 line-through">$3,500</span>
                    <span className="text-sm text-green-600">65% off</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Size 6 · Like New</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Secure Transfers</h3>
              <p className="text-gray-600">Protected payments and verified listings for peace of mind</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Amazing Deals</h3>
              <p className="text-gray-600">Save up to 60% on pre-loved items and wedding dates</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Curated Selection</h3>
              <p className="text-gray-600">Quality checked items from trusted sellers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
