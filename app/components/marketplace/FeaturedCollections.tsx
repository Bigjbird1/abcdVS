import React from "react";
import Link from "next/link";

const FeaturedCollections = () => {
  const collections = ["Designer Dresses", "New Arrivals", "Best Sellers"];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Featured Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Link
            href={`/marketplace/collection/${collection.toLowerCase().replace(" ", "-")}`}
            key={collection}
          >
            <div className="aspect-[16/9] relative rounded-xl overflow-hidden group cursor-pointer">
              <img
                src={`/placeholder.svg?height=400&width=800&text=${collection}`}
                alt={collection}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl font-medium">{collection}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollections;
