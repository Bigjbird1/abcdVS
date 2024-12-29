// app/components/marketplace/MultiItemListing.tsx
'use client'

import React, { useState } from 'react';
import { Upload, Plus, X, Package, DollarSign, Truck, Camera, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MultiItemListing = () => {
  const [items, setItems] = useState([{
    id: 1,
    title: '',
    price: '',
    category: '',
    condition: '',
    description: '',
    images: [],
    shipping: {
      price: '',
      method: 'standard'
    }
  }]);

  const categories = [
    { id: 'dresses', name: 'Wedding Dresses', sizes: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18'] },
    { id: 'decor', name: 'Decor & Accessories' },
    { id: 'favors', name: 'Wedding Favors' },
    { id: 'flowers', name: 'Flowers & Bouquets' }
  ];

  const conditions = [
    { id: 'new', name: 'New with tags' },
    { id: 'like_new', name: 'Like new' },
    { id: 'good', name: 'Good' },
    { id: 'fair', name: 'Fair' }
  ];

  const addNewItem = () => {
    setItems([...items, {
      id: items.length + 1,
      title: '',
      price: '',
      category: '',
      condition: '',
      description: '',
      images: [],
      shipping: {
        price: '',
        method: 'standard'
      }
    }]);
  };

  const removeItem = (itemId: number) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const updateItem = (itemId: number, field: string, value: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, [field]: value } : item
    ));
  };

  const ItemForm = ({ item }: { item: any }) => (
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
          <label className="block text-sm font-medium mb-2">Photos</label>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <button 
                key={num}
                className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 hover:border-gray-400"
              >
                <Camera className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-600">Add Photo</span>
              </button>
            ))}
          </div>
        </div>

        {/* Basic Details */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor={`title-${item.id}`} className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              id={`title-${item.id}`}
              name={`title-${item.id}`}
              value={item.title}
              onChange={(e) => updateItem(item.id, 'title', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Item name"
            />
          </div>

          <div>
            <label htmlFor={`price-${item.id}`} className="block text-sm font-medium mb-2">Price</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                id={`price-${item.id}`}
                name={`price-${item.id}`}
                value={item.price}
                onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Category & Condition */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor={`category-${item.id}`} className="block text-sm font-medium mb-2">Category</label>
            <select 
              id={`category-${item.id}`}
              name={`category-${item.id}`}
              value={item.category}
              onChange={(e) => updateItem(item.id, 'category', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`condition-${item.id}`} className="block text-sm font-medium mb-2">Condition</label>
            <select 
              id={`condition-${item.id}`}
              name={`condition-${item.id}`}
              value={item.condition}
              onChange={(e) => updateItem(item.id, 'condition', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select condition</option>
              {conditions.map(cond => (
                <option key={cond.id} value={cond.id}>{cond.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor={`description-${item.id}`} className="block text-sm font-medium mb-2">Description</label>
          <textarea
            id={`description-${item.id}`}
            name={`description-${item.id}`}
            value={item.description}
            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
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
              <label htmlFor={`shippingPrice-${item.id}`} className="block text-sm font-medium mb-2">Shipping Price</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  id={`shippingPrice-${item.id}`}
                  name={`shippingPrice-${item.id}`}
                  value={item.shipping.price}
                  onChange={(e) => updateItem(item.id, 'shipping', { ...item.shipping, price: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label htmlFor={`shippingMethod-${item.id}`} className="block text-sm font-medium mb-2">Shipping Method</label>
              <select 
                id={`shippingMethod-${item.id}`}
                name={`shippingMethod-${item.id}`}
                value={item.shipping.method}
                onChange={(e) => updateItem(item.id, 'shipping', { ...item.shipping, method: e.target.value })}
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
        <p className="text-gray-600">List multiple items for sale in your shop</p>
      </div>

      {items.map(item => (
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

