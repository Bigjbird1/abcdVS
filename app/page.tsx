'use client';
import React, { useState } from 'react';
import { Search, Calendar, MapPin, Heart, ArrowRight, ShoppingBag, Sparkles, Shield, Mail } from 'lucide-react';

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('shop');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [email, setEmail] = useState('');
  const [recentSearches] = useState(['Wedding Dress Size 6', 'Rustic Decor', 'Fall 2025']);

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
                    className="bg-gradient-to-r from-rose-500 to-purple-600 text-white p-4 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        setIsSearching(true);
                        const input = document.querySelector('input[name="searchQuery"]') as HTMLInputElement;
                        const query = input?.value || '';
                        if (!query.trim()) {
                          alert('Please enter a search term');
                          return;
                        }
                        window.location.href = `/marketplace?query=${encodeURIComponent(query)}`;
                      } catch (error) {
                        console.error('Search error:', error);
                        alert('An error occurred while searching. Please try again.');
                      } finally {
                        setIsSearching(false);
                      }
                    }}
                    disabled={isSearching}
                    aria-label="Search wedding items"
                  >
                    {isSearching ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
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
                      aria-label="Wedding date"
                      name="weddingDate"
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
                      aria-label="Wedding location"
                      name="weddingLocation"
                    />
                  </div>
                  <button 
                    className="bg-gradient-to-r from-rose-500 to-purple-600 text-white p-4 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        setIsSearching(true);
                        const dateInput = document.querySelector('input[name="weddingDate"]') as HTMLInputElement;
                        const locationInput = document.querySelector('input[name="weddingLocation"]') as HTMLInputElement;
                        const date = dateInput?.value || '';
                        const location = locationInput?.value || '';
                        
                        if (!date.trim() || !location.trim()) {
                          alert('Please enter both date and location');
                          return;
                        }
                        
                        window.location.href = `/date-trading?date=${encodeURIComponent(date)}&location=${encodeURIComponent(location)}`;
                      } catch (error) {
                        console.error('Search error:', error);
                        alert('An error occurred while searching. Please try again.');
                      } finally {
                        setIsSearching(false);
                      }
                    }}
                    disabled={isSearching}
                    aria-label="Search wedding dates"
                  >
                    {isSearching ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
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
              <div 
                key={index} 
                className="group cursor-pointer"
                onClick={() => window.location.href = `/marketplace/category/${item.name.toLowerCase().replace(' ', '-')}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = `/marketplace/category/${item.name.toLowerCase().replace(' ', '-')}`;
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Browse ${item.name} category - ${item.details}`}
              >
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

      {/* Testimonials */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Couples Say</h2>
            <p className="text-gray-600">Join thousands of happy couples who found their perfect match</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah & Mike",
                image: "/api/placeholder/80/80?text=S&M",
                text: "Found our dream venue date at 40% off! The transfer process was seamless.",
                date: "December 2024"
              },
              {
                name: "Jessica & Tom",
                image: "/api/placeholder/80/80?text=J&T",
                text: "Bought my pre-loved Vera Wang dress for a fraction of the retail price. It was in perfect condition!",
                date: "January 2025"
              },
              {
                name: "Emily & Chris",
                image: "/api/placeholder/80/80?text=E&C",
                text: "Great platform for finding unique decor pieces. Saved us thousands on our wedding budget.",
                date: "November 2024"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.date}</div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-rose-50 to-purple-50 py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600">Get the latest deals and wedding planning tips delivered to your inbox</p>
          </div>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!email.trim()) {
              alert('Please enter your email');
              return;
            }
            // Add newsletter signup logic here
            alert('Thank you for subscribing!');
            setEmail('');
          }} className="flex gap-4 max-w-md mx-auto">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                aria-label="Email for newsletter"
              />
            </div>
            <button 
              type="submit"
              className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              aria-label="Subscribe to newsletter"
            >
              <Mail className="w-5 h-5" />
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
