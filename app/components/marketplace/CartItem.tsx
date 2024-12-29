import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    size?: string;
    color?: string;
    quantity: number;
    image: string;
    seller: string;
    condition: string;
  };
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex gap-6 py-6 border-t">
      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-1">Sold by {item.seller}</p>
            {item.size && (
              <p className="text-sm text-gray-600">Size: {item.size}</p>
            )}
            <p className="text-sm text-gray-600">Condition: {item.condition}</p>
          </div>
          <div className="text-right">
            <div className="font-medium">${item.price}</div>
            <div className="text-sm text-gray-500 line-through">
              ${item.originalPrice}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

