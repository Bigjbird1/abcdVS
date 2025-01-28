"use client";
import React, { useState } from "react";
import { Heart, Share, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ListingGalleryProps {
  images: string[];
}

const ListingGallery: React.FC<ListingGalleryProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="relative h-96 bg-gray-100">
      <Image
        src={images[currentImageIndex]}
        alt={`Venue view ${currentImageIndex + 1}`}
        className="w-full h-full object-cover"
        width={800}
        height={500}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentImageIndex((prev) => Math.max(0, prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white"
        disabled={currentImageIndex === 0}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() =>
          setCurrentImageIndex((prev) => Math.min(images.length - 1, prev + 1))
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white"
        disabled={currentImageIndex === images.length - 1}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Thumbnail Navigation */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex gap-2 justify-center">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? "bg-white w-4" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Top Actions */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button className="p-2 rounded-full bg-white/90 hover:bg-white">
          <Share className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full bg-white/90 hover:bg-white">
          <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ListingGallery;
