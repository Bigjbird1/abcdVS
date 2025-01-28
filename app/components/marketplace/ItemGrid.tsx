import React, { useMemo } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface Item {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  size?: string;
  location: string;
  condition: string;
}

interface ItemGridProps {
  visibleItems: number;
  selectedSize: string | null;
  selectedCondition: string | null;
  priceRange: [number, number] | null;
  sortBy: string;
  searchQuery: string;
  selectedCategory: string;
}

const ItemGrid: React.FC<ItemGridProps> = ({
  visibleItems,
  selectedSize,
  selectedCondition,
  priceRange,
  sortBy,
  searchQuery,
  selectedCategory,
}) => {
  const router = useRouter();
  
  const allItems: Item[] = [
    {
      id: 1,
      name: "Vera Wang Wedding Dress",
      price: 1200,
      originalPrice: 3500,
      size: "6",
      location: "San Francisco",
      condition: "Like New",
    },
    {
      id: 2,
      name: "Crystal Centerpiece Set",
      price: 250,
      originalPrice: 400,
      location: "New York",
      condition: "New",
    },
    {
      id: 3,
      name: "Bridal Tiara",
      price: 150,
      originalPrice: 300,
      location: "Los Angeles",
      condition: "Excellent",
    },
    {
      id: 4,
      name: "Jimmy Choo Wedding Shoes",
      price: 300,
      originalPrice: 750,
      size: "7",
      location: "Chicago",
      condition: "Like New",
    },
    {
      id: 5,
      name: "Lace Veil",
      price: 100,
      originalPrice: 200,
      location: "Miami",
      condition: "New",
    },
    {
      id: 6,
      name: "Diamond Earrings",
      price: 500,
      originalPrice: 1000,
      location: "Dallas",
      condition: "Excellent",
    },
    {
      id: 7,
      name: "Floral Arch",
      price: 180,
      originalPrice: 300,
      location: "Seattle",
      condition: "Good",
    },
    {
      id: 8,
      name: "Bridesmaid Dress Set",
      price: 600,
      originalPrice: 1200,
      size: "Various",
      location: "Boston",
      condition: "New",
    },
    {
      id: 9,
      name: "Vintage Wedding Ring",
      price: 800,
      originalPrice: 1500,
      location: "Philadelphia",
      condition: "Excellent",
    },
    {
      id: 10,
      name: "Wedding Cake Topper",
      price: 50,
      originalPrice: 80,
      location: "Houston",
      condition: "New",
    },
    {
      id: 11,
      name: "Bridal Bouquet",
      price: 120,
      originalPrice: 200,
      location: "Atlanta",
      condition: "Made to Order",
    },
    {
      id: 12,
      name: "Groom's Tuxedo",
      price: 400,
      originalPrice: 800,
      size: "40R",
      location: "Denver",
      condition: "Like New",
    },
    {
      id: 13,
      name: "Wedding Guest Book",
      price: 40,
      originalPrice: 60,
      location: "Portland",
      condition: "New",
    },
    {
      id: 14,
      name: "String Lights Set",
      price: 80,
      originalPrice: 120,
      location: "Austin",
      condition: "New",
    },
    {
      id: 15,
      name: "Wedding Invitation Set",
      price: 150,
      originalPrice: 250,
      location: "Nashville",
      condition: "Custom Made",
    },
    {
      id: 16,
      name: "Bridal Shoes",
      price: 180,
      originalPrice: 350,
      size: "8",
      location: "San Diego",
      condition: "New",
    },
    {
      id: 17,
      name: "Wedding Photo Album",
      price: 70,
      originalPrice: 100,
      location: "Phoenix",
      condition: "New",
    },
    {
      id: 18,
      name: "Flower Girl Dress",
      price: 80,
      originalPrice: 150,
      size: "6",
      location: "Detroit",
      condition: "Like New",
    },
    {
      id: 19,
      name: "Wedding Champagne Flutes",
      price: 40,
      originalPrice: 70,
      location: "Las Vegas",
      condition: "New",
    },
    {
      id: 20,
      name: "Bridal Hair Accessories",
      price: 60,
      originalPrice: 100,
      location: "Orlando",
      condition: "New",
    },
    {
      id: 21,
      name: "Groomsmen Gift Set",
      price: 200,
      originalPrice: 300,
      location: "Seattle",
      condition: "New",
    },
    {
      id: 22,
      name: "Wedding Favor Boxes",
      price: 30,
      originalPrice: 50,
      location: "Minneapolis",
      condition: "New",
    },
    {
      id: 23,
      name: "Bridal Robe",
      price: 70,
      originalPrice: 120,
      size: "M",
      location: "New Orleans",
      condition: "New",
    },
    {
      id: 24,
      name: "Wedding Signage Set",
      price: 90,
      originalPrice: 150,
      location: "Kansas City",
      condition: "Handmade",
    },
  ];

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let filtered = [...allItems];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item: Item) =>
          item.name.toLowerCase().includes(query) ||
          item.condition.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query),
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item: Item) => {
        const itemCategory = item.name.toLowerCase();
        return (
          (selectedCategory === "dresses" && itemCategory.includes("dress")) ||
          (selectedCategory === "accessories" &&
            itemCategory.includes("accessory")) ||
          (selectedCategory === "decor" && itemCategory.includes("decor")) ||
          (selectedCategory === "shoes" && itemCategory.includes("shoe")) ||
          (selectedCategory === "veils" &&
            (itemCategory.includes("veil") ||
              itemCategory.includes("tiara"))) ||
          (selectedCategory === "jewelry" &&
            (itemCategory.includes("ring") || itemCategory.includes("earring")))
        );
      });
    }

    // Apply size filter
    if (selectedSize) {
      filtered = filtered.filter((item: Item) => item.size === selectedSize);
    }

    // Apply condition filter
    if (selectedCondition) {
      filtered = filtered.filter(
        (item: Item) => item.condition === selectedCondition,
      );
    }

    // Apply price range filter
    if (priceRange) {
      filtered = filtered.filter(
        (item: Item) =>
          item.price >= priceRange[0] && item.price <= priceRange[1],
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default: // 'featured'
        // Keep original order
        break;
    }

    return filtered;
  }, [
    allItems,
    searchQuery,
    selectedCategory,
    selectedSize,
    selectedCondition,
    priceRange,
    sortBy,
  ]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredItems.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">No items found matching your criteria</p>
        </div>
      ) : (
        filteredItems.slice(0, visibleItems).map((item) => (
          <div key={item.id}>
            <div 
              className="group cursor-pointer"
              onClick={(e) => {
                // Don't navigate if clicking the heart button
                if (!(e.target as HTMLElement).closest('button')) {
                  router.push(`/listing/${item.id}`);
                }
              }}
            >
              <div className="aspect-square relative rounded-xl overflow-hidden mb-3">
                <img
                  src={`/placeholder.svg?height=400&width=400&text=Item-${item.id}`}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm">
                  <Heart className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-black/30 text-white text-sm rounded-full backdrop-blur-sm">
                    {item.condition}
                  </span>
                </div>
              </div>
              <h3 className="font-medium group-hover:text-gray-600">
                {item.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="font-medium">${item.price}</span>
                <span className="text-sm text-gray-500 line-through">
                  ${item.originalPrice}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {item.size ? `Size ${item.size} • ` : ""}
                {item.location}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ItemGrid;
