"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Share,
  Shield, 
  ChevronLeft, 
  ChevronRight,
  Star,
  User,
  MapPin,
  Minus,
  Plus,
  ShoppingCart
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SaveItemButton from './SaveItemButton';

interface Seller {
  name: string;
  rating: number;
  reviews: number;
  memberSince: string;
  responseTime: string;
  verified: boolean;
}

interface Listing {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  description: string;
  condition: string;
  size: string;
  location: string;
  shippingPrice: number;
  images: string[];
  seller: Seller;
}

interface Props {
  params: {
    id: string;
  };
}

const MarketplaceListingDetail: React.FC<Props> = ({ params }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  const listing: Listing = {
    id: 1,
    title: "Vera Wang White Collection Wedding Dress",
    price: 1200,
    originalPrice: 3500,
    description: "Beautiful Vera Wang wedding dress from the White collection. Worn once and professionally cleaned.",
    condition: "Like New",
    size: "6",
    location: "San Francisco, CA",
    shippingPrice: 25,
    images: [
      "/api/placeholder/800/600?text=Wedding-Dress-1",
      "/api/placeholder/800/600?text=Wedding-Dress-2",
      "/api/placeholder/800/600?text=Wedding-Dress-3",
      "/api/placeholder/800/600?text=Wedding-Dress-4"
    ],
    seller: {
      name: "Emma's Boutique",
      rating: 4.9,
      reviews: 28,
      memberSince: "2023",
      responseTime: "< 1 hour",
      verified: true
    }
  };

  const router = useRouter();

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({
      id: listing.id,
      name: listing.title,
      price: listing.price,
      originalPrice: listing.originalPrice,
      size: listing.size,
      quantity: quantity,
      image: listing.images[0],
      seller: listing.seller.name,
      shipping: listing.shippingPrice,
      condition: listing.condition
    });
    router.push('/marketplace/cart');
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] relative bg-white rounded-xl overflow-hidden">
              <img 
                src={listing.images[currentImageIndex]}
                alt={`${listing.title} view ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              <button
                onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white"
                disabled={currentImageIndex === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentImageIndex(prev => 
                  Math.min(listing.images.length - 1, prev + 1)
                )}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white"
                disabled={currentImageIndex === listing.images.length - 1}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 rounded-full bg-white/90 hover:bg-white">
                  <Share className="w-5 h-5" />
                </button>
                <SaveItemButton itemId={params.id} className="bg-white/90 hover:bg-white" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {listing.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-gray-900' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl font-semibold">{listing.title}</h1>
                <div className="text-right">
                  <div className="text-2xl font-semibold">${listing.price}</div>
                  <div className="text-gray-500 line-through">
                    ${listing.originalPrice}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{listing.seller.rating}</span>
                  <span>({listing.seller.reviews} reviews)</span>
                </div>
                <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                  {listing.condition}
                </span>
              </div>
            </div>

            {/* Quick Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Size</p>
                  <p className="font-medium">{listing.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{listing.location}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-medium mb-2">Description</h2>
              <p className="text-gray-600">{listing.description}</p>
            </div>

            {/* Seller Info */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    {listing.seller.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{listing.seller.name}</h3>
                      {listing.seller.verified && (
                        <Shield className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Member since {listing.seller.memberSince}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Contact Seller
                </button>
              </div>
            </div>

            {/* Purchase Actions */}
            <div className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Protected by Buyer Guarantee. Full refund if item not as described.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center justify-start gap-4">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="p-2 hover:bg-gray-100 rounded-l-lg"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x text-center min-w-[3rem]">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="p-2 hover:bg-gray-100 rounded-r-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleAddToCart()}
                    className="px-6 py-2 border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button 
                    onClick={handleBuyNow}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Contact Seller</h3>
            <div className="space-y-4">
              <textarea
                className="w-full p-3 border rounded-lg"
                rows={4}
                placeholder="Type your message..."
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-2 text-sm hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceListingDetail;
