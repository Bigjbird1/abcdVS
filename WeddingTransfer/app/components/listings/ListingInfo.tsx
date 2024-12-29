'use client'

import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import ContactOfferSystem from '../ContactOfferSystem';

interface ListingInfoProps {
listing: {
title: string;
date: string;
timeOfDay: string;
location: string;
guestCapacity: number;
description: string;
includedServices: string[];
amenities: string[];
transferPolicy: string;
};
}

const ListingInfo: React.FC<ListingInfoProps> = ({ listing }) => (
<div className="col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-semibold mb-4">{listing.title}</h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(listing.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{listing.timeOfDay}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>Up to {listing.guestCapacity} guests</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About This Package</h2>
              <p className="text-gray-600">{listing.description}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {listing.includedServices.map((service, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Venue Amenities</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Transfer Policy</h2>
              <p className="text-gray-600">{listing.transferPolicy}</p>
            </div>

            <ContactOfferSystem />

          </div>

);

export default ListingInfo

