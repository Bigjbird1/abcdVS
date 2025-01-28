"use client";

import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Heart,
  Share,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Shield,
  DollarSign,
  CalendarCheck,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ListingGallery from "./listings/ListingGallery"; // Importing new Gallery component
import ListingInfo from "./listings/ListingInfo"; // Importing new Info component
import ContactSeller from "./listings/ContactSeller"; // Importing new Contact Form component
import PaymentOptions from "./listings/PaymentOptions"; // Importing new Payment Options component
import SellerDetails from "./listings/SellerDetails"; // Importing new Seller Details component

const ListingDetail = () => {
  const router = useRouter();
  const [showContactForm, setShowContactForm] = useState(false);

  // Mock data - would come from props/API
  const listing = {
    title: "Garden Wedding Package at The Grand Estate",
    date: "2024-09-24",
    timeOfDay: "Evening (4PM - 8PM)",
    location: "San Francisco, CA",
    originalPrice: 22000,
    askingPrice: 15000,
    guestCapacity: 150,
    description:
      "Beautiful garden wedding package including venue rental, catering for 150 guests, basic decor, and staffing. The Grand Estate features stunning gardens, a historic mansion, and modern amenities.",
    images: [
      "/placeholder.svg?height=500&width=800&text=Garden-View",
      "/placeholder.svg?height=500&width=800&text=Reception-Hall",
      "/placeholder.svg?height=500&width=800&text=Ceremony-Space",
      "/placeholder.svg?height=500&width=800&text=Dining-Area",
    ],
    includedServices: [
      "Venue rental (6 hours)",
      "Catering (appetizers, main course, dessert)",
      "Basic floral arrangements",
      "Tables and chairs",
      "Setup and cleanup",
      "Event coordinator",
      "Security staff",
      "Parking attendants",
    ],
    amenities: [
      "Bridal suite",
      "Groom's room",
      "Commercial kitchen",
      "Ample parking",
      "Wheelchair accessible",
      "Climate controlled",
      "Backup generator",
      "Sound system",
    ],
    transferPolicy:
      "Full transfer of all services and amenities. Original contract and deposit will be transferred to the new couple after verification.",
    seller: {
      name: "Sarah & Michael",
      memberSince: "2023",
      responseRate: "98%",
    },
    id: "123", // Added ID for routing
  };

  return (
    <div className="min-h-screen bg-white">
      <ListingGallery images={listing.images} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          <ListingInfo listing={listing} />

          <div className="space-y-6">
            <SellerDetails seller={listing.seller} />
            <PaymentOptions
              askingPrice={listing.askingPrice}
              originalPrice={listing.originalPrice}
              listingId={listing.id}
              onContactSeller={() => setShowContactForm(true)}
            />
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactSeller onClose={() => setShowContactForm(false)} />
      )}
    </div>
  );
};

export default ListingDetail;
