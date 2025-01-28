// app/components/marketplace/MultiItemListing.tsx
"use client";

import React, { useState } from "react";
import {
  Upload,
  Plus,
  X,
  Package,
  DollarSign,
  Truck,
  Camera,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { uploadMultipleImages, deleteImage } from "../../lib/supabase-utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ShippingDetails {
  price: string;
  method: "standard" | "express";
}

interface ListingItem {
  id: number;
  title: string;
  price: string;
  category: string;
  condition: string;
  description: string;
  images: string[];
  shipping: ShippingDetails;
}

interface Category {
  id: string;
  name: string;
  sizes?: string[];
}

interface Condition {
  id: string;
  name: string;
}

interface ItemFormProps {
  item: ListingItem;
}

type ItemField = keyof ListingItem | 'shipping';
type ItemValue = string | string[] | ShippingDetails;

const MultiItemListing = () => {
  const [items, setItems] = useState<ListingItem[]>([
    {
      id: 1,
      title: "",
      price: "",
      category: "",
      condition: "",
      description: "",
      images: [],
      shipping: {
        price: "",
        method: "standard",
      },
    },
  ]);

  const categories: Category[] = [
    {
      id: "dresses",
      name: "Wedding Dresses",
      sizes: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18"],
    },
    { id: "decor", name: "Decor & Accessories" },
    { id: "favors", name: "Wedding Favors" },
    { id: "flowers", name: "Flowers & Bouquets" },
  ];

  const conditions: Condition[] = [
    { id: "new", name: "New with tags" },
    { id: "like_new", name: "Like new" },
    { id: "good", name: "Good" },
    { id: "fair", name: "Fair" },
  ];

  const addNewItem = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        title: "",
        price: "",
        category: "",
        condition: "",
        description: "",
        images: [],
        shipping: {
          price: "",
          method: "standard",
        },
      },
    ]);
  };

  const removeItem = (itemId: number) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const updateItem = (itemId: number, field: ItemField, value: ItemValue) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item,
      ),
    );
  };

  const ItemForm = ({ item }: ItemFormProps) => (
    <div className="p-6 bg-white rounded-xl border mb-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-medium text-lg">Item {item.id}</h3>
        {items.length > 1 && (
          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Photos
          </label>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor={`images-${item.id}`}
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB each</p>
                </div>
                <input
                  id={`images-${item.id}`}
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (!files || files.length === 0) return;

                    try {
                      const uploadedUrls = await uploadMultipleImages(Array.from(files));
                      updateItem(item.id, "images", [...item.images, ...uploadedUrls]);
                    } catch (error) {
                      console.error('Upload error:', error);
                    }
                  }}
                />
              </label>
            </div>

            {/* Image Preview Grid */}
            {item.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {item.images.map((url: string, index: number) => (
                  <div key={url} className="relative group aspect-square">
                    <img
                      src={url}
                      alt={`Item ${item.id} - Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={async () => {
                        await deleteImage(url);
                        updateItem(
                          item.id,
                          "images",
                          item.images.filter((_: string, i: number) => i !== index)
                        );
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Basic Details */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor={`title-${item.id}`}
              className="block text-sm font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id={`title-${item.id}`}
              name={`title-${item.id}`}
              value={item.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateItem(item.id, "title", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Item name"
            />
          </div>

          <div>
            <label
              htmlFor={`price-${item.id}`}
              className="block text-sm font-medium mb-2"
            >
              Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                id={`price-${item.id}`}
                name={`price-${item.id}`}
                value={item.price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateItem(item.id, "price", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Category & Condition */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor={`category-${item.id}`}
              className="block text-sm font-medium mb-2"
            >
              Category
            </label>
            <select
              id={`category-${item.id}`}
              name={`category-${item.id}`}
              value={item.category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateItem(item.id, "category", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor={`condition-${item.id}`}
              className="block text-sm font-medium mb-2"
            >
              Condition
            </label>
            <select
              id={`condition-${item.id}`}
              name={`condition-${item.id}`}
              value={item.condition}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateItem(item.id, "condition", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select condition</option>
              {conditions.map((cond) => (
                <option key={cond.id} value={cond.id}>
                  {cond.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor={`description-${item.id}`}
            className="block text-sm font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id={`description-${item.id}`}
            name={`description-${item.id}`}
            value={item.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateItem(item.id, "description", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows={4}
            placeholder="Describe your item..."
          />
        </div>

        {/* Shipping */}
        <div>
          <h4 className="font-medium mb-4">Shipping Details</h4>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor={`shippingPrice-${item.id}`}
                className="block text-sm font-medium mb-2"
              >
                Shipping Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  id={`shippingPrice-${item.id}`}
                  name={`shippingPrice-${item.id}`}
                  value={item.shipping.price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateItem(item.id, "shipping", {
                      ...item.shipping,
                      price: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor={`shippingMethod-${item.id}`}
                className="block text-sm font-medium mb-2"
              >
                Shipping Method
              </label>
              <select
                id={`shippingMethod-${item.id}`}
                name={`shippingMethod-${item.id}`}
                value={item.shipping.method}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  updateItem(item.id, "shipping", {
                    ...item.shipping,
                    method: e.target.value as "standard" | "express",
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="standard">Standard Shipping</option>
                <option value="express">Express Shipping</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Create Listings</h1>
        <p className="text-gray-600">
          List multiple items for sale in your shop
        </p>
      </div>

      {items.map((item) => (
        <ItemForm key={item.id} item={item} />
      ))}

      <button
        onClick={addNewItem}
        className="w-full py-3 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 text-gray-600 hover:border-gray-400"
      >
        <Plus className="w-5 h-5" />
        Add Another Item
      </button>

      <div className="mt-8 flex justify-end gap-3">
        <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
          Save as Draft
        </button>
        <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
          Publish Listings
        </button>
      </div>
    </div>
  );
};

export default MultiItemListing;
